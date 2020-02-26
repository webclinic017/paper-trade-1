import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { moneyFormatter } from '../utils';

const mapStateToProps = (state) => {
    const { currentPrices } = state.stockReducer;
    return { currentPrices };
}

const StockPrice = (props) => {
    const currentPrice = _.get(props.currentPrices, props.symbolId, null);
    return currentPrice ?  <div className="btn btn-danger">{moneyFormatter(currentPrice)}</div> : null;
}

export default connect(mapStateToProps, {})(StockPrice);