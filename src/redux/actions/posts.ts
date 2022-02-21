import { Dispatch } from 'redux';
import { PostsAction } from '../../types/actions';
import { PostType } from '../../types/types';
import {
  POSTS_LOADING,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
  SET_LIMIT, SET_PAGE,
  GET_CURRENT_POSTS_SUCCESS,
} from '../../constants/constants';
import { getPostById, getPostList } from '../../api/dumMyApi';

const loadSuccessAction = (posts: Array<PostType>, total: number, page: number, limit: number): PostsAction => ({
  type: LOAD_POSTS_SUCCESS,
  posts,
  total,
  page,
  limit,
  loading: false,
  error: '',
});

const loadCurrentPostSuccessAction = (currentPost: PostType): PostsAction => ({
  type: GET_CURRENT_POSTS_SUCCESS,
  post: currentPost,
  loading: false,
  error: '',
});

const loadErrorAction = (error: string): PostsAction => ({
  type: LOAD_POSTS_ERROR,
  loading: false,
  error,
});

const showLoadingAction = () => ({
  type: POSTS_LOADING,
  loading: true,
});

const setLimitAction = (limit: number): PostsAction => ({
  type: SET_LIMIT,
  limit,
});

const setPageAction = (page: number): PostsAction => ({
  type: SET_PAGE,
  page,
});

export const updatePageNumber = (pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(setLimitAction(pageSize));
  dispatch(setPageAction(pageNum));
  getPostList(1, 10, (resp: any) => {
    dispatch(loadSuccessAction(resp.data, resp.total, resp.page, resp.limit));
  }, (error: any) => dispatch(loadErrorAction(error)));
};

export const load = (pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getPostList(pageNum, pageSize, (resp: any) => {
    dispatch(loadSuccessAction(resp.data, resp.total, resp.page, resp.limit));
  }, (error: any) => dispatch(loadErrorAction(error)));
};

export const loadCurrentPost = (id: string): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getPostById(id, (resp: any) => {
    dispatch(loadCurrentPostSuccessAction(resp));
  }, (error: any) => dispatch(loadErrorAction(error)));
};
