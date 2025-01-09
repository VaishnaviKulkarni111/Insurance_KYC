
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  fileUrl: null,
  documents: [],
  error: null,
};



// Thunk for handling file upload
export const uploadFile = (file) => async (dispatch) => {
  const token = localStorage.getItem('token'); // Or however you store the JWT
  
  dispatch(startUpload());
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('File uploaded successfully:', response.data);

    dispatch(uploadSuccess(response.data.fileUrl)); // Assuming your backend sends the file URL
  } catch (error) {
    dispatch(uploadFailure(error.response?.data?.message || error.message));
  }
};

export const fetchUploadedDocuments = createAsyncThunk(
  'upload/fetchUploadedDocuments',
  async (_, { getState, rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Get token for authentication
    try {
      const response = await axios.get('http://localhost:5000/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("show files data", response.data)
      return response.data.files; // Return files array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch files');
    }
  }
);

// Creating the fileUpload slice
const UploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    startUpload: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.loading = false;
      state.fileUrl = action.payload;
      state.error = null;
    },
    uploadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadedDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUploadedDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchUploadedDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// Exporting reducer
export default UploadSlice.reducer;

export const { startUpload, uploadSuccess, uploadFailure } = UploadSlice.actions;

