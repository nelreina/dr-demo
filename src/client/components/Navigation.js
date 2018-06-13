import React from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
const Navigation = ({ t }) => {
  return (
    <ul className="nav">
      <li className="nav nav-item">
        <NavLink className="nav-link" to="/translations">
          Translations
        </NavLink>
      </li>
    </ul>
  );
};

export default translate()(Navigation);
