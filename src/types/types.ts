export interface MenuItemType {
  name: string;
  path: string;
  icon?: string;
}

export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface UserType {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  error?: string;
}

export interface UserListResponse extends ListResponseType<UserType> {}

export interface PostType {
  id?: string;
  image?: string;
  likes?: number;
  publishDate?: string;
  text?: string;
  tags?: Array<string>;
  owner?: UserType;
  loading?: boolean;
}

export interface PostListResponse extends ListResponseType<PostType> {}

export interface CommentType {
  id?: string;
  message?: string;
  post?: string;
  publishDate?: string;
  owner?: UserType;
}

export interface CommentListResponse extends ListResponseType<CommentType> {}

export interface ResponseError {
  error: string;
}
