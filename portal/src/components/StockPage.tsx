import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import StockChart from './StockChart';
import { moneyFormatter, getPreviousWorkDay } from '../utils';

interface State {
    loading: boolean
}

interface StateProps {

}

type Props = StateProps;

class StockPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { loading: false }
    }

    componentDidMount() {
        console.log(getPreviousWorkDay());
    }

    render() {
        console.log("wtf")
        if (this.state.loading) {
            return (
                <div className="homepage-loader">
                    <Loader
                        type="TailSpin"
                        color="#228B22"
                        height={100}
                        width={100}
                    />
                </div>
            );
        } else {
            return (
                <div className='row mt-5'>
                    <div className='offset-2 col-6'>
                        <h1 className="text-white"> 
                            {moneyFormatter(26000)}
                        </h1>
                        <hr className="bg-secondary"/>
                        <StockChart symbolId={2126} allowSelectRange={true} />
                    </div>
                </div>
            );
        }
    }
}

export default connect(null, null)(StockPage);