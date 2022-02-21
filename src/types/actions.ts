import { PostType, UserType, CommentType } from './types';

export interface Action {
  type: string;
}

export interface AuthAction extends Action {
  auth?: boolean;
  user?: UserType;
  id?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  loading?: boolean;
  error?: string;
}

export interface CreateUserAction extends Action {
  id?: string;
  entity?: UserType;
  error?: string;
}

export interface UsersAction extends Action {
  avatar?: Blob | any;
  users?: Array<UserType> | undefined;
  user?: UserType;
  posts?: any;
  id?: string;
  total?: number;
  page?: number;
  limit?: number;
  loading?: boolean;
  error?: string;
  edit?: boolean;
}

export interface CommentsAction extends Action {
  postId?: string;
  userid?: string;
  comments?: Array<CommentType>;
  total?: number;
  page?: number;
  pageSize?: number;
  loading?: boolean;
  error?: string;
}

export interface PostsAction extends Action {
  userid?: string;
  postId?: string;
  post?: PostType;
  posts?: Array<PostType> | undefined;
  total?: number;
  page?: number;
  limit?: number;
  loading?: boolean | undefined;
  error?: string | undefined;
}
