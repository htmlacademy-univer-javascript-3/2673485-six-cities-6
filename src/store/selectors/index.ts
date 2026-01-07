import { createSelector } from '@reduxjs/toolkit';
import { SortType } from '../../components/sorting-options/sorting-options.tsx';
import { Card } from '../../types/card.tsx';
import { Point } from '../../types/types.ts';
import { RootState } from '../index.ts';

const selectOffersState = (state: RootState) => state.offers;
const selectUserState = (state: RootState) => state.user;
const selectOfferDetailsState = (state: RootState) => state.offerDetails;

export const selectCity = createSelector([selectOffersState], (state) => state.city);
export const selectIsOffersLoading = createSelector([selectOffersState], (state) => state.isOffersLoading);
export const selectOffersError = createSelector([selectOffersState], (state) => state.offersError);
export const selectAllOffers = createSelector([selectOffersState], (state) => state.offers);
export const selectOffersByCity = createSelector([selectAllOffers, selectCity], (offers, city) => offers.filter((offer) => offer.city === city));

const sortOffersByType = (offers: Card[], sortType: SortType): Card[] => {
  if (sortType === 'Popular') {
    return offers;
  }

  return [...offers].sort((a, b) => {
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
};

export const makeSelectSortedOffersByCity = (sortType: SortType) => createSelector(
  [selectOffersByCity],
  (offersByCity) => sortOffersByType(offersByCity, sortType)
);

export const makeSelectPointsByCity = (sortType: SortType) => {
  const selectSorted = makeSelectSortedOffersByCity(sortType);

  return createSelector([selectSorted], (offers): Point[] => offers.map((card) => ({
    id: card.id,
    lat: card.coordinates.latitude,
    lng: card.coordinates.longitude,
    title: card.description
  })));
};

export const makeSelectSelectedPoint = (sortType: SortType) => {
  const pointsSelector = makeSelectPointsByCity(sortType);

  return createSelector(
    [pointsSelector, (_: RootState, activeOfferId: string | null) => activeOfferId],
    (points, activeOfferId) => (activeOfferId ? points.find((point) => point.id === activeOfferId) : undefined)
  );
};

export const selectAuthStatus = createSelector([selectUserState], (state) => state.authorizationStatus);
export const selectUser = createSelector([selectUserState], (state) => state.user);

export const selectCurrentOffer = createSelector([selectOfferDetailsState], (state) => state.currentOffer);
export const selectIsOfferLoading = createSelector([selectOfferDetailsState], (state) => state.isOfferLoading);
export const selectOfferError = createSelector([selectOfferDetailsState], (state) => state.offerError);
export const selectNearbyOffers = createSelector([selectOfferDetailsState], (state) => state.nearbyOffers);
export const selectNearbyPoints = createSelector([selectNearbyOffers], (offers): Point[] => offers.map((offer) => ({
  id: offer.id,
  lat: offer.coordinates.latitude,
  lng: offer.coordinates.longitude,
  title: offer.description
})));
export const selectReviews = createSelector([selectOfferDetailsState], (state) => state.reviews);
export const selectIsReviewsLoading = createSelector([selectOfferDetailsState], (state) => state.isReviewsLoading);
export const selectIsReviewSending = createSelector([selectOfferDetailsState], (state) => state.isReviewSending);
export const selectAllPointsForOffer = createSelector([
  selectCurrentOffer,
  selectNearbyPoints
], (currentOffer, nearbyPoints): Point[] => {
  if (!currentOffer) {
    return nearbyPoints;
  }

  return [
    {
      id: currentOffer.id,
      lat: currentOffer.coordinates.latitude,
      lng: currentOffer.coordinates.longitude,
      title: currentOffer.description
    },
    ...nearbyPoints
  ];
});

export const selectSelectedOfferPoint = createSelector([
  selectCurrentOffer
], (currentOffer): Point | undefined => currentOffer ? {
  id: currentOffer.id,
  lat: currentOffer.coordinates.latitude,
  lng: currentOffer.coordinates.longitude,
  title: currentOffer.description
} : undefined);

export const selectCityName = createSelector([selectCity], (city) => city);
