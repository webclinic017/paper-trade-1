import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { IStock, IDailyStockData } from '../models/stock';
import { IStockPortfolio, DefaultStockPortfolio } from '../models/stockPortfolio';
import { AppState } from '../reducers/rootReducer';
import { moneyFormatter } from '../utils'
import StockChart from './StockChart';
import SideBar from './SideBar';


const mapStateToProps = (state: AppState) => {
    const { dailyData, stocks, initialDataLoaded } = state.stockReducer;
    const { stockPortfolios, watchList, viewing } = state.stockPortfolioReducer;
    if (stockPortfolios.length > 0) {
        return { stockPortfolio: stockPortfolios[viewing], watchList, dailyData, stocks, initialDataLoaded };
    } else {
        return { stockPortfolio: DefaultStockPortfolio, watchList, dailyData, stocks, initialDataLoaded };
    }
};

interface StateProps {
    stockPortfolio: IStockPortfolio,
    watchList: Array<number>,
    dailyData: {
        [key: number]: IDailyStockData
    },
    stocks: {
        [key: number]: IStock
    },
    initialDataLoaded: boolean
}

type Props = StateProps;

class HomePage extends Component<Props> { 
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ loading: false });
    }
    
    render() {

        if (!this.props.initialDataLoaded) {
            return (
                <div className="homepage-loader">
                    <Loader
                        type="TailSpin"
                        color="#228B22"
                        height={100}
                        width={100}
                    />
                </div>
            );
        } else {
            return (
                <div className='row mt-5'>
                    <div className='offset-2 col-6'>
                        <h1 className="text-white"> 
                            {moneyFormatter(26000)}
                        </h1>
                        <hr className="bg-secondary"/>
                        <StockChart symbolId={2126} allowSelectRange={true} />
                    </div>
                    <div className='col-4'>
                        <SideBar watchList={this.props.watchList} stocks={this.props.stocks} /> 
                    </div>
                </div>
            );
        }
    }
}
  
export default connect(mapStateToProps, null)(HomePage);    