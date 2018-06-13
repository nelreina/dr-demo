import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserInfo = ({ t, user, logout }) => {
  return (
    <div>
      {t('Logged in as')}{' '}
      <Link to="/user" href="#">
        {t(user.fullName)}
      </Link>
      <a
        style={{ marginLeft: '1em' }}
        onClick={logout}
        className="btn btn-sm btn-danger"
      >
        <small className="text-white">{t('Logout')}</small>
      </a>
    </div>
  );
};

export default translate()(UserInfo);
