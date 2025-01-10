import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 
    try {
        const response = await axios.get('http://localhost:5000/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })    
    console.log("res in slice", response.data)
    return response.data.users;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Something went wrong');
  }
});

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminSlice.reducer;
