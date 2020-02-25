import React from 'react';

import StockChart from './StockChart';
import SideBar from './SideBar';

import { moneyFormatter } from '../utils'

const HomePage = (props) => (
    <div className='row mt-5'>
        <div className='offset-2 col-6'>
            <div class>
                <h1 className="text-white">
                    {moneyFormatter(26000)}
                </h1>
                <hr className="bg-secondary"/>
                <StockChart allowSelectRange={true} />
            </div>
        </div>
        <div className='col-4'>
            <SideBar symbols={['AMD', 'GOOGL']}/> 
        </div>
    </div>
);
  
export default HomePage;