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

export const fetchUserDetails = createAsyncThunk(
  'admin/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch user details');
    }
  }
);

export const fetchUserFiles = createAsyncThunk(
  'admin/fetchUserFiles',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:5000/admin/files/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.files;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch files');
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, status, reason }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/update-status/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const data = await response.json();
      return { userId, status, message: data.message }; // Return data for reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


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
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userFiles = [];
      })
      .addCase(fetchUserFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.userFiles = action.payload;
      })
      .addCase(fetchUserFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = {
          ...state.userDetails,
          status: action.payload.status, // Update status in state
        };
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminSlice.reducer;
