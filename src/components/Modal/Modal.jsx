import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    render() {
        return createPortal(
            <div className="Overlay">
                <div className="Modal">
                    <img src="" alt="" />
                </div>
            </div>,
            modalRoot,
        );
    }
}

export default Modal;
