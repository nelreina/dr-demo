import React from 'react';
import { translate } from 'react-i18next';
import List from './List';
import NavLinkItem from './NavLinkItem';

const navs = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'View Reports',
    url: '/reportlist'
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

const SidebarNav = ({ t }) => {
  return (
    <nav className="nav flex-column sidebar-nav container">
      <List of={NavLinkItem} iterator={navs} />
    </nav>
  );
};

export default translate()(SidebarNav);
