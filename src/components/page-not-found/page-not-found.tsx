import { Link } from 'react-router-dom';


export function PageNotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <h2>Страница не найдена</h2>
      <Link to="/" style={{color: 'blue', textDecoration: 'underline blue'}}>На главную</Link>
    </div>
  );
}
