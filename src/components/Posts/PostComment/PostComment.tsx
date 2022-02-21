/* eslint-disable */
import React from 'react';
import './PostComment.scss';
import { CommentType } from '../../../types/types';
import UserAvatar from '../../Users/UserAvatar/UserAvatar';

interface Props {
  item: CommentType;
}

const PostComment = ({ item }: Props) => (
  <li className="comment__item">
    <div className="comment__head">
      {item.owner && item.owner.id && item.owner.firstName && item.owner.lastName && item.owner.picture && <UserAvatar
        id={item.owner.id}
        firstName={item.owner.firstName}
        lastName={item.owner.lastName}
        picture={item.owner.picture}
      />}
      <p className="comment__publish">
        <span>{item.publishDate && item.publishDate.split('T')[0].split('-').reverse().join('.')}</span>
        <span> в </span>
        <span>
          {item.publishDate && item.publishDate.split('T')[1].split(':')[0]}
          :
          {item.publishDate && item.publishDate.split('T')[1].split(':')[1]}
        </span>
      </p>
    </div>
    <p className="comment__text">{item.message && item.message}</p>
  </li>
);

export default PostComment;
