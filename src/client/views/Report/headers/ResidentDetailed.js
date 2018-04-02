import React from 'react';
import { translate } from 'react-i18next';

const ResidentDetailed = ({ header, t }) => {
  return (
    <thead>
      <tr>
        <th colSpan="2" />
        <th style={header} colSpan="2">
          {t('RESIDENT')}
        </th>
        <th style={header} colSpan="2">
          {t('NON RESIDENT')}
        </th>
        <th />
      </tr>
      <tr>
        <th>{t('Account')}</th>
        <th>{t('Description')}</th>
        <th style={header}>Pesos</th>
        <th style={header}>{t('FC')}</th>
        <th style={header}>Pesos</th>
        <th style={header}>{t('FC')}</th>
        <th style={header}>Total</th>
      </tr>
    </thead>
  );
};

export default translate()(ResidentDetailed);
