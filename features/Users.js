import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    value: [
      {
        name: "Homelander",
        id: "saviour",
      },
      {
        name: "Billy Butcher",
        id: "killer",
      },
    ],
  },
  reducers: {},
});

export default userSlice.reducer;
