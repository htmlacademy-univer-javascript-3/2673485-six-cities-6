import { MainPage } from '../../pages/main/MainPage';
import { Card } from '../../types/Card.tsx';
import { PrivateRoutes } from '../PrivateRoutes/PrivateRoutes.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../types/RouteTypes.tsx';
import {PageNotFound} from '../PageNotFound/PageNotFound.tsx';

type AppProps = {
  availableCards: Card[];
};

function App({ availableCards }: AppProps): JSX.Element {
  const isUserAuthorized = false;
  const authorizedRoutes = PrivateRoutes({isAuthorized : isUserAuthorized});

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={ MainPage(availableCards) }/>
        <Route path={AppRoute.Error404} element={ PageNotFound() }/>
        {authorizedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
