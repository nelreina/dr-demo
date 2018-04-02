import React from 'react';
import { translate } from 'react-i18next';

const Dashboard = ({ t }) => {
  return <h3>{t('Dashboard')}</h3>;
};
export default translate()(Dashboard);
