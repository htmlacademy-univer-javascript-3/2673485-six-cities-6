import { combineReducers, createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const.ts';
import { Card } from '../../types/card.tsx';
import { Review } from '../../types/review';

import * as actions from '../actions';

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

const sortReviewsByDateDesc = (reviews: Review[]) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const offersSlice = createSlice({
  name: 'offersSlice',
  initialState: offersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(actions.fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
        state.offersError = null;
      })
      .addCase(actions.fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
        state.offersError = null;
      })
      .addCase(actions.fetchOffers.rejected, (state, action) => {
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
      .addCase(actions.setAuthStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(actions.setUser, (state, action) => {
        state.user = action.payload;
      })
      .addCase(actions.checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(actions.checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(actions.login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(actions.login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(actions.logout, (state) => {
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
      .addCase(actions.fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.offerError = null;
        state.currentOffer = null;
        state.nearbyOffers = [];
        state.reviews = [];
        state.isReviewsLoading = true;
      })
      .addCase(actions.fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
        state.offerError = null;
      })
      .addCase(actions.fetchOffer.rejected, (state, action) => {
        state.currentOffer = null;
        state.isOfferLoading = false;
        state.offerError = action.error.message ?? 'Failed to load offer';
      })
      .addCase(actions.fetchNearby.pending, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(actions.fetchNearby.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(actions.fetchNearby.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(actions.fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
        state.reviews = [];
      })
      .addCase(actions.fetchReviews.fulfilled, (state, action) => {
        state.reviews = sortReviewsByDateDesc(action.payload);
        state.isReviewsLoading = false;
      })
      .addCase(actions.fetchReviews.rejected, (state) => {
        state.reviews = [];
        state.isReviewsLoading = false;
      })
      .addCase(actions.postReview.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(actions.postReview.fulfilled, (state, action) => {
        state.reviews = sortReviewsByDateDesc([action.payload, ...state.reviews]).slice(0, 10);
        state.isReviewSending = false;
      })
      .addCase(actions.postReview.rejected, (state) => {
        state.isReviewSending = false;
      });
  }
});

export const reducer = combineReducers({
  offers: offersSlice.reducer,
  user: userSlice.reducer,
  offerDetails: offerDetailsSlice.reducer
});
