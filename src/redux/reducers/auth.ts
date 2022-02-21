/* eslint-disable */
import produce from 'immer';
import {
  AUTH_SIGN_IN,
  AUTH_LOG_OUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from '../../constants/constants';
import { AuthState } from '../../types/state';
import { UserType } from '../../types/types';
import { AuthAction } from '../../types/actions';

const initialState: AuthState = {
  auth: false,
  user: {},
  id: '',
  firstName: '',
  lastName: '',
  picture: '',
  loading: false,
  error: '',
};

const loadingAuth = (draft: AuthAction) => {
  draft.loading = true;
  return draft;
};

const authSuccess = (draft: AuthAction, resp: UserType) => {
  draft.auth = true;
  draft.user = resp;
  draft.id = resp.id;
  draft.firstName = resp.firstName;
  draft.lastName = resp.lastName;
  draft.picture = resp.picture;
  draft.loading = false;
  return draft;
};

const authLogOut = (draft: AuthAction) => {
  draft.auth = false;
  draft.user = {};
  draft.id = '';
  draft.firstName = '';
  draft.lastName = '';
  draft.picture = '';
  draft.loading = false;
  return draft;
};

const loadError = (draft: AuthAction, e?: any) => {
  draft.loading = false;
  draft.error = e;
  return draft;
};

export default (state = initialState, action: AuthAction) => produce(
  state,
  (draft: AuthAction) => {
    switch (action.type) {
      case AUTH_SIGN_IN: return loadingAuth(draft);
      case AUTH_SUCCESS: return authSuccess(draft, action);
      case AUTH_LOG_OUT: return authLogOut(draft);
      case AUTH_ERROR: return loadError(draft, action.error);
      default: return state;
    }
  },
);
