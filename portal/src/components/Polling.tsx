import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers/rootReducer';

const mapStateToProps = (state: AppState) => {
    const { stockPortfolios } = state.stockPortfolioReducer;
    const watchList: Array<number> = []

    stockPortfolios.forEach(sp => {
        watchList.concat(sp.properties.watchList);
    })
    
    return { watchList };
}

interface Props {};
interface State { timerID?: any };

/** Top level component for polling */
class Polling extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { timerID: null }
    }

    componentDidMount() {
        const timerID = setInterval(() => {
            //console.log(this.props.watchList, 'watch list');
        }, 1000); 
        
        this.setState({ timerID });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    render() { 
        return null; }
}

export default connect(mapStateToProps, {})(Polling); 