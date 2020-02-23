import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl } from 'react-bootstrap';

class Search extends Component {
    state = {
        searchString: '',
        suggestions: [],
        showSuggestions: false,
        cancelSource: null,
    }  

    handleChange = () => {
        const searchValue = this.refs.search.value;
        this.setState({ searchString: searchValue, showSuggestions: true });

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
            this.setState({ searchString: '', suggestions: [], showSuggestions: false });
        };
    }

    select = () => {
        this.setState({
            searchString: '',
            suggestions: [],
            cancelSource: null
        });
    }

    highlight = (searchString, value) => {
        if (value.toLowerCase().startsWith(searchString.toLowerCase())) {
            return (
                <>
                    <span className="text-danger">
                        {searchString.toUpperCase()}
                    </span>
                    <span>
                        { value.substring(value.indexOf(searchString) + searchString.length + 1) }
                    </span>
                </>
            );
        } else {
            return value;
        }
    };
    
    hideSuggestions = () => {
        this.setState({showSuggestions: false});
    }

    render() {      
        let suggestions;

        if (this.state.suggestions.length > 0) {
            suggestions = (
                <ul className='list-group'>
                    {this.state.suggestions.map(s => {
                    return (
                        <li className='list-group-item text-white bg-transparent'
                            key={s.id} onClick={this.select}
                        >
                            ({this.highlight(this.state.searchString, s.symbol)})
                            &nbsp;
                            {this.highlight(this.state.searchString, s.name)}
                        </li>
                    );
                    })}
                </ul>
            );
        } else {
            suggestions = (
                <li className='list-group-item text-secondary bg-transparent disabled'>
                    We were unable to find any results for your search.
                </li>
            );
        }

        return (
            <Form className='search'>
                <FormControl 
                    type='text' ref='search' placeholder='Search' onChange={this.handleChange} onBlur={this.hideSuggestions} 
                />
                {this.state.showSuggestions ? suggestions : null}
            </Form>
        );
    }
}

export default Search;

