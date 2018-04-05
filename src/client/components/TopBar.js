import React from 'react';
import { translate } from 'react-i18next';

import Languages from './Languages';
import UserInfo from './UserInfo';
import Navigation from './Navigation';

const TopBar = ({ t, auth, logout }) => {
  const { isAuthenticated, user } = auth;
  return (
    <div className="top-bar">
      <Languages langs={['en', 'es']} />
      {user && user.isAdmin && <Navigation />}
      {isAuthenticated && <UserInfo user={user} logout={logout} />}
    </div>
  );
};

export default translate()(TopBar);
