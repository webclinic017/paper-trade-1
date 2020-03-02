import React from 'react';
import { get as _get } from 'lodash';

import { IStock } from '../models/stock';
import StockChart from './StockChart';
import StockPrice from './StockPrice';

interface Props {
    watchList: Array<number>,
    stocks: { [key: number]: IStock },
}

/** Renders a list of stock charts in a sidebar */
const SideBar = (props: Props) => {
    return (
        <div className='side-bar'>
            <ul className='list-group'>
                <h5 className="text-white pl-3 mt-3">Watchlist</h5>
                {props.watchList.map(symbolId => {
                    const symbol = _get(props.stocks, symbolId, { symbol: ''}).symbol;

                    return (
                        <li className='list-group-item d-flex p-0' key={symbol}>
                            <span className="w-25 pl-3 d-flex align-items-center">{symbol}</span>

                            <div className='side-bar-chart w-50'>
                                <StockChart symbolId={symbolId} disableMouseTracking={true} disableXAxis={true} disableVolume={true} height={100} />
                            </div>
                            
                            <div className="w-25 ml-1 d-flex align-items-center">
                                <StockPrice symbolId={symbolId} />
                            </div>
                        </li>
                    );
                })}
            </ul>
            {/* <button onClick={() => props.updateWatchList([1])}></button> */}
        </div>
    );
}

export default SideBar;