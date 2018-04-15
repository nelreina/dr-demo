import React from 'react';
import { translate } from 'react-i18next';
import logo from '../assets/greenlight.png';
import SidebarNav from './SidebarNav';

const Sidebar = ({ t, auth }) => {
  const { isAuthenticated } = auth;
  return (
    <aside className="sidebar">
      <img src={logo} alt="Site Logo" />
      {isAuthenticated ? <SidebarNav /> : <nav />}
      <div className="container footer">
        <small>IBIS Management </small>
      </div>
    </aside>
  );
};

export default translate()(Sidebar);
