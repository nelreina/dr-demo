import React from 'react';
import { translate } from 'react-i18next';

import Languages from './Languages';
import UserInfo from './UserInfo';

const TopBar = ({ t, auth, logout }) => {
  const { isAuthenticated, user } = auth;
  return (
    <div className="top-bar">
      <Languages langs={['en', 'es']} />
      {isAuthenticated && <UserInfo user={user} logout={logout} />}
    </div>
  );
};

export default translate()(TopBar);
