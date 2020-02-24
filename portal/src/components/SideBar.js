import React from 'react';
import StockChart from './StockChart';

/** Renders a list of stocks in a sidebar */
const SideBar = (props) => {
    if (props.symbols && props.symbols.length > 0) {
        return (
            <div className='side-bar'>
                <ul className='list-group'>
                    {props.symbols.map(s => 
                        <li className='list-group-item d-flex p-0' key={s}>
                            <span className="w-25 ml-3 d-flex align-items-center">{s}</span>
                            <div className='side-bar-chart border-0 w-75'>
                                <StockChart title={s} disableMouseTracking={true} height={100} />
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