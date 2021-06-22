import React from 'react';
import TabStyled from './styles';

const Tab = ({ title, onClick, className }) => {
  return (
    <TabStyled className={className} onClick={onClick}>
      {title}
    </TabStyled>
  );
};

export default Tab;
