/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './PostCard.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Space, Pagination } from 'antd';
import { CloseOutlined, TagsOutlined } from '@ant-design/icons';
import { CommentListState, State } from '../../../types/state';
import * as actions from '../../../redux/actions/comments';
import { loadCurrentPost } from '../../../redux/actions/posts';
import {
  PostType,
  CommentType,
} from '../../../types/types';
import UserAvatar from '../../Users/UserAvatar/UserAvatar';
import PostComment from '../PostComment/PostComment';

interface Props {
  post?: PostType;
  comments?: CommentListState;
  page?: any;
  pageSize?: any;
  total?: number;
  loading?: boolean;
  load: (id: string, pageNumber: number, limitNumber: number) => any;
  updatePageNumber: (id: string, pageNumber: number, limitNumber: number) => any;
  onPostCardClose: () => void;
}

const PostCard = ({
  post,
  comments,
  page,
  pageSize,
  total,
  loading,
  load,
  updatePageNumber,
  onPostCardClose,
}: Props) => {
  const [pageSizeArray] = useState(['5', '10', '20'] as Array<string>);

  useEffect(() => {
    if (post && post.id) {
      loadCurrentPost(post.id);
      load(post.id, page, pageSize);
    }
  }, []);

  const updatePage = (current: number, limitNumber: number): void => {
    if (post && post.id) {
      updatePageNumber(post.id, current, limitNumber);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card__modal">
        {loading && (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )}
        {!loading && (
          <>
            <div className="post-card__head">
              {post && post.owner && post.owner.id && post.owner.firstName && post.owner.lastName && post.owner.picture &&
                <UserAvatar
                  id={post.owner.id}
                  firstName={post.owner.firstName}
                  lastName={post.owner.lastName}
                  picture={post.owner.picture} /> }
              <p className="post-card__publish">
                <span>{post && post.publishDate && post.publishDate.split('T')[0].split('-').reverse().join('.')}</span>
                <span> в </span>
                <span>
                  {post && post.publishDate && post.publishDate.split('T')[1].split(':')[0]}
                  :
                  {post && post.publishDate && post.publishDate.split('T')[1].split(':')[1]}
                </span>
              </p>
              <button className="post-card__close" type="button" onClick={onPostCardClose}>
                <CloseOutlined />
              </button>
            </div>
            <div className="post-card__content">
              <img className="post-card__image" src={post && post.image && post.image} alt=" " />
              <div className="post-card__tags">
                <TagsOutlined />
                {post && post.tags && post.tags.map((tag: string, index: number) => (
                  <p className="post-card__tag" key={index}>
                    #
                    {tag}
                  </p>
                ))}
              </div>
              <p className="post-card__text">{post && post.text && post.text}</p>
              <div className="post-card__comments comments">
                <h2 className="comments__title">Комментарии</h2>
                { comments?.comments && comments?.comments.length ? (
                  <ul className="comments__list">
                    {comments?.comments && comments.comments.map((item: CommentType, index: number) => <PostComment item={item} key={index} />)}
                  </ul>
                ) : (<p className="comments__empty">Нет комментариев :(</p>)}
              </div>
              <div className="pagination">
                <Pagination
                  total={total}
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeArray}
                  current={page + 1}
                  onChange={updatePage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    comments: state.comments,
    totalCount: state.comments.total,
    page: state.comments.page,
    pageSize: state.comments.pageSize,
    loading: state.comments.loading,
    error: state.comments.error,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(PostCard);
