import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationList.scss';
import { Menu } from 'antd';
import { PictureOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItemType } from '../../../types/types';

const NavigationList = () => {
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

  return (
    <nav className="navigation">
      <Menu mode="horizontal">
        { menuList && menuList.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>
              <span className="navigation__icon">
                {item.icon && item.icon === 'users' ? <UserOutlined /> : <PictureOutlined /> }
              </span>
              {item.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default NavigationList;
