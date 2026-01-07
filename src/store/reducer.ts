import {createReducer} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';
import {changeCity, fetchOffers} from './actions.ts';

export type OffersState = {
  city: string;
  offers: Card[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
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
    });
});
