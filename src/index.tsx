import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './components/App/App';
import {store} from './store';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
