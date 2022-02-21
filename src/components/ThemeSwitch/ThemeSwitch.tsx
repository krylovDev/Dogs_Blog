import React, { useContext, useState } from 'react';
import './ThemeSwitch.scss';
import { Switch } from 'antd';
import { ThemeContext } from '../../context/ThemeContext';
import { DARK_THEME, TRUE_STRING } from '../../constants/constants';

const ThemeSwitch = () => {
  const [switchValue, setSwitchValue] = useState(localStorage.getItem(DARK_THEME) === TRUE_STRING);
  const themeContext = useContext(ThemeContext);
  const onChange = (checked: any): void => {
    themeContext.toggleTheme && themeContext.toggleTheme(checked);
    setSwitchValue(checked);
  };

  return (
    <div className="theme-switch">
      <p className="theme-switch__title">Тёмная тема</p>
      <Switch
        checked={switchValue}
        onChange={onChange}
      />
    </div>
  );
};

export default ThemeSwitch;
