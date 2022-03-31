import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'githubTest',
  storage: AsyncStorage,
  blacklist: [],
};

const initialState = {}

const middleWare = [thunk];

const middlewareDev = [
    applyMiddleware(...middleWare),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(
  persistedReducer,
  initialState,
  compose(
      ...middlewareDev
  )
);

export let persistor = persistStore(store);