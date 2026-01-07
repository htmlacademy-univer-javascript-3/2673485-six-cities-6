import { Link} from 'react-router-dom';

import { AppRoute } from '../../types/route-types.tsx';

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
};

function ErrorScreen({message = 'Something went wrong. Please try again.', onRetry}: ErrorScreenProps) {
  return (
    <div className="page" style={{padding: '40px 20px', textAlign: 'center'}}>
      <h1>Ошибка</h1>
      <p style={{margin: '12px 0 20px'}}>{message}</p>
      <div style={{display: 'inline-flex', gap: '12px', alignItems: 'center'}}>
        {onRetry && (
          <button className="button" type="button" onClick={onRetry}>
            Повторить
          </button>
        )}
        <Link to={AppRoute.Main} style={{color: 'blue', textDecoration: 'underline blue'}}>
          На главную
        </Link>
      </div>
    </div>
  );
}

export default ErrorScreen;
