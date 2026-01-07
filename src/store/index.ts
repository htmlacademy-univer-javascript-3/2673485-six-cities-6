import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../services/api.ts';

import { checkAuth, fetchOffers } from './actions';
import { reducer } from './reducers';

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
