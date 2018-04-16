import React from 'react';
import { translate } from 'react-i18next';

const Corrections = ({ t }) => {
  return <h3>{t('Coming Soon')}</h3>;
};

export default translate()(Corrections);
