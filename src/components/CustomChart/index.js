import React from 'react';
import ReactApexChart from 'react-apexcharts';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

const CustomChart = ({ title, info }) => {

  const [values, axis] = [[], []];

  info.map(day => {
    axis.push(formatDate(day.date));
    values.push(day.total);
    return true;
  });

  const config = {
    series: [{
      name: 'Vendas',
      data: values
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return formatValue(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: axis,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false
        }
      },
      title: {
        text: title,
        align: 'center',
        style: {
          color: '#444',
          fontSize: '20px',
          fontFamily: 'sans-serif',
          fontWeight: 'normal'
        }
      }
    },
  };

  return (
    <ReactApexChart options={config.options} series={config.series} type="bar" style={{ width: '95%', height: '70%'}} />
  )
}

export default CustomChart;