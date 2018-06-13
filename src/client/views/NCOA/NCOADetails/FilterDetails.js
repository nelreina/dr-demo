import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import BootstrapField from '../../../components/BootstrapField';

let FilterDetails = ({ }) => {
  return (
    <div className="ncoa-details-filter-form">
      <hr />
      <form className="form-inline">
        <Field name="filter" component={BootstrapField} />
      </form>
      <hr />
    </div>
  );
};

FilterDetails = reduxForm({
  form: 'filterDetails'
})(FilterDetails);

export default translate()(FilterDetails);
