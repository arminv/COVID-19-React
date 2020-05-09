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
          backgroundColor: 'rgba(133, 206, 255, 0.2)',
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      tooltips: {
        displayColors: false,
      },
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
      <canvas style={{ height: '100%' }} ref={chartContainer} />
    </div>
  );
};
export default HistoryChart;
