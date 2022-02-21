/* eslint-disable */
import produce from 'immer';
import { CommentListState } from '../../types/state';
import { CommentsAction } from "../../types/actions";
import {
  SET_LIMIT,
  SET_PAGE,
  COMMENTS_LOAD,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from '../../constants/constants';
import { CommentType } from '../../types/types';

const initialState: CommentListState = {
  postId: '',
  comments: [],
  page: 0,
  pageSize: 5,
  total: 0,
  loading: false,
  error: '',
};

const showLoading = (draft: CommentListState) => {
  draft.loading = true;
  return draft;
};

const setPage = (draft: CommentListState, page?: number) => {
  if (page != null) {
    draft.page = page;
  }
  return draft;
}

const setLimit = (draft: CommentListState, limit?: number) => {
  if (limit != null) {
    draft.pageSize = limit;
  }
  return draft;
}

const loadSuccess = (draft: CommentListState, resp?: Array<CommentType>, total?: number, page?: number, limit?: number) => {
  draft.comments = resp || [];
  if (page != null) {
    draft.page = page;
  }
  if (limit != null) {
    draft.pageSize = limit;
  }
  if (total != null) {
    draft.total = total;
  }
  draft.loading = false;
  return draft;
};

const loadError = (draft: CommentListState, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: CommentsAction) => produce(
  state,
  (draft: CommentListState) => {
    switch (action.type) {
      case COMMENTS_LOAD: return showLoading(draft);
      case COMMENTS_SUCCESS: return loadSuccess(draft, action.comments, action.total, action.page, action.pageSize);
      case SET_LIMIT: return setLimit(draft, action.pageSize);
      case SET_PAGE: return setPage(draft, action.page);
      case COMMENTS_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
