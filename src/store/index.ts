import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {createAPI} from '../api.ts';
import {fetchOffers} from './actions.ts';

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

store.dispatch(fetchOffers());

export type RootState = ReturnType<typeof store.getState>;
