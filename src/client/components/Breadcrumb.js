import React from 'react';
import { translate } from 'react-i18next';
import List from 'nr-react-list';
import BreadcrumbItem from './BreadcrumbItem';
import navs from './navs_definitions'
{/* these const should be fetch from SideBarNav */}


const Breadcrumb = ({ t }) => {
  return (
    <div className="breadcrumbContainer">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <List of={BreadcrumbItem} iterator={navs} />
        </ol>
      </nav>
    </div>
  );
};

export default translate()(Breadcrumb);
