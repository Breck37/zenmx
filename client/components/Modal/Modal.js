import React from 'react';
import {ModalStyled, ModalContainer} from './ModalStyled';

const Modal = ({ size = 'normal', children, isOpen }) => {
    if(!isOpen) return null;
    return (
        <ModalContainer>
            <ModalStyled size={size}>{children}</ModalStyled>
        </ModalContainer>
    )
}

export default Modal;