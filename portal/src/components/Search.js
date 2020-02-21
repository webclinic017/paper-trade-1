import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';

import './Search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            cancelSource: null
        };
    }

    handleChange = () => {
        const searchValue = this.refs.search.value;

        if (searchValue !== '') {
            try {
                this.state.cancelSource.cancel('wowo');
            } catch(error) {
                // do nothing
            };

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            this.setState({ cancelSource: source });

            axios.get(`http://127.0.0.1:8000/api/v1/stocks/autocomplete/${searchValue}`, {
                cancelToken: source.token
            }).then(res => {
                this.setState({
                    suggestions: res.data
                });
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                } else {
                  // handle error
                }
            });
        } else {
            this.setState({ suggestions: [] })
        };
    }

    select = () => {
        this.refs.search.value = '';
        this.setState({
            suggestions: [],
            cancelSource: null
        });
    }

    render() {      

        const suggestions = (
                <ul className="list-group">
                    {this.state.suggestions.map(s => {
                    return (
                        <li className="list-group-item text-white bg-transparent"
                            key={s.id} onClick={this.select}
                        >
                            ({s.symbol}) {s.name}
                        </li>
                    );
                    })}
                </ul>
            );

        return (
            <Form className="search">
                <FormControl 
                    type="text" ref="search" placeholder="Search" onChange={this.handleChange} 
                />
                { suggestions }
            </Form>
        );
    }
}

export default Search;

