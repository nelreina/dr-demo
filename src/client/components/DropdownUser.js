import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const DropdownUser = ({ t, user, logout }) => {
  return (
    <div className="userAccountContainer">
      <div className="dropdown">
        <button className="dropbtn">
          {t(user.fullName)}
          <i className="fa fa-sort-desc"></i>
        </button>
        <div className="dropdown-content">
          <Link to="/user" href="#">
            {t('My account')}
          </Link>
          <a onClick={logout}>{t('Logout')}</a>
        </div>
      </div>
    </div>
  );
};

export default translate()(DropdownUser);
