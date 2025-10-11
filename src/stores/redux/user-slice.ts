import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string | null;
  email: string | null;
  avatarUrl?: string | null;
}

const initialState: UserState = {
  displayName: null,
  email: null,
  avatarUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl || null;
    },
    clearUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.avatarUrl = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
