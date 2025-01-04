
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Initial state
const initialState = {
  token: null,
  userType: null,
  user: [],
  loading: false,
  error: null,
};
// Async action for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ emailOrMobile, password }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');  

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrMobile, password }),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        // Store token and userType locally
        window.localStorage.setItem('token', data.data.token);
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem('userType', data.data.userType);
        // Return the token and userType if available
        return { token: data.data.token,
           userType: data.data.userType,
           user: data.data.user, 
           };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ fname, email, password,mobile, userType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');  

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          mobile,
          userType,
        }),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        window.localStorage.setItem('token', data.data.token);
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem('userType', data.data.userType);
        return { token: data.data.token, userType: data.data.userType }; // Return token and userType
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/getAllUser", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Only include if required
        },
      });
      const data = await response.json();

      if (data.error) {
        return rejectWithValue(data.error);
      }

      return data; // Directly return the data object
    } catch (error) {
      console.error("Error fetching users:", error); // Debugging line
      return rejectWithValue(error.message);
    }
  }
);



// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = [];
      state.token = null;
      state.userType = null; // Clear userType on logout
      window.localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Store the token
        state.userType = action.payload.userType; // Store the userType
        state.user = action.payload.user; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Store the token
        state.userType = action.payload.userType; // Store the userType
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("Fetch users rejected:", action.payload); // Debugging
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the logout action
export const { logout } = authSlice.actions;

export default authSlice.reducer;
