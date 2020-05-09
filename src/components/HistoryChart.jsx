import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
Chartjs.defaults.global.defaultFontColor = 'whitesmoke';
Chartjs.defaults.global.defaultFontFamily = 'Arial';
Chartjs.defaults.global.title.fontSize = 16;
Chartjs.defaults.global.title.padding = 26;
Chartjs.defaults.global.elements.point.radius = 5;
Chartjs.defaults.global.elements.point.pointStyle = 'star';
// Chartjs.defaults.global.elements.line.fill = false;
// Chartjs.defaults.global.elements.line.stepped = true;

const HistoryChart = (allHistoryData) => {
  const { data } = allHistoryData;

  const uniqueDates = [];
  const uniqueData = [];
  for (var i = 0; i < data.length; i++) {
    if (!uniqueDates.includes(data[i]['day'])) {
      uniqueDates.unshift(data[i]['day']);
      uniqueData.unshift(data[i]['cases']['total']);
      continue;
    }
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels: uniqueDates,
      datasets: [
        {
          label: 'Total Cases ',
          data: uniqueData,
          borderColor: 'rgba(255,0,0, 0.5)',
          backgroundColor: 'rgba(25,25,25, 0.3)',
          borderWidth: 2,
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
        text: 'Historical Data',
      },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            // type: 'logarithmic',
            ticks: {
              //   beginAtZero: false,
              min: 0,
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
      <canvas ref={chartContainer} />
    </div>
  );
};
export default HistoryChart;
