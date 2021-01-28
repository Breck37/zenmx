import React from 'react'
import TabStyled from './styles';

const Tab = ({ title, onClick }) => {
    return (
        <TabStyled onClick={onClick}>
            {title}
        </TabStyled>
    )
}


export default Tab;