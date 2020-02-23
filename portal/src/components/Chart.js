import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts, { chart } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { loadDailyDataAction } from '../actions/stockAction';

const utcToLocalTimestamp = (timestamp) => {
    const offset = new Date().getTimezoneOffset()
    const localTimestamp = timestamp - (offset * 60);

    // format that high chart uses
    return localTimestamp * 1000;
};  

const mapStateToProps = (state) => {
    const { dailyData } = state.stockReducer;
    return { dailyData };
  };
const mapDispatchToProps = dispatch => ({
    loadDailyDataAction: (symbol, date) => dispatch(loadDailyDataAction(symbol, date))
})

class Chart extends Component {
    
    constructor(props) {
        super(props);
        const options = {
            chart:{
                backgroundColor: '#1b1b1d',
            },
            title: {
                text: 'AAPL stock price by minute'
            },
            navigator: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            xAxis: {
                // visible: false,
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
            yAxis: {
                visible: false,
            },
            rangeSelector: {
                enabled: false
            },
            series: [{
                name: 'AAPL',
                type: 'area',
                data: [],
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor: {
                    stops: [
                        [0, '#1b1b1d'],
                        [1, '#1b1b1d']
                    ]
                },
                threshold: null
            }]
          };

          this.state = { options: options }
    }

    componentDidMount() {
        this.props.loadDailyDataAction(2450, '2020-02-13')
            .then(data => {
                const priceData = data['price_data'];
                const chartData = []
                Object.keys(priceData).forEach(key => {
                    chartData.push([utcToLocalTimestamp(parseFloat(key)), parseFloat(priceData[key])]);
                });
                const series = this.state.options.series;
                series[0].data = chartData;
                series[0]['color'] = '#f45531';
                this.setState({options: {...this.state.options, series: series}});
            });
    }

    render() {
        return (
            <>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={this.state.options}
                />
            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(Chart);
