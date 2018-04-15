import React from 'react';
import { translate } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import { isEmpty } from 'lodash';

const ChartMatchUnMatch = ({ t, data }) => {
  let { match, unmatched } = data;
  if (isEmpty(data)) {
    match = 0;
    unmatched = 0;
  }
  const title = `Total of ${match + unmatched} rows loaded from source(s)`;
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [match, unmatched],
            backgroundColor: ['#2DA139', '#1D1B1B']
          }
        ],
        labels: ['Matched', 'Unmatched']
      }}
      options={{
        maintainAspectRatio: true,
        layout: {
          padding: 0
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

export default translate()(ChartMatchUnMatch);
