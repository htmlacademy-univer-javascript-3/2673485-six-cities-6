import {useCallback, useEffect, useMemo, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import ErrorScreen from '../../components/ErrorScreen/ErrorScreen.tsx';
import Map from '../../components/Map/Map.tsx';
import NearbyOffersList from '../../components/NearbyOffersList/NearbyOffersList.tsx';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound.tsx';
import ReviewsList from '../../components/ReviewsList/ReviewsList.tsx';
import Spinner from '../../components/Spinner/Spinner.tsx';
import {AuthorizationStatus, CITY_COORDINATES} from '../../const.ts';
import {useAppDispatch} from '../../hooks/useAppDispatch.ts';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {dropToken} from '../../services/token.ts';
import CommentForm from '../../shared/CommentForm/CommentForm.tsx';
import {fetchNearby, fetchOffer, fetchReviews, logout, postReview} from '../../store/actions';
import {selectAuthStatus, selectCurrentOffer, selectIsOfferLoading, selectOfferError, selectIsReviewSending, selectIsReviewsLoading, selectNearbyOffers, selectReviews, selectUser, selectAllPointsForOffer, selectSelectedOfferPoint} from '../../store/selectors';
import {AppRoute} from '../../types/RouteTypes.tsx';

import type { ReactElement } from 'react';

function Offer(): ReactElement {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const isOfferLoading = useAppSelector(selectIsOfferLoading);
  const offerError = useAppSelector(selectOfferError);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const allPoints = useAppSelector(selectAllPointsForOffer);
  const selectedPoint = useAppSelector(selectSelectedOfferPoint);
  const reviews = useAppSelector(selectReviews);
  const isReviewsLoading = useAppSelector(selectIsReviewsLoading);
  const isReviewSending = useAppSelector(selectIsReviewSending);
  const authorizationStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);

  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchOffer(id));
    dispatch(fetchNearby(id));
    dispatch(fetchReviews(id));
    setHasRequested(true);
  }, [dispatch, id]);

  const cityCoordinates = useMemo(() => currentOffer
    ? CITY_COORDINATES[currentOffer.city] ?? CITY_COORDINATES.Amsterdam
    : CITY_COORDINATES.Amsterdam, [currentOffer]);

  const handleSignOut = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dropToken();
    dispatch(logout());
  }, [dispatch]);

  const handleReviewSubmit = useCallback(({comment, rating}: {comment: string; rating: number}) => {
    if (!currentOffer) {
      return;
    }

    void dispatch(postReview({offerId: currentOffer.id, comment, rating}));
  }, [currentOffer, dispatch]);

  if (!id) {
    return PageNotFound();
  }

  if (isOfferLoading || !hasRequested) {
    return <Spinner />;
  }

  if (offerError) {
    return (
      <ErrorScreen
        message={offerError}
        onRetry={() => {
          if (id) {
            void dispatch(fetchOffer(id));
          }
        }}
      />
    );
  }

  if (!currentOffer) {
    return PageNotFound();
  }

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
                      <a className="header__nav-link" href="#" onClick={handleSignOut}>
                        <span className="header__signout">Sign out</span>
                      </a>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                {currentOffer.isPremium && <span>Premium</span>}
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.description}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{(currentOffer.rating / 20).toFixed(1)}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.accommodationType}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                  Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                  Washing machine
                  </li>
                  <li className="offer__inside-item">
                  Towels
                  </li>
                  <li className="offer__inside-item">
                  Heating
                  </li>
                  <li className="offer__inside-item">
                  Coffee machine
                  </li>
                  <li className="offer__inside-item">
                  Baby seat
                  </li>
                  <li className="offer__inside-item">
                  Kitchen
                  </li>
                  <li className="offer__inside-item">
                  Dishwasher
                  </li>
                  <li className="offer__inside-item">
                  Cabel TV
                  </li>
                  <li className="offer__inside-item">
                  Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {isReviewsLoading ? <Spinner /> : <ReviewsList reviews={reviews} />}
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <CommentForm onSubmit={handleReviewSubmit} isSending={isReviewSending} />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={cityCoordinates}
              pointsCheck={allPoints}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NearbyOffersList offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
