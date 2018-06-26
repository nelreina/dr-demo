import React from 'react';
import { translate } from 'react-i18next';
import List from 'nr-react-list';
import NavLinkItem from './NavLinkItem';
import navs from './navs_definitions';


const SidebarNav = ({ t }) => {
  return (
    <nav className="nav flex-column sidebar-nav container">
      <List of={NavLinkItem} iterator={navs} />
    </nav>
  );
};

export default translate()(SidebarNav);
