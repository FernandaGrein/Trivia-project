import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './redux/store';
import App from './App';
import store from './redux/store/index';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      {/* <PersistGate loading={ null } persistor={ persistor }> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
