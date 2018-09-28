import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import ShowUserProfile from '../components/ShowUserProfile';
import LanguagesUserAccount from '../components/LanguagesUserAccount';

const User = ({ t, user }) => {
  return (
    <div>
      <h2>{t('My account')}</h2>
      <div className="content">
        <ShowUserProfile user={user} />
        <LanguagesUserAccount langs={['en', 'es']} />
      </div>
    </div>
  )
};

export default translate()(User);
