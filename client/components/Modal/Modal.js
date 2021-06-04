import React from 'react';
import { ModalStyled, ModalContainer } from './ModalStyled';

const Modal = ({ size = 'normal', children, isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleModalUnfocus = () => {
        onClose(false);
    }
    return (
        <ModalContainer onClick={handleModalUnfocus}>
            <div>
                <ModalStyled onClick={e => e.stopPropagation()} size={size}>{children}</ModalStyled>
            </div>
        </ModalContainer>
    )
}

export default Modal;