import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const PostsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchPosts.pending, (state) => {
  //       state.status = Status.LOADING;
  //       state.posts = [];
  //     });
  //     builder.addCase(fetchPosts.fulfilled, (state, action) => {
  //       state.posts = action.payload;
  //       state.status = Status.SUCCESS;
  //     });
  //     builder.addCase(fetchPosts.rejected, (state) => {
  //       state.status = Status.ERROR;
  //       state.posts = [];
  //     });
  //   },
});

export const {} = PostsSlice.actions;

export default PostsSlice.reducer;
