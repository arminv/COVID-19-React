import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

// Global chart configs:
const CHART_GLOBAL = Chartjs.defaults.global;
CHART_GLOBAL.animation.easing = 'easeInCubic';
CHART_GLOBAL.defaultFontFamily = 'Arial';

CHART_GLOBAL.title.fontSize = 20;
CHART_GLOBAL.title.padding = 30;

CHART_GLOBAL.elements.point.radius = 5;
CHART_GLOBAL.elements.point.pointStyle = 'star';
CHART_GLOBAL.elements.line.tension = 0;
// CHART_GLOBAL.elements.line.fill = false;
// CHART_GLOBAL.elements.line.stepped = true;

CHART_GLOBAL.tooltips.titleAlign = 'center';
CHART_GLOBAL.tooltips.xPadding = 12;
CHART_GLOBAL.tooltips.yPadding = 12;
CHART_GLOBAL.tooltips.caretPadding = 12;
CHART_GLOBAL.tooltips.caretSize = 9;
CHART_GLOBAL.tooltips.borderColor = '#dec79b';
CHART_GLOBAL.tooltips.borderWidth = 3;

const HistoryChart = (allHistoryData) => {
  const { data } = allHistoryData;

  // There are multiple data points for each day, get the latest one for each day:
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
    // Every time the country selected changes (and hence data passed), we have to update the canvas with a new instance:
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
