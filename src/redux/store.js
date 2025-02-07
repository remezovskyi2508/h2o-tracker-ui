import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import waterReducer from './water/slice';
// import filtersReducer from './filters/slice';
import authReducer from './auth/slice';
import { userInfoReducer } from './user/slice.js';

// const contactConfig = {
//   key: 'contactsData',
//   storage,
//   whitelist: ['contacts'],
// };

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  water: waterReducer,
  userInfo: userInfoReducer,
  // filters: filtersReducer,
  auth: persistReducer(authConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
