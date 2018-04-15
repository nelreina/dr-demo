import React from 'react';
import { translate } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';

const Charts = ({ t }) => {
  return (
    <div className="charts">
      <div>
        <Doughnut
          data={{
            datasets: [
              {
                data: [17544, 1780],
                backgroundColor: ['green', 'darkred']
              }
            ],
            labels: ['Matched', 'Unmatched']
          }}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      <p />
    </div>
  );
};

export default translate()(Charts);
