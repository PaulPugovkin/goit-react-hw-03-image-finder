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

    handleInputChange = e => {
        this.setState({ searchQuery: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetchOptions.PAGE = 1;
        fetchingImages(this.state.searchQuery)
            .then(res => this.setState({ hits: res.hits, status: 'resolved' }))
            .then(this.setState({ status: 'pending' }))
            .catch(err => {
                this.setState({ status: 'rejected' });
                console.log(err);
            });
        console.log(this.state.status);
    };

    onLoadMore = () => {
        fetchOptions.PAGE += 1;
        fetchingImages(this.state.searchQuery)
            .then(res =>
                this.setState(prevState => ({
                    hits: [...prevState.hits, ...res.hits],
                    status: 'resolved',
                })),
            )
            .then(this.setState({ status: 'pending' }))
            .catch(error => console.log(error))
            .finally(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            });
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
        const { hits, modal, status, modalAlt, modalImage } = this.state;
        const {
            handleSubmit,
            handleInputChange,
            onImageClick,
            onLoadMore,
            handleKeydown,
            handleBackdropClick,
        } = this;
        return (
            <>
                <Searchbar
                    onSubmit={handleSubmit}
                    onChange={handleInputChange}
                />
                {hits && hits.length > 0 && (
                    <>
                        <ImageGallery onImageClick={onImageClick} hits={hits} />
                        <Button onLoadMore={onLoadMore} />
                    </>
                )}
                {modal && (
                    <Modal
                        modalAlt={modalAlt}
                        modalImage={modalImage}
                        onClose={handleKeydown}
                        handleBackdropClick={handleBackdropClick}
                    />
                )}
                {status === 'pending' && (
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
