import React from 'react';
import './Footer.scss';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <p className="footer__company">Dogs Blog 1970-2021</p>
      <ThemeSwitch />
    </div>
  </footer>
);

export default Footer;
