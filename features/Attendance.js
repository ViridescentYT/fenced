import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    value: {
      isMarked: false,
    },
  },
  reducers: {
    markAttendance: (state, action) => {
      state.value.isMarked = true;
    },
  },
});

export default attendanceSlice.reducer;
export const { markAttendance } = attendanceSlice.actions;
