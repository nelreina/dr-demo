import React from 'react';
import { translate } from 'react-i18next';
import logo from '../assets/greenlight.png';
import SidebarNav from './SidebarNav';
import { times } from 'lodash';

const Sidebar = ({ t, periods }) => {
  const { activePeriod } = periods;
  return (
    <aside className="sidebar">
      <div className="logoContainer"><img src={logo} alt="GreenLight" /></div>
      <div className="container" id="side-bar-period-name">
        <span>Current report</span>

        <div className="periodDropdown">
          <div className="dropdown">
            <button className="dropbtn">
              <h2>{activePeriod.name}</h2>
              <i className="fa fa-sort-desc"></i>
            </button>
            <div className="dropdown-content">
              <div className="card">
                <div className="card-header">
                  <h3>Choose your period</h3>
                </div>
                <div className="card-body">
                  <ul>
                    <li><a href="#">January 2018</a></li>
                    <li><a href="#">February 2018</a></li>
                    <li><a href="#">March 2018</a></li>
                    <li><a href="#">April 2018</a></li>
                    <li><a href="#">May 2018</a></li>
                    <li><a href="#">June 2018</a></li>
                    <li><a href="#">July 2018</a></li>
                    <li><a href="#">August 2018</a></li>
                    <li><a href="#">September 2018</a></li>
                    <li><a href="#">October 2018</a></li>
                    <li><a href="#">November 2018</a></li>
                    <li><a href="#">December 2018</a></li>
                  </ul>
                  <hr />
                  <a href="#" className="advancedOptions">Choose custom period</a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <SidebarNav />
      {times(15, i => <div key={i} />)}
      <div className="container footer">
        <small>IBIS Management © 2018</small>
      </div>
    </aside>
  );
};

export default translate()(Sidebar);
