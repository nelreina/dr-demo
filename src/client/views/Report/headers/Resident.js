import React from 'react';

const Resident = ({ header }) => {
  return (
    <thead>
      <tr>
        <th>Account</th>
        <th>Description</th>
        <th style={header}>RESIDENT</th>
        <th style={header}>NON REISDENT</th>
      </tr>
    </thead>
  );
};

export default Resident;
