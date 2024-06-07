// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Adjust the path as necessary

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
