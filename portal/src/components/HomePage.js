import React from 'react';

import StockChart from './StockChart';
import SideBar from './SideBar';

const HomePage = (props) => (
    <div className='row mt-5'>
        <div className='offset-2 col-6'>
            <StockChart title='what'/>
        </div>
        <div className='col-4'>
            <SideBar symbols={['amd', 'google']}/> 
        </div>
    </div>
);
  
export default HomePage;