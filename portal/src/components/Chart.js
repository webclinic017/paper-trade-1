import React from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
    title: {
        text: 'AAPL stock price by minute'
    },

    subtitle: {
        text: 'Using explicit breaks for nights and weekends'
    },

    xAxis: {
        breaks: [{ // Nights
            from: Date.UTC(2011, 9, 6, 16),
            to: Date.UTC(2011, 9, 7, 8),
            repeat: 24 * 36e5
        }, { // Weekends
            from: Date.UTC(2011, 9, 7, 16),
            to: Date.UTC(2011, 9, 10, 8),
            repeat: 7 * 24 * 36e5
        }]
    },

    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'day',
            count: 1,
            text: '1D'
        }, {
            type: 'month',
            count: 3,
            text: '3m'
        },
        {
            type: 'all',
            count: 1,
            text: 'All'
        }],
        selected: 1,
        inputEnabled: false
    },

    series: [{
        name: 'AAPL',
        type: 'area',
        data: [
            [1318607520000,420.258,420.35,420.17,420.21],
            [1318607580000,420.2,420.35,420.18,420.28],
            [1318607640000,420.3,420.6,420.29,420.5958],
            [1318607700000,420.58,421.14,420.575,421.0975],
            [1318607760000,421.07,421.49,420.7,421.46],
            [1318607820000,421.4601,421.71,421.36,421.69],
            [1318607880000,421.69,421.94,421.663,421.94],
            [1318607940000,421.94,422,421.8241,422]
            ],
        gapSize: 5,
        tooltip: {
            valueDecimals: 2
        },
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        threshold: null
    }]
  };
  
const Chart = () => (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
);

export default Chart;
