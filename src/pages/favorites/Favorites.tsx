import {useCallback} from 'react';
import {Link} from 'react-router-dom';

import OffersList from '../../shared/OffersList/OffersList.tsx';
import {useAppDispatch} from '../../hooks/useAppDispatch.ts';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {dropToken} from '../../services/token.ts';
import {logout} from '../../store/actions';
import {selectUser} from '../../store/selectors';
import {AppRoute} from '../../types/RouteTypes.tsx';
import { Card } from '../../types/Card.tsx';

import type {ReactElement} from 'react';

type FavoritesProps = {
  offers: Card[];
}

export function Favorites({ offers }: FavoritesProps): ReactElement {
  const favoriteOffers = offers.filter((offer) => offer.inBookMarks);
  const offersByCity = favoriteOffers.reduce<Record<string, Card[]>>((acc, offer) => {
    if (!acc[offer.city]) {
      acc[offer.city] = [];
    }
    acc[offer.city].push(offer);
    return acc;
  }, {});

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => {
    dropToken();
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user?.email ?? 'User'}</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <button className="header__nav-link button" onClick={handleSignOut} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                    <span className="header__signout">Sign out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved favorites</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Favorites}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OffersList offers={cityOffers} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}


export default Favorites;
