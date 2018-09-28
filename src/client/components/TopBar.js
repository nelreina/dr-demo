import React from 'react';
import { translate } from 'react-i18next';

import Breadcrumb from './Breadcrumb';
import DropdownUser from './DropdownUser';


const TopBar = ({ t, auth, logout }) => {
  const { isAuthenticated, user } = auth;
  return (
    <div className="top-bar">
      <div className="container">
        <Breadcrumb />
        {/*<Languages langs={['en', 'es']} />*/}
        {user && user.isAdmin && <Navigation />}
        {isAuthenticated && <DropdownUser user={user} logout={logout} />}
      </div>
    </div>
  );
};

export default translate()(TopBar);
