import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'; 
import uploadReducer from './UploadSlice';
import verifyReducer from './VerifySlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    upload: uploadReducer,
    verify: verifyReducer,
  },
});

export default store; 