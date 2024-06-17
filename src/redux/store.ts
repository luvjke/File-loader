import { configureStore } from '@reduxjs/toolkit';

import PostsSlice from './Slice/slice';

export const store = configureStore({
  reducer: {
    postsSlice: PostsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
