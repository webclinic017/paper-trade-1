import React from 'react';
import { connect } from 'react-redux';

import StockChart from './StockChart';
import StockPrice from './StockPrice';
import { updateWatchListAction } from '../actions/stockPortfolioActions';


const mapStateToProps = (state: any) => {
    const { watchList } = state.stockPortfolioReducer;
    return { watchList };
};

const mapDispatchToProps = (dispatch: any) => ({
    updateWatchList: (updatedList: Array<string>) => dispatch(updateWatchListAction(updatedList))
});

/** Renders a list of stocks in a sidebar */
const SideBar = (props: any) => {
    return (
        <div className='side-bar'>
            <ul className='list-group'>
                <h5 className="text-white pl-3 mt-3">Watchlist</h5>
                {props.watchList.map((s: string) => 
                    <li className='list-group-item d-flex p-0' key={s}>
                        <span className="w-25 pl-3 d-flex align-items-center">{s}</span>

                        <div className='side-bar-chart w-50'>
                            <StockChart disableMouseTracking={true} disableXAxis={true} height={100} />
                        </div>
                        
                        <div className="w-25 ml-1 d-flex align-items-center">
                            <StockPrice symbolId={2944} />
                        </div>
                    </li>
                )}
            </ul>
            <button onClick={() => props.updateWatchList(['amd'])}></button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);