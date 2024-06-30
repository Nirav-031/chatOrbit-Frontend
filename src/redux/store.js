import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import messageSlice from './messageSlice';
import socketSlice from './socketSlice';


import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import addFriendsSlice from './addFriendsSlice';
import notificationSlice from './notificationSlice';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  user: userSlice,
  message: messageSlice,
  socket: socketSlice,
  friend: addFriendsSlice,
  notification:notificationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;


// redux/store.js
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import userSlice from './userSlice';
// import messageSlice from './messageSlice';
// import socketSlice from './socketSlice';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// // Configuration for redux-persist
// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userSlice,
//   message: messageSlice,
//   socket: socketSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export default store;
