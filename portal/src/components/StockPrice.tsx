import React from 'react';
import { connect } from 'react-redux';
import { get as _get }from 'lodash';

import { AppState } from '../reducers/rootReducer';
import { IDailyStockData } from '../models/stock';
import { moneyFormatter } from '../utils';

const mapStateToProps = (state: AppState) => {
    const { dailyData } = state.stockReducer;
    return { dailyData };
}

interface StateProps {
    dailyData: {
        [key: number]: IDailyStockData
    }
}

interface OwnProps {
    symbolId: number
}

type Props = StateProps & OwnProps;

const StockPrice = (props: Props) => {
    let currentPrice;
    const dailyData = _get(props.dailyData, props.symbolId, null);
    let priceHigherThanOpen = false;
    
    if (dailyData && dailyData.normalizedData.length > 0) {
        currentPrice = dailyData.normalizedData[dailyData.normalizedData.length - 1][3];
        priceHigherThanOpen = currentPrice > dailyData.normalizedData[0][3];
    }
    return currentPrice ?  <div className={`btn ${priceHigherThanOpen ? 'btn-success' : 'btn-danger'}`}>{moneyFormatter(currentPrice)}</div> : null;
}

export default connect(mapStateToProps, {})(StockPrice);