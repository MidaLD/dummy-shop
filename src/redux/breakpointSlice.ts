import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BreakpointState = {
  xl2: boolean;
};

const initialState: BreakpointState = {
  xl2: false,
};

const breakpointSlice = createSlice({
  name: "breakpoint",
  initialState,
  reducers: {
    setIsLargeDesktop(state, action: PayloadAction<boolean>) {
      state.xl2 = action.payload;
    },
  },
});

export const { setIsLargeDesktop } = breakpointSlice.actions;
export default breakpointSlice.reducer;
