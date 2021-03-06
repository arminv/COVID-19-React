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
  // Sort the continents in descending order:
  const combinedContinents = [];
  for (var i = 0; i < continentNames.length; i++) {
    combinedContinents.push({
      continent: continentNames[i],
      data: continentData[i],
    });
  }
  combinedContinents.sort(function (a, b) {
    return a.data < b.data ? 1 : a.data === b.data ? 0 : -1;
  });
  for (var j = 0; j < combinedContinents.length; j++) {
    continentNames[j] = combinedContinents[j].continent;
    continentData[j] = combinedContinents[j].data;
  }

  // Get countries that have a minimum number of total cases:
  const MIN_TOTAL_CASES = 300000;
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
  // Sort the countries (with a minimum number of cases) in descending order:
  const combinedList = [];
  for (var k = 0; k < countriesNames.length; k++) {
    combinedList.push({ country: countriesNames[k], data: countriesData[k] });
  }
  combinedList.sort(function (a, b) {
    return a.data < b.data ? 1 : a.data === b.data ? 0 : -1;
  });
  for (var l = 0; l < combinedList.length; l++) {
    countriesNames[l] = combinedList[l].country;
    countriesData[l] = combinedList[l].data;
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels: continent ? continentNames : countriesNames,
      datasets: [
        {
          label: 'Total Cases',
          data: continent ? continentData : countriesData,
          backgroundColor: 'rgba(250, 255, 156,0.2)',
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
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if (parseInt(value) >= 1000) {
              return (
                'Total Cases : ' +
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
            } else {
              return 'Total Cases : ' + value;
            }
          },
        },
      },
      title: {
        display: true,
        text: continent
          ? 'Continents :'
          : `Countries with more than ${MIN_TOTAL_CASES.toLocaleString()} cases :`,
      },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            // type: 'logarithmic',
            ticks: {
              // min: continent ? 0 : MIN_TOTAL_CASES - 20000,
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
      <canvas ref={chartContainer} style={{ height: '100%' }} />
    </div>
  );
};
export default LineChart;
