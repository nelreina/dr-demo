import React from 'react';
import { translate } from 'react-i18next';

const Corrections = ({ t }) => {
  return (
    <div className="container">
      <h3>{t('Coming Soon')}</h3>
    </div>
  )
};

export default translate()(Corrections);
