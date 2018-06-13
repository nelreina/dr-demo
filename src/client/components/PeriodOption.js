import React from 'react';
import { translate } from 'react-i18next';

const PeriodOption = ({ item, t }) => {
  return <option value={item.id}>{t(item.name)}</option>;
};

export default translate()(PeriodOption);
