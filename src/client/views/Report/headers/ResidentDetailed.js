import React from 'react';

const ResidentDetailed = ({ header }) => {
  return (
    <thead>
      <tr>
        <th colSpan="2" />
        <th style={header} colSpan="2">
          RESIDENT
        </th>
        <th style={header} colSpan="2">
          NON REISDENT
        </th>
      </tr>
      <tr>
        <th>Account</th>
        <th>Description</th>
        <th style={header}>AFL</th>
        <th style={header}>FC</th>
        <th style={header}>AFL</th>
        <th style={header}>FC</th>
      </tr>
    </thead>
  );
};

export default ResidentDetailed;
