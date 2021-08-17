import React, { Component } from 'react';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
    state = {
        searchQuery: '',
        hits: null,
        modal: false,
    };

    componentDidMount() {
        console.log('This is mount');
    }

    componentDidUpdate() {
        console.log('This is update');
    }

    handleSubmit = e => {
        e.preventDefault();
        fetchOptions.PAGE = 1;
        fetchingImages(this.state.searchQuery).then(res =>
            this.setState({ hits: res.hits }),
        );
    };

    handleInputChange = e => {
        this.setState({ searchQuery: e.target.value });
    };

    onLoadMore = () => {
        fetchOptions.PAGE += 1;
        fetchingImages(this.state.searchQuery).then(res =>
            this.setState(prevState => {
                return {
                    hits: [...prevState.hits, ...res.hits],
                };
            }),
        );
    };

    onImageClick = () => {};

    render() {
        return (
            <>
                <Searchbar
                    onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}
                />
                {this.state.hits && <ImageGallery hits={this.state.hits} />}
                {this.state.hits && <Button onLoadMore={this.onLoadMore} />}
                {this.state.modal && <Modal />}
            </>
        );
    }
}

export default App;
