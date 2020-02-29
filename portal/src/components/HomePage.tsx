import React, { Component } from 'react';
import { connect } from 'react-redux';

import { User } from '../models/user';
import { StockPortfolio } from '../models/stockPortfolio';
import { AppState } from '../reducers/rootReducer';
import { getStockPortfoliosAction } from '../actions/stockPortfolioActions';
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
    loadStockPortfolios: (userId: number) => dispatch(getStockPortfoliosAction(userId)),
    getCurrentUser: () => dispatch(getCurrentUserAction())
})

interface Props {
    loadStockPortfolios: (userId: number) => Promise<Array<StockPortfolio>>
    getCurrentUser: () => Promise<User>
}

interface State {
    stockPortfolio: StockPortfolio
}

class HomePage extends Component<Props, State> { 
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getCurrentUser().then(
            user => {
                const userId = user.id;
                this.props.loadStockPortfolios(userId).then(portfolios => {
                    console.log("helo")
                });
            }
        )
    }
    
    render() {
        return (
            <div className='row mt-5'>
                <div className='offset-2 col-6'>
                    <div>
                        <h1 className="text-white"> 
                            {moneyFormatter(26000)}
                        </h1>
                        <hr className="bg-secondary"/>
                        <StockChart allowSelectRange={true} />
                    </div>
                </div>
                <div className='col-4'>
                    <SideBar /> 
                </div>
            </div>
        );
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);