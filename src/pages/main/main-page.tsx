import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import ErrorScreen from '../../components/error-screen/error-screen.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortingOptions, { SortType } from '../../components/sorting-options/sorting-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import { AuthorizationStatus, CITY_COORDINATES } from '../../const.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import OffersList from '../../shared/offers-list/offers-list.tsx';
import { dropToken } from '../../services/token.ts';
import { AppRoute } from '../../types/route-types.tsx';
import { changeCity, logout, fetchOffers } from '../../store/actions';
import * as selectors from '../../store/selectors';

export function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectors.selectCityName);
  const isOffersLoading = useAppSelector(selectors.selectIsOffersLoading);
  const offersError = useAppSelector(selectors.selectOffersError);
  const authorizationStatus = useAppSelector(selectors.selectAuthStatus);
  const user = useAppSelector(selectors.selectUser);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('Popular');
  const sortedOffersSelector = useMemo(() => selectors.makeSelectSortedOffersByCity(sortType), [sortType]);
  const pointsSelector = useMemo(() => selectors.makeSelectPointsByCity(sortType), [sortType]);
  const selectedPointSelector = useMemo(() => selectors.makeSelectSelectedPoint(sortType), [sortType]);
  const sortedOffers = useAppSelector(sortedOffersSelector);
  const points = useAppSelector(pointsSelector);
  const selectedPoint = useAppSelector((state) => selectedPointSelector(state, activeOfferId));

  useEffect(() => {
    setActiveOfferId(null);
  }, [city]);

  const currentCityCoordinates = useMemo(() => CITY_COORDINATES[city], [city]);

  const handleSignOut = useCallback(() => {
    dropToken();
    dispatch(logout());
  }, [dispatch]);

  const handleCityChange = useCallback((newCity: string) => {
    dispatch(changeCity(newCity));
  }, [dispatch]);

  let placesContent: ReactElement;

  if (offersError) {
    placesContent = (
      <div className="cities__places-container container">
        <ErrorScreen
          message={offersError}
          onRetry={() => {
            void dispatch(fetchOffers());
          }}
        />
      </div>
    );
  } else if (isOffersLoading) {
    placesContent = (
      <div className="cities__places-container container">
        <Spinner />
      </div>
    );
  } else {
    placesContent = (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
          <SortingOptions value={sortType} onChange={setSortType} />
          <div className="cities__places-list places__list tabs__content">
            <OffersList offers={sortedOffers} onActiveOfferChange={setActiveOfferId} />
          </div>
        </section>
        <div className="cities__right-section">
          {currentCityCoordinates && (
            <Map city={currentCityCoordinates} pointsCheck={points} selectedPoint={selectedPoint} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">0</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button className="header__nav-link button" onClick={handleSignOut} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={city} onCityChange={handleCityChange} />
        <div className="cities">
          {placesContent}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
