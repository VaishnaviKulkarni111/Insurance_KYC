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
      console.log("data in redux",response.data);
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

export const verifyEmail = createAsyncThunk(
  'userDetails/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      // Send a GET request to the backend to verify the email
      const response = await axios.get(`http://localhost:5000/verify-email/${token}`);
      return response.data;  // Return success message or updated user data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to verify email');
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

export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async ({ mobile, otp }, { rejectWithValue }) => {
      try {
          const response = await axios.post('http://localhost:5000/verify-otp', { mobile, otp });
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
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
    emailSent: false, 
    emailVerified: false,
    mobileVerified: false,
    otpVerificationSuccess: false,
  },
  reducers: {
    resetOtpVerification: (state) => {
      state.otpVerificationSuccess = false; // Reset success flag
    },
  },
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
        state.emailVerified = action.payload.emailVerified;
        state.mobileVerified = action.payload.mobileVerified;
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
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.emailVerified = true; // Update the email verification status
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.mobileVerified = true;
        state.otpVerificationSuccess = true; // Set success flag

        state.error = null;
    })
    .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
      
  },
});

export const { resetOtpVerification } = VerifySlice.actions; // Ensure this is exported

export default VerifySlice.reducer;
