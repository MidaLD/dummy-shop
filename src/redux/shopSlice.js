import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCategories: false,
  searchQuery: "",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    toggleCategoriesMenu(state) {
      state.showCategories = !state.showCategories;
    },
    showCategoriesMenu(state) {
      state.showCategories = true;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleCategoriesMenu, showCategoriesMenu, setSearchQuery } =
  shopSlice.actions;

export default shopSlice.reducer;
