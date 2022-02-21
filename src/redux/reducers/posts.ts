/* eslint-disable */
import produce from 'immer';
import { PostListState } from '../../types/state';
import { PostsAction } from "../../types/actions";
import {
  POSTS_LOADING,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
  SET_LIMIT,
  SET_PAGE,
  POSTS_USER,
  GET_CURRENT_POSTS_SUCCESS,
} from '../../constants/constants';
import { PostType } from '../../types/types';

const initialState: PostListState = {
  posts: [],
  post: {},
  page: 0,
  limit: 12,
  total: 0,
  loading: false,
  error: '',
};

const showLoading = (draft: PostListState) => {
  draft.loading = true;
  return draft;
};

const setPage = (draft: PostListState, page?: number) => {
  draft.page = page;
  return draft;
}

const setLimit = (draft: PostListState, limit?: number) => {
  draft.limit = limit;
  return draft;
}

const loadSuccess = (draft: PostListState, resp?: Array<PostType>, total?: number, page?: number, limit?: number) => {
  draft.posts = resp || [];
  draft.page = page;
  draft.limit = limit;
  draft.total = total;
  draft.loading = false;
  return draft;
};

const loadCurrentPostSuccess = (draft: PostListState, resp?: PostType) => {
  draft.post = resp || {};
  draft.loading = false;
  return draft;
};

const loadError = (draft: PostListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: PostsAction) => produce(
  state,
  (draft: PostListState) => {
    switch (action.type) {
      case POSTS_LOADING: return showLoading(draft);
      case LOAD_POSTS_SUCCESS: return loadSuccess(draft, action.posts, action.total, action.page, action.limit);
      case POSTS_USER: return loadSuccess(draft, action.posts, action.total, action.page, action.limit);
      case GET_CURRENT_POSTS_SUCCESS: return loadCurrentPostSuccess(draft, action.post);
      case SET_LIMIT: return setLimit(draft, action.limit);
      case SET_PAGE: return setPage(draft, action.page);
      case LOAD_POSTS_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
