import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// const persistConfig = {
//   key: 'persist-key',
//   storage,
// };

// const parsistReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   parsistReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk),
//   ),
// );

// const persistor = persistStore(store);

if (window.Cypress) {
  window.store = store;
}

export default store;
// export { persistor };
