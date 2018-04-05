import React from 'react';
import { translate } from 'react-i18next';

const UserInfo = ({ t, user, logout }) => {
  return (
    <div>
      {t('Logged in as')} <a href="#">{t(user.fullName)}</a>
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
