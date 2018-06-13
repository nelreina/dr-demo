import React from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ t, item }) => {
  return (
    <NavLink className="nav-link" activeClassName="active" to={item.url}>
      {t(item.name)}
    </NavLink>
  );
};

export default translate()(NavLinkItem);
