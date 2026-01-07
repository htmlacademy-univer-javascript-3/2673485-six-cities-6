import OffersList from '../../shared/OffersList/OffersList.tsx';
import Map from '../../components/Map/Map.tsx';
import React from 'react';
import {Point} from '../../types/types.ts';
import CitiesList from '../../components/CitiesList/CitiesList.tsx';
import {useSelector} from 'react-redux';
import {changeCity} from '../../store/actions.ts';
import {CITY_COORDINATES} from '../../const.ts';
import {RootState} from '../../store';
import SortingOptions, {SortType} from '../../components/SortingOptions/SortingOptions.tsx';
import Spinner from '../../components/Spinner/Spinner.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../types/RouteTypes.tsx';
import {logout} from '../../store/actions.ts';
import {dropToken} from '../../services/token.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);
  const [activeOfferId, setActiveOfferId] = React.useState<string | null>(null);
  const [sortType, setSortType] = React.useState<SortType>('Popular');

  React.useEffect(() => {
    setActiveOfferId(null);
  }, [city]);

  const filteredOffers = offers.filter((offer) => offer.city === city);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortType) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const points: Point[] = sortedOffers.map((card) => ({
    id: card.id,
    lat: card.coordinates.latitude,
    lng: card.coordinates.longitude,
    title: card.description
  }));

  const selectedPoint: Point | undefined = activeOfferId
    ? points.find((point) => point.id === activeOfferId)
    : undefined;

  const currentCityCoordinates = CITY_COORDINATES[city];

  const handleSignOut = () => {
    dropToken();
    dispatch(logout());
  };

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
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favourites}>
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
        <CitiesList currentCity={city} onCityChange={(newCity) => dispatch(changeCity(newCity))} />
        {isOffersLoading ? (
          <div className="cities">
            <div className="cities__places-container container">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
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
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
