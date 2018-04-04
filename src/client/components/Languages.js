import React from 'react';
import { translate } from 'react-i18next';

const langColor = {
  en: 'primary',
  es: 'dark'
};
const Button = ({ lang, i18n }) => (
  <button
    onClick={() => {
      i18n.changeLanguage(lang);
    }}
    className={`btn btn-${langColor[lang]}`}
  >
    {lang.toUpperCase()}
  </button>
);
const LangButton = translate()(Button);

const Languages = ({ langs }) => {
  return (
    <div className="btn-group">
      {langs.map(lang => <LangButton key={lang} lang={lang} />)}
    </div>
  );
};

export default Languages;
