import React from 'react';
import ReactApexChart from 'react-apexcharts';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

const CustomChart = ({ mainInfo, altInfo }) => {

  const axis = mainInfo.map(day => formatDate(day.date));
  const sales = mainInfo.map(day => day.total);
  const profit = altInfo.map(day => day.total);

  const config = {
    series: [{
      name: 'Total Vendido',
      data: sales,
    }, {
      name: 'Lucro',
      data: profit,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        position: 'center',
        enabled: true,
        formatter(val) {
          return formatValue(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          fontFamily: 'Noto Sans TC',
          colors: ['#304758'],
        },
        background: {
          enabled: true,
          padding: 5,
          borderRadius: 2,
          borderWidth: 0,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
      xaxis: {
        categories: axis,
        position: 'top',
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    }
  };

  return (
    <ReactApexChart
      options={config.options}
      series={config.series}
      type="bar"
      height="290px"
      style={{ width: '95%' }}
    />
  );
};

export default CustomChart;
