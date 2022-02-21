import { Dispatch } from 'redux';
import { CommentsAction } from '../../types/actions';
import { CommentType } from '../../types/types';
import {
  SET_LIMIT,
  SET_PAGE,
  COMMENTS_LOAD,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from '../../constants/constants';
import { getCommentsByPost } from '../../api/dumMyApi';

const loadSuccessAction = (comments: Array<CommentType>, total: number, page: number, limit: number): CommentsAction => ({
  type: COMMENTS_SUCCESS,
  comments,
  total,
  page,
  pageSize: limit,
  loading: false,
  error: '',
});

const loadErrorAction = (error: string): CommentsAction => ({
  type: COMMENTS_ERROR,
  loading: false,
  error,
});

const showLoadingAction = (): CommentsAction => ({
  type: COMMENTS_LOAD,
  loading: true,
});

const setLimitAction = (limit: number): CommentsAction => ({
  type: SET_LIMIT,
  pageSize: limit,
});

const setPageAction = (page: number): CommentsAction => ({
  type: SET_PAGE,
  page,
});

export const updatePageNumber = (id: string, pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(setLimitAction(pageSize));
  dispatch(setPageAction(pageNum));
  getCommentsByPost(id, pageNum, pageSize, (resp: any) => {
    dispatch(loadSuccessAction(resp.data, resp.total, resp.page, resp.limit));
  }, (error: any) => dispatch(loadErrorAction(error)));
};

export const load = (id: string, pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getCommentsByPost(id, pageNum, pageSize, (resp: any) => {
    dispatch(loadSuccessAction(resp.data, resp.total, resp.page, resp.limit));
  }, (error: any) => dispatch(loadErrorAction(error)));
};
