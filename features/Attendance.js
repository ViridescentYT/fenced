import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    value: {
      isMarked: false,
    },
  },
  reducers: {
    invertAttendance: (state, action) => {
      state.value.isMarked = !state.value.isMarked;
    },
  },
});

export default attendanceSlice.reducer;
export const { invertAttendance } = attendanceSlice.actions;
