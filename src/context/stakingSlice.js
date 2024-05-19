import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staked: [],
  userNFT: 0,
};

export const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    setStaked: (state, action) => {
      state.staked = action.payload;
    },
    setUserNFT: (state, action) => {
      state.userNFT = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStaked, setUserNFT } = stakingSlice.actions;

export default stakingSlice.reducer;
