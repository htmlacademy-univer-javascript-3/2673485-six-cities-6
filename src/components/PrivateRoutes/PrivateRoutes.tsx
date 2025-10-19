import { Navigate, Route} from 'react-router-dom';
import { AppRoute } from '../../types/RouteTypes.tsx';
import React from 'react';
import Offer from '../../pages/offer/Offer.tsx';
import Login from '../../pages/login/Login.tsx';
import Favorites from '../../pages/favorites/Favorites.tsx';
import { Card } from '../../types/Card.tsx';


export function PrivateRoutes({isAuthorized, offers} : { isAuthorized: boolean; offers: Card[] }) {
  if (isAuthorized){
    return (
      <React.Fragment>
        <Route path={AppRoute.Favourites} element={<Favorites offers={offers} />} />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.Login} element={<Navigate to={AppRoute.Main} replace />}/>
      </React.Fragment>
    );
  } else{
    return (
      <React.Fragment>
        <Route path={AppRoute.Favourites} element={<Navigate to={AppRoute.Login} replace />} />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={AppRoute.Login} element={<Login />}/>
      </React.Fragment>
    );
  }
}
