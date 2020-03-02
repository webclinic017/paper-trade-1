import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { AppState } from '../reducers/rootReducer';
import { IDailyStockData } from '../models/stock';

const mapStateToProps = (state: AppState) => {
    const { dailyData } = state.stockReducer;
    return { dailyData };
};

interface State {
    options: any
}

interface StateProps {
    dailyData: { [key: number]: IDailyStockData },
}

interface OwnProps {
    symbolId: number,
    allowSelectRange?: boolean,
    disableXAxis?: boolean,
    disableMouseTracking?: boolean,
    disableVolume?: boolean,
    height?: number,
    title?: string,
    loading?: boolean,
}

type Props = StateProps & OwnProps;

class Chart extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        const options = {
            chart:{
                backgroundColor: 'transparent',
                height: props.height,
            },
            credits: {
                'enabled': false
            },
            title: {
                text: props.title,
                align: 'left'
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
                }],
                visible: !this.props.disableXAxis
            },
            yAxis: [
                {
                  'visible': false,
                  labels: {
                    align: "right",
                    x: -3
                  },
                  title: {
                    text: "OHLC"
                  },
                  height: "60%",
                  lineWidth: 1,
                  resize: {
                    enabled: true
                  }
                },
                {
                  'visible': false,
                  labels: {
                    align: "right",
                    x: -3
                  },
                  title: {
                    text: "Volume"
                  },
                  top: "65%",
                  height: "35%",
                  offset: 0,
                  lineWidth: 2
                }
            ],
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
                enableMouseTracking: !this.props.disableMouseTracking,
                fillColor: {
                    stops: [
                        [0, '#1b1b1d'],
                        [1, '#1b1b1d']
                    ]
                },
                threshold: null
            },{
                type: "column",
                name: "Volume",
                data: [],
                yAxis: 1,
                visible: true
              }
            ]
          };

          this.state = { options: options }
    }

    componentDidUpdate() {
        console.log("wtf");
    }

    render() {
        const dailyData =  _.get(this.props.dailyData, this.props.symbolId, { normalizedData: [], volumeData: []});
        const chartData: Array<Array<number>> = dailyData.normalizedData;
        const volumeData: Array<Array<number>> = dailyData.volumeData;
        const series = this.state.options.series;

        series[0].data = chartData;
        series[0]['color'] = '#f45531';
        series[1].data = volumeData;
        const options = {...this.state.options, series: series};

        if (this.props.loading || !dailyData) {
            return (
                <div className="text-center mt-5">
                    <Loader
                        type="TailSpin"
                        color="#228B22"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                    />
                </div>
            );
        } else {
            const rangeSelector = this.props.allowSelectRange ? (
                <div className="row range-selector w-75 mx-3">
                    <button className="range-select-1d">1 Day</button>
                    <button className="range-select-1w">1 Week</button>
                    <button className="range-select-3m">3 Month</button>
                    <button className="range-select-1y">1 Year</button>
                    <button className="range-select-all">All</button>
                    <hr className=""/>
                </div>
            ) : null;

            return (
                <>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'stockChart'}
                        options={options}
                    />
                    {rangeSelector}
                </>
            );
        }
    }
};

export default connect(mapStateToProps)(Chart);
