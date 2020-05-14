import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
Chartjs.defaults.global.animation.easing = 'easeInCubic';
Chartjs.defaults.global.defaultFontFamily = 'Arial';
Chartjs.defaults.global.title.fontSize = 20;
Chartjs.defaults.global.title.padding = 30;
Chartjs.defaults.global.elements.point.radius = 5;
Chartjs.defaults.global.elements.point.pointStyle = 'star';
Chartjs.defaults.global.elements.line.tension = 0;
Chartjs.defaults.global.tooltips.titleAlign = 'center';
Chartjs.defaults.global.tooltips.xPadding = 12;
Chartjs.defaults.global.tooltips.yPadding = 12;
Chartjs.defaults.global.tooltips.caretPadding = 12;
Chartjs.defaults.global.tooltips.caretSize = 9;
Chartjs.defaults.global.tooltips.borderColor = '#dec79b';
Chartjs.defaults.global.tooltips.borderWidth = 3;
// Chartjs.defaults.global.elements.line.fill = false;
// Chartjs.defaults.global.elements.line.stepped = true;

const HistoryChart = (allHistoryData) => {
  const { data } = allHistoryData;

  const uniqueDates = [];
  const uniqueTotalCases = [];
  const uniqueTotalDeaths = [];
  for (var i = 0; i < data.length; i++) {
    if (!uniqueDates.includes(data[i]['day'])) {
      uniqueDates.unshift(data[i]['day']);
      uniqueTotalCases.unshift(data[i]['cases']['total']);
      uniqueTotalDeaths.unshift(data[i]['deaths']['total']);
      continue;
    }
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels: uniqueDates,
      datasets: [
        {
          label: 'Total Cases',
          data: uniqueTotalCases,
          borderColor: 'rgba(52, 55, 235, 0.5)',
          backgroundColor: 'rgba(133, 206, 255, 0.2)',
          borderWidth: 1.5,
        },
        {
          label: 'Total Deaths',
          data: uniqueTotalDeaths,
          borderColor: 'rgba(255,0,0, 0.5)',
          backgroundColor: 'rgba(242, 168, 63, 0.3)',
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data) {
            console.log();
            var datasetIndex = tooltipItem.datasetIndex;
            var itemIndex = tooltipItem.index;
            var value = data.datasets[datasetIndex].data[itemIndex];
            if (parseInt(value) >= 1000) {
              return (
                (datasetIndex === 0 ? 'Total Cases : ' : 'Total Deaths : ') +
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
            } else {
              return (
                (datasetIndex === 0 ? 'Total Cases : ' : 'Total Deaths : ') +
                value
              );
            }
          },
        },
      },
      title: {
        display: true,
        text: 'Historical Data',
      },
      legend: { display: true, labels: { padding: 10 } },
      scales: {
        yAxes: [
          {
            // type: 'logarithmic',
            ticks: {
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

  const [historyChartInstance, setHistoryChartInstance] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    if (historyChartInstance) {
      historyChartInstance.destroy();
    }
    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    setHistoryChartInstance(newChartInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, data]);

  return (
    <div>
      <canvas style={{ height: '100%' }} ref={chartContainer} />
    </div>
  );
};
export default HistoryChart;
