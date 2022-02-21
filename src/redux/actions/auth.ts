import { Dispatch } from 'redux';
import {
  AUTH_SIGN_IN,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from '../../constants/constants';
import { UserType } from '../../types/types';
import { AuthAction } from '../../types/actions';
import { getUserById } from '../../api/dumMyApi';

const loadSuccessAction = (user: UserType): AuthAction => ({
  type: AUTH_SUCCESS,
  auth: true,
  user,
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  picture: user.picture,
  loading: false,
  error: '',
});

const loadErrorAction = (error: string): AuthAction => ({
  type: AUTH_ERROR,
  loading: false,
  error,
});

const showLoadingAction = () => ({
  type: AUTH_SIGN_IN,
  loading: true,
});

export const login = (id: string): any => (dispatch: Dispatch) => {
  dispatch(showLoadingAction());
  getUserById(id, (resp: any) => {
    dispatch(loadSuccessAction(resp));
    window.localStorage.setItem('user', JSON.stringify(resp));
    window.localStorage.setItem('user_id', JSON.stringify(resp.id));
    window.localStorage.setItem('auth', JSON.stringify(true));
  }, (error: any) => dispatch(loadErrorAction(error)));
};
