import React from 'react';

import StockChart from './StockChart';
import StockPrice from './StockPrice';

interface Props {
    watchList: Array<number>
}

/** Renders a list of stock charts in a sidebar */
const SideBar = (props: Props) => {
    return (
        <div className='side-bar'>
            <ul className='list-group'>
                <h5 className="text-white pl-3 mt-3">Watchlist</h5>
                {props.watchList.map(symbolId => 
                    <li className='list-group-item d-flex p-0' key={symbolId}>
                        <span className="w-25 pl-3 d-flex align-items-center">{symbolId}</span>

                        <div className='side-bar-chart w-50'>
                            <StockChart symbolId={symbolId} disableMouseTracking={true} disableXAxis={true} height={100} />
                        </div>
                        
                        <div className="w-25 ml-1 d-flex align-items-center">
                            <StockPrice symbolId={symbolId} />
                        </div>
                    </li>
                )}
            </ul>
            {/* <button onClick={() => props.updateWatchList([1])}></button> */}
        </div>
    );
}

export default SideBar;