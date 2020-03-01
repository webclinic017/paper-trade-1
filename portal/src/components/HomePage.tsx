import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { IUser } from '../models/user';
import { IStock, IDailyStockData } from '../models/stock';
import { IStockPortfolio, DefaultStockPortfolio } from '../models/stockPortfolio';
import { AppState } from '../reducers/rootReducer';
import { loadStockPortfoliosAction } from '../actions/stockPortfolioActions';
import { loadStocksAction } from '../actions/stockActions';
import { loadDailyDataAction } from '../actions/stockActions';
import { loadCurrentUserAction } from '../actions/userActions'; 
import { moneyFormatter } from '../utils'
import StockChart from './StockChart';
import SideBar from './SideBar';


const mapStateToProps = (state: AppState) => {
    const { dailyData } = state.stockReducer;
    const { stockPortfolios, watchList, viewing } = state.stockPortfolioReducer;
    if (stockPortfolios.length > 0) {
        return { stockPortfolio: stockPortfolios[viewing], watchList, dailyData };
    } else {
        return { stockPortfolio: DefaultStockPortfolio, watchList, dailyData };
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    loadStockPortfolios: (userId: number) => dispatch(loadStockPortfoliosAction(userId)),
    loadStocks: (symbolIds: Array<number>) => dispatch(loadStocksAction(symbolIds)),
    loadDailyData: (symbolIds: Array<number>, date: string) => dispatch(loadDailyDataAction(symbolIds, date)),
    loadCurrentUser: () => dispatch(loadCurrentUserAction())
});

interface StateProps {
    stockPortfolio: IStockPortfolio,
    watchList: Array<number>,
    dailyData: {
        [key: number]: IDailyStockData
    }
}

interface DispatchProps {
    loadStockPortfolios: (userId: number) => Promise<Array<IStockPortfolio>>,
    loadStocks: (symbolIds: Array<number>) => Promise<Array<IStock>>,
    loadCurrentUser: () => Promise<IUser>,
    loadDailyData: (symbolIds: Array<number>, date: string) => Promise<Array<IDailyStockData>>
}

type Props = StateProps & DispatchProps;

interface State {
    loading: boolean
}

class HomePage extends Component<Props, State> { 
    constructor(props: Props) {
        super(props);

        this.state = { 
            loading: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        
        this.props.loadCurrentUser().then(
            user => {
                const userId = user.id;
                this.props.loadStockPortfolios(userId).then(portfolios => {
                    const watchedSymbols = new Set<number>();
                    portfolios.forEach(p => {
                        p.stockposition_set.forEach(sp => watchedSymbols.add(sp.stock));
                        p.properties.watch_list.forEach(s => watchedSymbols.add(s));
                    });                    

                    const watchList = Array.from(watchedSymbols);
                    
                    if (watchList.length > 0) {
                        this.props.loadStocks(watchList);

                        this.props.loadDailyData(watchList, '2020-02-28').then(res => {
                            this.setState({ loading: false });
                        });
                    } else {
                        this.setState({ loading: false });
                    }
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
                        <StockChart symbolId={2126} allowSelectRange={true} />
                    </div>
                    <div className='col-4'>
                        <SideBar watchList={this.props.watchList}/> 
                    </div>
                </div>
            );
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);