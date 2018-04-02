import React from 'react';
import { translate } from 'react-i18next';

const Resident = ({ header, t }) => {
  return (
    <thead>
      <tr>
        <th>{t('Account')}</th>
        <th>{t('Description')}</th>
        <th style={header}>{t('RESIDENT')}</th>
        <th style={header}>{t('NON RESIDENT')}</th>
        <th style={header}>{t('Total')}</th>
      </tr>
    </thead>
  );
};

export default translate()(Resident);
