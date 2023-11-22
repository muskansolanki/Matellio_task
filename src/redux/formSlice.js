// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: [],
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData.push(action.payload);
    },
    removeFormData: (state, action) => { // Reducer for removing form data
      // Remove the specified form data item from the array
      const index = state.formData.findIndex(item => item._id === action.payload);
      if (index !== -1) {
        state.formData.splice(index, 1);
      }
    },
  },

});

export const { setFormData,removeFormData } = formSlice.actions;
export default formSlice.reducer;