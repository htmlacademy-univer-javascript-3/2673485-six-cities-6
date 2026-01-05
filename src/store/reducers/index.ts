import { combineReducers, createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const.ts';
import { Card } from '../../types/Card.tsx';
import { Review } from '../../types/Review';

import { changeCity, checkAuth, fetchNearby, fetchOffer, fetchOffers, fetchReviews, login, logout, postReview, setAuthStatus, setUser } from '../actions';

export type OffersSliceState = {
  city: string;
  offers: Card[];
  isOffersLoading: boolean;
  offersError: string | null;
};

export type UserSliceState = {
  authorizationStatus: AuthorizationStatus;
  user: {
    token: string;
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  } | null;
};

export type OfferDetailsSliceState = {
  currentOffer: Card | null;
  isOfferLoading: boolean;
  offerError: string | null;
  nearbyOffers: Card[];
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewSending: boolean;
};

const offersInitialState: OffersSliceState = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
  offersError: null
};

const userInitialState: UserSliceState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const offerDetailsInitialState: OfferDetailsSliceState = {
  currentOffer: null,
  isOfferLoading: false,
  offerError: null,
  nearbyOffers: [],
  reviews: [],
  isReviewsLoading: false,
  isReviewSending: false
};

const offersSlice = createSlice({
  name: 'offersSlice',
  initialState: offersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
        state.offersError = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
        state.offersError = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isOffersLoading = false;
        state.offersError = action.error.message ?? 'Failed to load offers';
      });
  }
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
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
        state.user = null;
      })
      .addCase(logout, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});

const offerDetailsSlice = createSlice({
  name: 'offerDetailsSlice',
  initialState: offerDetailsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.offerError = null;
        state.currentOffer = null;
        state.nearbyOffers = [];
        state.reviews = [];
        state.isReviewsLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
        state.offerError = null;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.currentOffer = null;
        state.isOfferLoading = false;
        state.offerError = action.error.message ?? 'Failed to load offer';
      })
      .addCase(fetchNearby.pending, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearby.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
        state.reviews = [];
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
      });
  }
});

export const reducer = combineReducers({
  offers: offersSlice.reducer,
  user: userSlice.reducer,
  offerDetails: offerDetailsSlice.reducer
});
