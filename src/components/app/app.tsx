import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import Favorites from '../../pages/favorites/favorites.tsx';
import Login from '../../pages/login/login.tsx';
import { MainPage } from '../../pages/main/main-page';
import Offer from '../../pages/offer/offer.tsx';
import { selectAllOffers, selectAuthStatus } from '../../store/selectors';
import { AppRoute } from '../../types/route-types.tsx';
import { PageNotFound } from '../page-not-found/page-not-found.tsx';

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
