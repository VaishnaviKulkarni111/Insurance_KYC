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

const VerifySlice = createSlice({
  name: 'userDetails',
  initialState: {
    email: '',
    mobile: '',
    loading: false,
    error: null,
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
      });
  },
});

export default VerifySlice.reducer;
