import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const LineChart = (allData) => {
  const { data, continent } = allData;

  const continents = [
    'All',
    'Europe',
    'North-America',
    'Asia',
    'South-America',
    'Africa',
    // 'Australia',
    // 'Oceania',
    // 'Antarctica'
  ];

  const continentNames = [];
  const continentData = [];
  if (continent) {
    for (const item of data) {
      if (continents.includes(item.country) && item.country !== 'All') {
        continentNames.push(item.country);
        continentData.push(item.cases.total);
      }
    }
  }

  const MIN_TOTAL_CASES = 50000;
  const countriesNames = [];
  const countriesData = [];
  for (const item of data) {
    if (
      item.cases.total >= MIN_TOTAL_CASES &&
      !continents.includes(item.country)
    ) {
      countriesNames.push(item.country);
      countriesData.push(item.cases.total);
    }
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels: continent ? continentNames : countriesNames,
      datasets: [
        {
          label: 'Total Cases',
          data: continent ? continentData : countriesData,
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
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
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      maintainAspectRatio: true,
      title: {
        display: true,
        text: continent
          ? 'Continents :'
          : `Countries with more than ${MIN_TOTAL_CASES} cases :`,
      },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            // type: 'logarithmic',
            ticks: {
              //   beginAtZero: false,
              min: continent ? 0 : MIN_TOTAL_CASES - 20000,
            },
          },
        ],
      },
    },
  };

  const [lineChartInstance, setLineChartInstance] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    if (lineChartInstance) {
      lineChartInstance.destroy();
    }
    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    setLineChartInstance(newChartInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};
export default LineChart;
