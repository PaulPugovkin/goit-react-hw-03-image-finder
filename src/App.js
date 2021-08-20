import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import fetchingImages from './services/image-api';
import { fetchOptions } from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
    state = {
        status: '',
        searchQuery: '',
        hits: null,
        modal: false,
        modalImage: '',
        modalAlt: '',
    };

    handleSubmit = e => {
        this.setState({ status: 'pending' });
        e.preventDefault();
        try {
            fetchOptions.PAGE = 1;
            fetchingImages(this.state.searchQuery).then(
                res => this.setState({ hits: res.hits }),
                this.setState({ status: 'resolved' }),
            );
        } catch (error) {
            this.setState({ status: 'rejected' });
            console.log(error);
        }
    };

    handleInputChange = e => {
        this.setState({ searchQuery: e.target.value });
    };

    onLoadMore = () => {
        this.setState({ status: 'pending' });
        try {
            fetchOptions.PAGE += 1;
            fetchingImages(this.state.searchQuery).then(res =>
                this.setState(prevState => {
                    return {
                        hits: [...prevState.hits, ...res.hits],
                    };
                }),
            );
            this.setState({ status: 'resolved' });
        } catch (error) {
            this.setState({ status: 'rejected' });
            alert('Retry your search');
            console.log(error);
        }
    };

    onImageClick = e => {
        console.log(e.target.alt);
        if (!e.target.classList.contains('ImageGalleryItem-image')) return;
        this.setState({
            modalImage: e.target.dataset.modal,
            modal: true,
            modalAlt: e.target.alt,
        });
        window.addEventListener('keydown', this.handleKeydown);
    };

    handleBackdropClick = e => {
        if (e.target.classList.contains('Overlay')) this.resetModal();
        return;
    };

    handleKeydown = e => {
        if (e.code === 'Escape') this.resetModal();
    };

    resetModal = () => {
        this.setState({ modalImage: '', modal: false, modalAlt: '' });
    };

    render() {
        return (
            <>
                <Searchbar
                    onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}
                />
                {this.state.hits && (
                    <ImageGallery
                        onImageClick={this.onImageClick}
                        hits={this.state.hits}
                    />
                )}
                {this.state.hits && this.state.hits.length > 0 && (
                    <Button onLoadMore={this.onLoadMore} />
                )}
                {this.state.modal && (
                    <Modal
                        modalAlt={this.state.modalAlt}
                        modalImage={this.state.modalImage}
                        onClose={this.handleKeydown}
                        handleBackdropClick={this.handleBackdropClick}
                    />
                )}
                {this.state.status === 'pending' && (
                    <Loader
                        className="spinner"
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                )}
            </>
        );
    }
}

export default App;
