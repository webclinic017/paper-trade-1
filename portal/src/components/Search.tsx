import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';

import { axios, autocomplete } from '../services';

class Search extends Component {
    state = {
        searchString: '',
        suggestions: [],
        showSuggestions: false,
        cancelSource: { cancel: () => null },
    }  

    handleChange = () => {
        const searchValue = (this.refs.search as any).value;
        this.setState({ searchString: searchValue, showSuggestions: true });

        if (searchValue !== '') {
            try {
                this.state.cancelSource.cancel();
            } catch(error) {
                // do nothing
            }

            const cancelToken = (axios as any).CancelToken;
            const source = cancelToken.source();
            this.setState({ cancelSource: source });

            autocomplete(searchValue, source.token).then(res => {
                this.setState({
                    suggestions: res.data
                });
            }).catch(function (thrown) {
                if ((axios as any).isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                } else {
                  // handle error
                }
            });
        } else {
            this.setState({ searchString: '', suggestions: [], showSuggestions: false });
        }
    };

    select = () => {
        this.setState({
            searchString: '',
            suggestions: [],
            cancelSource: null
        });
    };

    highlight = (searchString: string, value: string) => {
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
    };

    render() {      
        let suggestions;

        if (this.state.suggestions.length > 0) {
            suggestions = (
                this.state.suggestions.map((s: { symbol: string, name: string, id: string }) => 
                    <li className='list-group-item text-white bg-transparent'
                        key={s.id} onClick={this.select}
                    >
                        ({this.highlight(this.state.searchString, s.symbol)})
                        &nbsp;
                        {this.highlight(this.state.searchString, s.name)}
                    </li>
                )
            );
        } else {
            suggestions = (
                <li className='list-group-item text-secondary bg-transparent disabled'>
                    We were unable to find any results for your search.
                </li>
            );
        }

        return (
            <Form className='search position-relative'>
                <FormControl 
                    type='text' ref={'search' as any} placeholder='Search' onChange={this.handleChange} onBlur={this.hideSuggestions} 
                />
                <ul className='list-group search-suggestions'>
                    { this.state.showSuggestions ? suggestions : null }
                </ul>
            </Form>
        );
    }
}

export default Search;

