import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'; 
//import attendanceReducer from './attendanceSlice';
//import dashboardReducer from './dashboardSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
   
  },
});

export default store; 