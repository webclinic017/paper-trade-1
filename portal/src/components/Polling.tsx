import { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../reducers/rootReducer';
import { IUser } from '../models/user';
import { IDailyStockData, IStock } from '../models/stock';
import { IStockPortfolio } from '../models/stockPortfolio';
import { loadStockPortfoliosAction } from '../actions/stockPortfolioActions';
import { loadStocksAction, loadDailyDataAction, initialDataLoadedAction } from '../actions/stockActions';
import { loadCurrentUserAction } from '../actions/userActions';
import { getLastTradingDay } from '../utils'

const mapStateToProps = (state: AppState) => {
    const { watchlist, viewList } = state.stockPortfolioReducer;
    const { username } = state.userReducer;
    return { watchlist, username, viewList };
};

const mapDispatchToProps = (dispatch: any) => ({
    loadDailyData: (symbolIds: Array<number>, date: string) => dispatch(loadDailyDataAction(symbolIds, date)),
    loadStockPortfolios: (userId: number) => dispatch(loadStockPortfoliosAction(userId)),
    loadStocks: (symbolIds: Array<number>) => dispatch(loadStocksAction(symbolIds)),
    loadCurrentUser: () => dispatch(loadCurrentUserAction()),
    initialDataLoaded: () => dispatch(initialDataLoadedAction())
});

interface StateProps {
    watchlist: Array<number>, 
    viewList: Array<number>,
    username: string
}

interface DispatchProps {
    loadDailyData: (symbolIds: Array<number>, date: string) => Promise<Array<IDailyStockData>>,
    loadStockPortfolios: (userId: number) => Promise<Array<IStockPortfolio>>,
    loadStocks: (symbolIds: Array<number>) => Promise<Array<IStock>>,
    loadCurrentUser: () => Promise<IUser>,
    initialDataLoaded: () => Promise<null>
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

    componentDidMount() {
        this.props.loadCurrentUser().then(
            user => {
                const userId = user.id;
                this.props.loadStockPortfolios(userId).then(portfolios => {
                    const watchedSymbols = new Set<number>();
                    portfolios.forEach(p => {
                        p.stockposition_set.forEach(sp => watchedSymbols.add(sp.stock));
                        p.properties.watch_list.forEach(s => watchedSymbols.add(s));
                    });                    

                    const watchlist = Array.from(watchedSymbols);

                    if (watchlist.length > 0) {
                        const date = getLastTradingDay();
                        this.props.loadStocks(watchlist);
                        this.props.loadDailyData(watchlist, date).then(res => this.props.initialDataLoaded());
                    } else {
                        this.props.initialDataLoaded();
                    }
                });
            }
        );
    }

    componentDidUpdate() {
        if (!this.state.socket && this.props.username) {
            const timerID = setInterval(() => {
                // console.log(this.props.watchlist, 'watch list');
            }, 60000); 
                        
            const baseURL =  '127.0.0.1:8000';
    
            const loc = window.location;
            let wsStart = loc.protocol === 'https:' ? 'wss://' : 'ws://';
            const endpoint = wsStart + baseURL + '/ws/' + this.props.username;
        
            const socket = new WebSocket(endpoint);
    
            socket.onmessage = (e) => {
                // poll data
                if (e.data === "ready") {
                    const viewAndWatchlist = new Set([...this.props.watchlist, ...this.props.viewList]);
                    // poll data
                    console.log(viewAndWatchlist)
                    if (viewAndWatchlist.size > 0) {
                        this.props.loadDailyData(Array.from(viewAndWatchlist), getLastTradingDay());
                    }
                    console.log(e);
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