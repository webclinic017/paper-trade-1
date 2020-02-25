import React from 'react';
import StockChart from './StockChart';
import StockPrice from './StockPrice';

/** Renders a list of stocks in a sidebar */
const SideBar = (props) => {
    if (props.symbols && props.symbols.length > 0) {
        return (
            <div className='side-bar'>
                <ul className='list-group'>
                    {props.symbols.map(s => 
                        <li className='list-group-item d-flex p-0' key={s}>
                            <span className="w-25 pl-3 d-flex align-items-center">{s}</span>
                            <div className='side-bar-chart w-50'>
                                <StockChart disableMouseTracking={true} disableXAxis={true} height={100} />
                            </div>
                            <div className="w-25 ml-1 d-flex align-items-center">
                                <StockPrice symbolId={2450} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    } else {
        return null;
    }
}

export default SideBar;