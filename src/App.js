import React, { Component } from 'react';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
    state = {
        searchQuery: '',
        hits: null,
    };

    componentDidMount() {
        console.log('This is mount');
    }

    componentDidUpdate() {
        console.log('This is update');
    }

    handleSubmit = e => {
        e.preventDefault();
        fetchingImages(this.state.searchQuery).then(res =>
            this.setState({ hits: res.hits }),
        );
    };

    handleInputChange = e => {
        this.setState({ searchQuery: e.target.value });
    };

    render() {
        return (
            <>
                <Searchbar
                    onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}
                />
                {this.state.hits && <ImageGallery hits={this.state.hits} />}
            </>
        );
    }
}

export default App;
