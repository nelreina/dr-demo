import React from 'react';
import { translate } from 'react-i18next';

const ShowUserProfile = ({ t, user }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{t('User account information')}</h3>
      </div>
      <div className="card-body">
        <div className="form-group row">
          <label className="col-md-4 col-form-label">{t('Name')}</label>
          <div className="col-md-8">
            <p>user.fullName</p>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-4 col-form-label">{t('E-mail')}</label>
          <div className="col-md-8">
            <p>user.Email</p>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-4 col-form-label">{t('Username')}</label>
          <div className="col-md-8">
            <p>andrew.ng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate()(ShowUserProfile);
