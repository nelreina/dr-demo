import React from 'react';
import Resident from './headers/Resident';
import ResidentDetailed from './headers/ResidentDetailed';
const ReportHeader = ({ options, report }) => {
  const { header } = options;
  switch (report.header) {
    case 'Resident':
      return <Resident header={header} />;
    case 'ResidentDetailed':
      return <ResidentDetailed header={header} />;
    default:
      return <thead />;
  }
};

export default ReportHeader;
