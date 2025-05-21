import { createSlice, configureStore } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: null, // Chuyển sang null thay vì boolean
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchContactsError: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Lưu chuỗi lỗi
    },
  },
});

export const {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} = contactsSlice.actions;

export default configureStore({
  reducer: contactsSlice.reducer,
});
