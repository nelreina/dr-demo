import React from 'react';
import { translate } from 'react-i18next';

const Button = ({ lang, i18n }) => (
  <button type="button"
    onClick={() => {
      i18n.changeLanguage(lang);
    }}
    className="btn btn-success"
  >
    {lang.toUpperCase()}
  </button>
);
const LangButton = translate()(Button);

const LanguagesUserAccount = ({ t, langs }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{t('Change language')}</h3>
      </div>
      <div className="card-body">
        <div className="form-group row">
          <label className="col-md-3 col-form-label">Language</label>
          <div className="col-md-9">
          <div className="btn-group" role="group">
            {langs.map(lang => <LangButton key={lang} lang={lang} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default translate()(LanguagesUserAccount);
