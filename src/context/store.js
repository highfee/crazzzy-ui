import { configureStore } from "@reduxjs/toolkit";
import stakingSlice from "./stakingSlice";

export const store = configureStore({
  reducer: {
    staking: stakingSlice,
  },
});
