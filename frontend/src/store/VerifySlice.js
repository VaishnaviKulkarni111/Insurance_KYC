import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.get('http://localhost:5000/user-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data; // { email, mobile }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

// Add new import for Send Email action
export const sendVerificationEmail = createAsyncThunk(
  'userDetails/sendVerificationEmail',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 

    try {
      // Send a request to the backend to trigger the SendGrid email
      const response = await axios.post('http://localhost:5000/send-verification-email', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Verification email sent:', response.data);
      return response.data;  // Return any success message if needed
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send verification email');
    }
  }
);

export const sendOTP = createAsyncThunk(
  'verify/sendOTP',
  async (mobileNumber, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 

    try {
      console.log("Mobile number being sent:", mobileNumber);

      const response = await axios.post(
        'http://localhost:5000/send-otp', 
        { mobile: mobileNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Backend response (e.g., { message: 'OTP sent successfully' })
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
  }
);


const VerifySlice = createSlice({
  name: 'userDetails',
  initialState: {
    email: '',
    mobile: '',
    loading: false,
    error: null,
    emailSent: false, // To track if the email has been sent
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.mobile = action.payload.mobile;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle sending email state
      .addCase(sendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.emailSent = false;
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.loading = false;
        state.emailSent = true; // Update email sent status
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.emailSent = false;
        state.error = action.payload;
      })
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpMessage = ''; // Clear previous messages
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload.message; // Message from backend
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message
      });
      
  },
});


export default VerifySlice.reducer;
