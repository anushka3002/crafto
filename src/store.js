import { configureStore } from '@reduxjs/toolkit';
import { getQuoteReducer, loginReducer, mediaUrlReducer } from './Reducer/reducer';

const store = configureStore({
  reducer: {
    loginData: loginReducer,
    mediaUrl: mediaUrlReducer,
    getQuoteData: getQuoteReducer
  },
});

export default store;
