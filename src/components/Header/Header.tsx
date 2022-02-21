import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import AuthorizationPanel from '../Navigation/AuthorizationPanel/AuthorizationPanel';
import MenuMobile from '../Navigation/MenuMobile/MenuMobile';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__logo logo"><Link to="/">Dogs Blog</Link></div>
      <NavigationList />
      <AuthorizationPanel />
      <MenuMobile />
    </div>
  </header>
);

export default Header;
