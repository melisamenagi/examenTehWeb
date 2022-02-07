import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    videos: [],
    favouriteListsShown: []
  },
  reducers: {
    saveVideos: (state, action) => {
      state.videos = action.payload;
    },
    saveFavouriteListsShown: (state, action) => {
        state.favouriteListsShown = action.payload;
      }
  }
});

export const { saveVideos, saveFavouriteListsShown } = sessionSlice.actions;
export default sessionSlice.reducer;