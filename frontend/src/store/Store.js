import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'; 
import uploadReducer from './UploadSlice';
//import dashboardReducer from './dashboardSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    upload: uploadReducer
  },
});

export default store; 