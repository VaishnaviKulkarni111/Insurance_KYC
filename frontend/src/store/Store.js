import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'; 
import uploadReducer from './UploadSlice';
import verifyReducer from './VerifySlice'; 
import adminReducer from './AdminSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    upload: uploadReducer,
    verify: verifyReducer,
    admin:adminReducer,
  },
});

export default store; 