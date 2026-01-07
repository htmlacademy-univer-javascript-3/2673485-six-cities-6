import {createReducer} from '@reduxjs/toolkit';
import {Card} from '../types/Card.tsx';
import {changeCity, loadOffers} from './actions.ts';

export type OffersState = {
  city: string;
  offers: Card[];
};

const initialState: OffersState = {
  city: 'Paris',
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
