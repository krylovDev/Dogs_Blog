import { Dispatch } from 'redux';
import {
  USERS_LOAD,
  USERS_ERROR,
  USERS_LIST_GET_SUCCESS,
  USERS_GET,
  AVATAR_UPLOAD,
  POSTS_USER,
} from '../../constants/constants';
import { UserType } from '../../types/types';
import { UsersAction } from '../../types/actions';
import {
  createUser,
  getUserById,
  getUserList,
  getUsersPostById,
  updateUser,
} from '../../api/dumMyApi';

const showLoadingAction = (): UsersAction => ({
  type: USERS_LOAD,
  loading: true,
});

const loadErrorAction = (error: string): UsersAction => ({
  type: USERS_ERROR,
  loading: false,
  error,
});

const loadUserListSuccessAction = (users: Array<UserType>, total: number, page: number, limit: number, error?: string): UsersAction => ({
  type: USERS_LIST_GET_SUCCESS,
  users,
  total,
  page,
  limit,
  loading: false,
  error,
});

const loadPostsCurrentUserSuccessAction = (posts: any, page: number, limit: number, total: number, error?: string): UsersAction => ({
  type: POSTS_USER,
  posts,
  total,
  page,
  limit,
  loading: false,
  error,
});

const loadCurrentUserSuccessAction = (user: UserType, error?: string): UsersAction => ({
  type: USERS_GET,
  user,
  loading: false,
  error,
});

export const uploadAvatarAction = (id: string, avatar: Blob, error?: string): UsersAction => ({
  type: AVATAR_UPLOAD,
  id,
  avatar,
  error,
});

export const loadUserList = (pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserList(pageNum, pageSize, (resp: any) => {
    if (resp.error) {
      console.error(resp.error);
    }
    dispatch(loadUserListSuccessAction(resp.data, resp.total, resp.page, resp.limit));
  }, (error: any) => {
    dispatch(loadErrorAction(error));
  });
};

export const getCurrentUser = (id: string): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserById(id, (resp: UserType) => {
    dispatch(loadCurrentUserSuccessAction(resp));
  }, (error: any) => {
    dispatch(loadErrorAction(error));
  });
};

export const loadUserPosts = (id: string, pageNum: number, pageSize: number): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUsersPostById(id, pageNum, pageSize, (resp: any) => {
    if (resp.error) {
      console.error(resp.error);
    }
    dispatch(loadPostsCurrentUserSuccessAction(resp.data, resp.page, resp.limit, resp.total));
  }, (error: any) => {
    dispatch(loadErrorAction(error));
  });
};

export const createNewUser = (body: UserType, callback: any): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  createUser(body, (resp: any) => {
    dispatch(loadCurrentUserSuccessAction(resp));
    callback(resp);
  },
  (error: any) => {
    dispatch(loadErrorAction(error));
  });
};

export const updateCurrentUser = (body: UserType, id: string): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  updateUser(body, id, (resp: any) => {
    if (resp.error) {
      console.error(resp.error);
    }
    dispatch(loadCurrentUserSuccessAction(resp));
  }, (error: any) => {
    dispatch(loadErrorAction(error));
  });
};
