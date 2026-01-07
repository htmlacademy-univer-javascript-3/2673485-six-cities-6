import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import Favorites from '../../pages/favorites/Favorites.tsx';
import Login from '../../pages/login/Login.tsx';
import { MainPage } from '../../pages/main/MainPage';
import Offer from '../../pages/offer/Offer.tsx';
import {selectAllOffers, selectAuthStatus} from '../../store/selectors';
import { AppRoute } from '../../types/RouteTypes.tsx';
import { PageNotFound } from '../PageNotFound/PageNotFound.tsx';

import type { ReactElement } from 'react';

function App(): ReactElement {
  const authorizationStatus = useAppSelector(selectAuthStatus);
  const offers = useAppSelector(selectAllOffers);
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />}/>
        <Route
          path={AppRoute.Favorites}
          element={isUserAuthorized ? <Favorites offers={offers} /> : <Navigate to={AppRoute.Login} replace />}
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route
          path={AppRoute.Login}
          element={isUserAuthorized ? <Navigate to={AppRoute.Main} replace /> : <Login />}
        />
        <Route path={AppRoute.Error404} element={ PageNotFound() }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
