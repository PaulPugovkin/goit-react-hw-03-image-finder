import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = e => {
        this.props.onClose();
    };

    render() {
        return createPortal(
            <div
                className="Overlay"
                onClose={this.handleKeydown}
                onClick={this.props.handleBackdropClick}
            >
                <div className="Modal">
                    <img
                        src={this.props.modalImage}
                        alt={this.props.modalAlt}
                    />
                </div>
            </div>,
            modalRoot,
        );
    }
}

export default Modal;
