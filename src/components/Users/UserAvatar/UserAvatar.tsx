import React from 'react';
import './UserAvatar.scss';
import { useHistory } from 'react-router-dom';
import { Avatar } from 'antd';

interface Props {
  id?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  activeLink?: boolean;
}

const UserAvatar = ({
  id,
  firstName,
  lastName,
  picture,
  activeLink,
}: Props) => {
  const history = useHistory();

  const goToUserProfile = (userId: string): void => {
    history.push(`/user/${userId}`);
    window.location.reload();
  };

  return (
    <div onClick={() => id && activeLink && goToUserProfile(id)}>
      <div className="user-avatar">
        <Avatar src={picture} size="large" />
        <div className="user-avatar__tooltip">{id}</div>
        <p className="user-avatar__name">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </p>
      </div>
    </div>
  );
};

UserAvatar.defaultProps = {
  id: '',
  firstName: '',
  lastName: '',
  picture: '',
  activeLink: false,
};

export default UserAvatar;
