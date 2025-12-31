import {createReducer} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';
import {AuthorizationStatus} from '../const.ts';
import {Review} from '../types/Review';
import {changeCity, checkAuth, fetchNearby, fetchOffer, fetchOffers, fetchReviews, login, logout, postReview, setAuthStatus, setUser} from './actions.ts';

export type OffersState = {
  city: string;
  offers: Card[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: {
    token: string;
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  } | null;
  currentOffer: Card | null;
  isOfferLoading: boolean;
  nearbyOffers: Card[];
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewSending: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  isOfferLoading: false,
  nearbyOffers: [],
  reviews: [],
  isReviewsLoading: false,
  isReviewSending: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isOfferLoading = true;
      state.currentOffer = null;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.currentOffer = null;
      state.isOfferLoading = false;
    })
    .addCase(fetchNearby.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchNearby.rejected, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchReviews.pending, (state) => {
      state.isReviewsLoading = true;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = [...action.payload].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      state.isReviewsLoading = false;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.reviews = [];
      state.isReviewsLoading = false;
    })
    .addCase(postReview.pending, (state) => {
      state.isReviewSending = true;
    })
    .addCase(postReview.fulfilled, (state, action) => {
      state.reviews = [action.payload, ...state.reviews].slice(0, 10);
      state.isReviewSending = false;
    })
    .addCase(postReview.rejected, (state) => {
      state.isReviewSending = false;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    });
});
