import React from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import List from './List';

const navs = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'View Reports',
    url: '/reports'
  },
  {
    name: 'Uploaded Data',
    url: '/uploaded-data'
  },
  {
    name: 'Corrections',
    url: '/corrections'
  }
];

const NavLinkItem = ({ item }) => (
  <NavLink className="nav-link" activeClassName="active" to={item.url}>
    {item.name}
  </NavLink>
);

const SidebarNav = ({ t }) => {
  return (
    <nav className="nav flex-column sidebar-nav container">
      <List of={NavLinkItem} iterator={navs} />
    </nav>
  );
};

export default translate()(SidebarNav);
