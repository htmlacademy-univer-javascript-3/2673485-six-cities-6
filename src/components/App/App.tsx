import {MainPage} from '../../pages/main/MainPage';
import {Card} from '../../types/Card.tsx';

type AppProps = {
  availableCards: Card[];
};

function App({ availableCards }: AppProps): JSX.Element {
  return (MainPage(availableCards));
}

export default App;
