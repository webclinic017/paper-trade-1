import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { loadDailyDataAction } from '../actions/stockAction';

const utcToLocalTimestamp = (timestamp) => {
    const offset = new Date().getTimezoneOffset()
    const localTimestamp = timestamp - (offset * 60);

    // format that high chart uses
    return localTimestamp * 1000;
};

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
            [utcToLocalTimestamp(1580913000),420.258],
            [utcToLocalTimestamp(1580913060),420.222],
            [utcToLocalTimestamp(1580913120),420.3],
            [utcToLocalTimestamp(1580913180),420.58],
            [utcToLocalTimestamp(1580913240),421.07],
            [utcToLocalTimestamp(1580913300),421.4601]
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
  

const mapDispatchToProps = dispatch => ({
    loadDailyDataAction: () => dispatch(loadDailyDataAction())
})

class Chart extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log("mounted")
    }

    render() {
        return (
            <>
                <button onClick={() => this.props.loadDailyDataAction()}>Test redux action</button>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                />
            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(Chart);
