const BASE_URL = 'https://dummyapi.io/data/v1/';

export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';

export const USER_URL = `${BASE_URL}user`;
export const USER_CREATE_URL = `${BASE_URL}user/create`;

export const POSTS_URL = `${BASE_URL}post`;

export const APP_ID_VALUE = '61c4b4ba9855aa6d34a24c9a';

export const APP_ID_FIELD = 'app-id';
export const PAGE_FIELD = 'page';
export const LIMIT_FIELD = 'limit';

export const DARK_THEME = 'darkTheme';
export const TRUE_STRING = 'true';

// ACTIONS //

export const AUTH_SIGN_IN = 'AUTH/SIGN_IN';
export const AUTH_LOG_OUT = 'AUTH/LOG_OUT';
export const AUTH_SUCCESS = 'AUTH/SUCCESS';
export const AUTH_ERROR = 'AUTH/ERROR';

export const USERS_GET = 'USERS/GET';
export const USERS_LIST_GET_SUCCESS = 'USERS/SUCCESS_GET';
export const USERS_LOAD = 'USERS/LOAD';
export const USERS_ERROR = 'USERS/ERROR';
export const USERS_CREATE = 'USERS/CREATE';
export const USERS_UPDATE = 'USERS/UPDATE';
export const AVATAR_UPLOAD = 'USERS/AVATAR_UPLOAD';

export const POSTS_USER = 'POSTS/LOAD_BY_USER';
export const POSTS_LOADING = 'POSTS/LOAD';
export const LOAD_POSTS_SUCCESS = 'POSTS/SUCCESS';
export const GET_CURRENT_POSTS_SUCCESS = 'POSTS/CET_CURRENT_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'POSTS/ERROR';

export const SET_PAGE = 'SET_PAGE';
export const SET_LIMIT = 'SET_LIMIT';

export const COMMENTS_POST = 'COMMENTS/LOAD_BY_POST';
export const COMMENTS_USER = 'COMMENTS/LOAD_BY_USER';
export const COMMENTS_LOAD = 'COMMENTS/LOAD';
export const COMMENTS_SUCCESS = 'COMMENTS/SUCCESS';
export const COMMENTS_ERROR = 'COMMENTS/ERROR';
