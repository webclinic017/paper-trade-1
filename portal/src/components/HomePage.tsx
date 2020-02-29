import React, { Component } from 'react';

import { connect } from 'react-redux';

import StockChart from './StockChart';
import SideBar from './SideBar';
import { moneyFormatter } from '../utils'
import { getStockPortfoliosAction } from '../actions/stockPortfolioActions';
import { getCurrentUserAction } from '../actions/userActions'; 
import { User } from '../models/user';


const mapDispatchToProps = (dispatch: any) => ({
    loadStockPortfolios: (userId: Number) => dispatch(getStockPortfoliosAction(userId)),
    getCurrentUser: () => dispatch(getCurrentUserAction())
})

interface Props {
    loadStockPortfolios: (userId: Number) => Promise<any>
    getCurrentUser: () => Promise<User>
}

interface State {}

class HomePage extends Component<Props, State> { 
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.getCurrentUser())  
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
  
export default connect(null, mapDispatchToProps)(HomePage);