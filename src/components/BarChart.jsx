import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const BarChart = ({ data }) => {
  const { country, cases, deaths, tests } = data;

  const chartConfig = {
    type: 'bar',
    data: {
      labels:
        country === 'All'
          ? ['Total Cases', 'Total Deaths']
          : ['Total Cases', 'Total Deaths', 'Total Tests'],
      datasets: [
        {
          // label: 'Bar Chart',
          data:
            country === 'All'
              ? [cases.total, deaths.total]
              : [cases.total, deaths.total, tests.total],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      // maintainAspectRatio: true,
      title: {
        display: true,
        text: country === 'All' ? 'Global' : `${country}`,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if (parseInt(value) >= 1000) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
              return value;
            }
          },
        },
      },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
            // type: 'logarithmic',
            ticks: {
              //   beginAtZero: false,
              min: 0,
              userCallback: function (value, index, values) {
                return value.toLocaleString();
              },
            },
          },
        ],
      },
    },
  };

  const [barChartInstance, setBarChartInstance] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    if (barChartInstance) {
      barChartInstance.destroy();
    }
    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    setBarChartInstance(newChartInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, data]);

  return (
    <div>
      <canvas ref={chartContainer} style={{ height: '100%' }} />
    </div>
  );
};
export default BarChart;
