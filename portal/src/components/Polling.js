import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const { watchList } = state.userReducer;
    return { watchList };
}

/** Top level component for pollin */
class Polling extends Component {
    constructor(props) {
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