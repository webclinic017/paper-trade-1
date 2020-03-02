import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { get as _get } from 'lodash';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Button } from 'react-bootstrap';
import { AppState } from '../reducers/rootReducer';
import { IStockPortfolio } from '../models/stockPortfolio';
import { IDailyStockData, IStock } from '../models/stock';
import { updateWatchListAction } from '../actions/stockPortfolioActions';
import { loadDailyDataAction, loadStocksAction } from '../actions/stockActions';

import StockChart from './StockChart';
import { moneyFormatter, getLastTradingDay } from '../utils';

const mapStateToProps = (state: AppState) => {
    const { dailyData, stocks, initialDataLoaded } = state.stockReducer;
    const { stockPortfolios, viewing } = state.stockPortfolioReducer;
    return { stockPortfolio: stockPortfolios[viewing], dailyData, stocks, initialDataLoaded };
};

const mapDispatchToProps = (dispatch: any) => ({
    updateWatchList: (updatedList: Array<number>, portfolioId: number) => dispatch(updateWatchListAction(updatedList, portfolioId)),
    loadStocks: (symbolIds: Array<number>) => dispatch(loadStocksAction(symbolIds)),
    loadDailyData: (symbolIds: Array<number>, date: string) => dispatch(loadDailyDataAction(symbolIds, date)),
});

interface State {
    loading: boolean
}

interface StateProps {
    stockPortfolio: IStockPortfolio,
    dailyData: {
        [key: number]: IDailyStockData
    },
    stocks: {
        [key: number]: IStock
    },
    initialDataLoaded: boolean
}

interface DispatchProps {
    updateWatchList: (updatedList: Array<number>, portfolioId: number) => Promise<IStockPortfolio>,
    loadStocks: (symbolIds: Array<number>) => Promise<Array<IStock>>,
    loadDailyData: (symbolIds: Array<number>, date: string) => Promise<Array<IDailyStockData>>,
}


type OwnProps = {
    match: { params: { id: number }}
}

type Props = StateProps & DispatchProps & OwnProps;

class StockPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { loading: false }
    }

    componentDidMount() {
        this.setState({ loading: true });
        const date = getLastTradingDay();
        const symbolId = this.props.match.params.id;

        this.props.loadStocks([symbolId]);
        this.props.loadDailyData([symbolId], date).then(res => {
            this.setState({ loading: false });
        });
    }

    render() {
        console.log('rerender')
        if (!this.props.initialDataLoaded || this.state.loading) {
            return (
                <div className='homepage-loader'>
                    <Loader
                        type='TailSpin'
                        color='#228B22'
                        height={100}
                        width={100}
                    />
                </div>
            );
        } else {

            const watchList = this.props.stockPortfolio.properties.watch_list;
            const portfolioId = this.props.stockPortfolio.id;
            const symbolId = this.props.match.params.id;
            const currentlyWatching = watchList.includes(symbolId);
            const symbol = _get(this.props.stocks, symbolId, { symbol: ''}).symbol;

            return (
                <div className='row mt-5'>
                    <div className='offset-2 col-6'>
                        <h2 className="w-25 pl-3 d-flex align-items-center text-white">{symbol}</h2>
                        <hr className='bg-secondary'/>
                        <StockChart symbolId={2126} allowSelectRange={true} />
                    </div>
                    <div className='col-4'>
                        <Button className={!currentlyWatching ? 'btn-success': 'btn-danger'} onClick={() => {
                            if (currentlyWatching) {
                                this.props.updateWatchList(watchList.filter(s => s !== symbolId), portfolioId);
                            } else {
                                this.props.updateWatchList([symbolId, ...watchList], portfolioId);
                            }
                        }}>
                            {!currentlyWatching ? 'Add to Watchlist' : 'Remove from Watchlist'}
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);