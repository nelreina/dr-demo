import React from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const BreadcrumbItem = ({ t, item }) => {
  return (
    <li className="breadcrumb-item">
      <NavLink activeClassName="active" to={item.url}>
        {t(item.name)}
      </NavLink>
    </li>
  );
};

export default translate()(BreadcrumbItem);
