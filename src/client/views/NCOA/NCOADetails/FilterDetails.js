import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import BootstrapField from '../../../components/BootstrapField';

let FilterDetails = ({}) => {
  return (
    <form>
      <Field name="filter" component={BootstrapField} />
    </form>
  );
};

FilterDetails = reduxForm({
  form: 'filterDetails'
})(FilterDetails);

export default translate()(FilterDetails);
