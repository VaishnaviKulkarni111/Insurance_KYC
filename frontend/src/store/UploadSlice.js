
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  fileUrl: null,
  error: null,
};

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
});

// Exporting actions
export const { startUpload, uploadSuccess, uploadFailure } = UploadSlice.actions;

// Thunk for handling file upload
export const uploadFile = (file) => async (dispatch) => {
  dispatch(startUpload());
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(uploadSuccess(response.data.fileUrl)); // Assuming your backend sends the file URL
  } catch (error) {
    dispatch(uploadFailure(error.response?.data?.message || error.message));
  }
};

// Exporting reducer
export default UploadSlice.reducer;
