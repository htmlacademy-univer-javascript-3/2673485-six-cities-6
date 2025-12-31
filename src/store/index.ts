import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {loadOffers} from './actions.ts';
import offers from '../mocks/offers.ts';

export const store = configureStore({
  reducer
});

store.dispatch(loadOffers(offers));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
