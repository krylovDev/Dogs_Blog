import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/posts';
import { State } from '../../../types/state';
import { MenuItemType, UserType } from '../../../types/types';
import UserAvatar from '../../Users/UserAvatar/UserAvatar';
import './AuthorizationPanel.scss';

interface Props {
  auth?: boolean;
  user?: UserType;
  id?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

const AuthorizationPanel = ({
  auth,
  user,
  id,
  firstName,
  lastName,
  picture,
}: Props) => {
  const [menuList] = useState([
    {
      name: 'Вход',
      path: '/signin',
    },
    {
      name: 'Регистрация',
      path: '/login',
    },
  ] as Array<MenuItemType>);

  const logOut = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('auth');
    window.location.reload();
  };

  return (
    <ul className="navigation__auth">
      {auth && user && (
        <>
          <UserAvatar id={id || user.id} firstName={firstName || user.firstName} lastName={lastName || user.lastName} picture={picture || user.picture} activeLink />
          <button className="navigation__logout" onClick={logOut} type="button">Выход</button>
        </>
      )}
      {!auth && menuList && menuList.map((item:MenuItemType, index: number) => (
        <li className={`navigation__item navigation__item_${item.path.substr(1)}`} key={index}>
          <Link to={item.path && item.path}>
            {item.name && item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

AuthorizationPanel.defaultProps = {
  auth: false,
  id: '',
  user: {},
  firstName: '',
  lastName: '',
  picture: '',
};

export default connect(
  (state: State) => ({
    auth: state.auth.auth,
    user: state.auth.user,
    id: state.auth.id,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    picture: state.auth.picture,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(AuthorizationPanel);
