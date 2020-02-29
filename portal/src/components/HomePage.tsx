import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { User } from '../models/user';
import { Stock } from '../models/stock';
import { StockPortfolio, DefaultStockPortfolio } from '../models/stockPortfolio';
import { AppState } from '../reducers/rootReducer';
import { loadStockPortfoliosAction } from '../actions/stockPortfolioActions';
import { loadStocksAction } from '../actions/stockActions';
import { loadDailyDataAction } from '../actions/stockActions';
import { getCurrentUserAction } from '../actions/userActions'; 
import { moneyFormatter } from '../utils'
import StockChart from './StockChart';
import SideBar from './SideBar';



const mapStateToProps = (state: AppState) => {
    const { stockPortfolios, viewing } = state.stockPortfolioReducer;
    if (stockPortfolios.length > 0) {
        return { stockPortfolio: stockPortfolios[viewing] };
    } else {
        return { stockPortfolio: {} }
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    loadStockPortfolios: (userId: number) => dispatch(loadStockPortfoliosAction(userId)),
    loadStocks: (symbolIds: Array<number>) => dispatch(loadStocksAction(symbolIds)),
    loadDailyDataAction: (symbolIds: Array<number>, date: string) => dispatch(loadDailyDataAction(symbolIds, date)),
    getCurrentUser: () => dispatch(getCurrentUserAction())
})

interface Props {
    loadStockPortfolios: (userId: number) => Promise<Array<StockPortfolio>>,
    loadStocks: (symbolIds: Array<number>) => Promise<Array<Stock>>,
    getCurrentUser: () => Promise<User>
}

interface State {
    stockPortfolio: StockPortfolio,
    loading: boolean
}

class HomePage extends Component<Props, State> { 
    constructor(props: Props) {
        super(props);

        this.state = { 
            stockPortfolio: DefaultStockPortfolio,
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.getCurrentUser().then(
            user => {
                const userId = user.id;
                this.props.loadStockPortfolios(userId).then(portfolios => {
                    const watchList = new Set<number>();
                    portfolios.forEach(p => {
                        p.stockposition_set.forEach(sp => {
                            watchList.add(sp.stock);
                        });
                    });

                    this.props.loadStocks(Array.from(watchList)).then(res => {
                        this.setState({ loading: false});
                    });
                });
            }
        );
    }
    
    render() {

        if (this.state.loading) {
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
                        <StockChart allowSelectRange={true} />
                    </div>
                    <div className='col-4'>
                        <SideBar /> 
                    </div>
                </div>
            );
        }
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);