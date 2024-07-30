import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provides the Redux store to the application */}
      <PersistGate loading={null} persistor={persistor}> {/* Manages state persistence */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
