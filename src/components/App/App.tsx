import { MainPage } from '../../pages/main/MainPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../types/RouteTypes.tsx';
import { PageNotFound } from '../PageNotFound/PageNotFound.tsx';
import Favorites from '../../pages/favorites/Favorites.tsx';
import Offer from '../../pages/offer/Offer.tsx';
import Login from '../../pages/login/Login.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

function App(): JSX.Element {
  const isUserAuthorized = false;
  const offers = useSelector((state: RootState) => state.offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />}/>
        <Route
          path={AppRoute.Favourites}
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
