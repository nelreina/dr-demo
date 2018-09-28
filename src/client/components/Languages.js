import React from 'react';
import { translate } from 'react-i18next';

const langColor = {
  en: 'primary',
  es: 'dark'
};
const Button = ({ lang, i18n }) => (
  <a
    onClick={() => {
      i18n.changeLanguage(lang);
    }}
    className={`${langColor[lang]}`}
  >
    {lang.toUpperCase()}
  </a>
);
const LangButton = translate()(Button);

const Languages = ({ langs }) => {
  return (
    <div className="languageDropdown">
      <div className="dropdown">
        <button className="dropbtn">Language <i className="fa fa-sort-desc"></i></button>
        <div className="dropdown-content">
          {langs.map(lang => <LangButton key={lang} lang={lang} />)}
        </div>
      </div>
    </div>
  );
};

export default Languages;
