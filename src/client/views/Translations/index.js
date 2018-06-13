import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/reducers/translations';
class Translations extends Component {
  componentWillMount() {
    this.props.fetchTranslations();
  }
  render() {
    const { t, translations } = this.props;
    return (
      <div>
        <div className="report-header">
          <h3>Translations to ES</h3>
          <Link to={`/reports`} className="btn btn-light">
            {t('BACK')}
          </Link>
        </div>

        {t('Translations')}
        <code>
          <pre>{JSON.stringify(translations, null, 2)}</pre>
        </code>
      </div>
    );
  }
}

export default translate()(
  connect(
    state => ({
      translations: state.translations
    }),
    actions
  )(Translations)
);
