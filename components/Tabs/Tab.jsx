import React from 'react'
import TabStyled from './styles';

const Tab = ({ title, onClick, className }) => {
    console.log({ title })
    return (
        <TabStyled className={className} onClick={onClick}>
            {title}
        </TabStyled>
    )
}


export default Tab;