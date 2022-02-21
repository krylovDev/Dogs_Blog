import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.scss';
import { UserType } from '../../../types/types';
import UserAvatar from '../UserAvatar/UserAvatar';

interface Props {
  item: UserType;
}

const UserItem = ({ item }: Props) => (
  <Link to={`user/${item.id}`}>
    <div className="user__info">
      <UserAvatar id={item.id} firstName={item.firstName} lastName={item.lastName} picture={item.picture} />
    </div>
  </Link>
);

export default UserItem;
