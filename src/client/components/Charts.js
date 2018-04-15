import React from 'react';
import { translate } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';
import 'chart.piecelabel.js';

const Charts = ({ t }) => {
  return (
    <div className="charts">
      <div>
        <Doughnut
          data={{
            datasets: [
              {
                data: [17544, 1780],
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
              text: 'Rows loaded this month'
            },
            pieceLabel: {
              render: 'value'
            }
          }}
        />
      </div>
      <p />
    </div>
  );
};

export default translate()(Charts);
