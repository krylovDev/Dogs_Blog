/* eslint-disable */
import React from 'react';
import './PostItem.scss';
import { PostType } from '../../../types/types';
import UserAvatar from '../../Users/UserAvatar/UserAvatar';

interface Props {
  item: PostType;
  onPostCardOpen: (id: PostType) => void;
}

const UserItem = ({ item, onPostCardOpen }: Props) => (
  <div className="post__card" onClick={() => item && onPostCardOpen(item)}>
    <div className="post__head">
      {item.owner && item.owner.id && item.owner.firstName && item.owner.lastName && item.owner.picture && (
        <UserAvatar
          id={item.owner.id}
          firstName={item.owner.firstName}
          lastName={item.owner.lastName}
          picture={item.owner.picture}
        />)}
      <p className="post__publish">
        <span>{item.publishDate && item.publishDate.split('T')[0].split('-').reverse().join('.')}</span>
        <span> в </span>
        <span>
          {item.publishDate && item.publishDate.split('T')[1].split(':')[0]}
          :
          {item.publishDate && item.publishDate.split('T')[1].split(':')[1]}
        </span>
      </p>
    </div>
    <div className="post__content">
      <div className="post__img-wrap">
        <img className="post__image" src={item.image && item.image} alt=" " />
      </div>
      <p className="post__text">{item.text && item.text}</p>
    </div>
  </div>
);

export default UserItem;
