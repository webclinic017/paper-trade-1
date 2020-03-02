import { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../reducers/rootReducer';
import { IDailyStockData } from '../models/stock';
import { loadDailyDataAction } from '../actions/stockActions';

const mapStateToProps = (state: AppState) => {
    const { watchList } = state.stockPortfolioReducer;
    const { username } = state.userReducer;
    return { watchList, username };
};

const mapDispatchToProps = (dispatch: any) => ({
    loadDailyData: (symbolIds: Array<number>, date: string) => dispatch(loadDailyDataAction(symbolIds, date)),
});

interface StateProps {
    watchList: Array<number>, 
    username: string
}

interface DispatchProps {
    loadDailyData: (symbolIds: Array<number>, date: string) => Promise<Array<IDailyStockData>>
}

type Props = StateProps & DispatchProps;

interface State { 
    timerID?: any,
    socket: WebSocket | null 
}

/** Top level component for polling */
class Polling extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { timerID: null, socket: null }
    }

    componentDidUpdate() {
        if (!this.state.socket) {
            const timerID = setInterval(() => {
                // console.log(this.props.watchList, 'watch list');
            }, 60000); 
                        
            const baseURL =  '127.0.0.1:8000';
    
            const loc = window.location;
            let wsStart = loc.protocol === 'https:' ? 'wss://' : 'ws://';
            const endpoint = wsStart + baseURL + '/ws/' + this.props.username;
        
            const socket = new WebSocket(endpoint);
    
            socket.onmessage = (e) => {
                if (e.data === "ready") {
                    // poll data
                    if (this.props.watchList.length > 0) {
                        this.props.loadDailyData(this.props.watchList, '2020-02-28');
                    }
                } 
            }
    
            socket.onopen = (e) => {
                console.log("open", e)
            }
    
            socket.onerror = (e) => {
                console.log("error", e)
            }
    
            socket.onclose = (e) => {
                console.log("close", e)
            }

            this.setState({ timerID, socket });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    render() { 
        return null; 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Polling); 