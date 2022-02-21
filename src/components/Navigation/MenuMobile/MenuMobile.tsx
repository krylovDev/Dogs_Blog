import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppstoreOutlined,
  PictureOutlined,
  UserOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MenuItemType } from '../../../types/types';
import * as actions from '../../../redux/actions/posts';
import { State } from '../../../types/state';
import './MenuMobile.scss';

interface Props {
  auth?: boolean;
}

const MenuMobile = ({ auth }: Props) => {
  const [authUserId] = useState(window.localStorage.getItem('user_id') as string);
  const [visibleMenu, setVisibleMenu] = useState(false as boolean);
  const history = useHistory();
  const [menuList] = useState([
    {
      name: 'Пользователи',
      path: '/users',
      icon: 'users',
    },
    {
      name: 'Посты',
      path: '/posts',
      icon: 'picture',
    },
  ] as Array<MenuItemType>);
  const [authMenuList] = useState([
    {
      name: 'Вход',
      path: '/signin',
      icon: 'signin',
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

  const goToUserProfile = (): any => {
    history.push(`/user/${authUserId && authUserId.slice(1, -1)}`);
    window.location.reload();
  };

  return (
    <header className="menu">
      <div className="menu__container">
        <button className="menu__button" type="button" onClick={() => setVisibleMenu(!visibleMenu)}>
          <AppstoreOutlined />
        </button>
        {visibleMenu && (
          <ul className="menu__list">
            { menuList && menuList.map((item, index) => (
              <li className="menu__item" key={index}>
                <Link to={item.path}>
                  <span className="menu__icon">
                    {item.icon && item.icon === 'users' ? <UserOutlined /> : <PictureOutlined /> }
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
            {!auth && authMenuList && authMenuList.map((item, index) => (
              <li className="menu__item" key={index}>
                <Link to={item.path}>
                  <span className="menu__icon">
                    {item.icon && item.icon === 'signin' ? <LoginOutlined /> : <UsergroupAddOutlined /> }
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
            {auth && (
              <>
                <li className="menu__item">
                  <button type="button" onClick={goToUserProfile}>
                    <span className="menu__icon">
                      <KeyOutlined />
                    </span>
                    Личный кабинет
                  </button>
                </li>
                <li className="menu__item">
                  <button className="menu__logout" onClick={logOut} type="button">
                    <span className="menu__icon">
                      <LogoutOutlined />
                    </span>
                    Выход
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

MenuMobile.defaultProps = {
  auth: false,
};

export default connect(
  (state: State) => ({
    auth: state.auth.auth,
    id: state.auth.id,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(MenuMobile);
