import React from 'react';
import { translate } from 'react-i18next';
import logo from '../assets/greenlight.png';
import SidebarNav from './SidebarNav';
import { times } from 'lodash';

const Sidebar = ({ t, periods }) => {
  const { activePeriod } = periods;
  return (
    <aside className="sidebar">
      <img src={logo} alt="Site Logo" />
      <div className="container" id="side-bar-period-name">
        {activePeriod.name}
      </div>
      <SidebarNav />
      {times(15, i => <div key={i} />)}
      <div className="container footer">
        <small>IBIS Management </small>
      </div>
    </aside>
  );
};

export default translate()(Sidebar);
