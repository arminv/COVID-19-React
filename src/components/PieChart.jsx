import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const PieChart = ({ data }) => {
  const { country, cases, deaths } = data;

  const chartConfig = {
    type: 'pie',
    data: {
      labels: ['New Cases', 'Critical', 'Recovered', 'Total Deaths'],
      datasets: [
        {
          label: 'Bar Chart',
          data: [
            cases.new ? parseInt(cases.new.substr(1)) : null,
            cases.critical,
            cases.recovered,
            deaths.total,
            // tests.total,
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: country === 'All' ? 'Global' : `${country}`,
      },
      legend: { display: true, labels: { padding: 10 } },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            var label = data.labels[tooltipItem.index];
            if (value !== null && parseInt(value) >= 1000) {
              return (
                label +
                ' : ' +
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
            } else if (value !== null) {
              return label + ' : ' + value;
            }
          },
        },
      },
    },
  };

  const [pieChartInstance, setPieChartInstance] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    if (pieChartInstance) {
      pieChartInstance.destroy();
    }
    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    setPieChartInstance(newChartInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, data]);

  return (
    <div>
      <canvas ref={chartContainer} style={{ height: '100%' }} />
    </div>
  );
};
export default PieChart;
