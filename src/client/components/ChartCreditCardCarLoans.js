import React from 'react';
import { translate } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import { isEmpty } from 'lodash';

const CrClChart = ({ t, data }) => {
  let { cc, cl } = data;
  if (isEmpty(data)) {
    cc = 0;
    cl = 0;
  }
  const title = `Credit Cards & Car Loans`;
  return (
    <Pie
      data={{
        datasets: [
          {
            data: [cc, cl],
            backgroundColor: ['#2DA139', '#1D1B1B']
          }
        ],
        labels: ['Credit Cards', 'Car Loans']
      }}
      options={{
        maintainAspectRatio: true,
        layout: {
          padding: 0
        },
        legend: {
          display: true
        },
        title: {
          display: true,
          position: 'bottom',
          text: title
        },
        pieceLabel: {
          render: 'value'
        }
      }}
    />
  );
};

export default translate()(CrClChart);
