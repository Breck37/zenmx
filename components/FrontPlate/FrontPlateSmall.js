import React from 'react';
import FrontPlateSmallIcon from './FrontPlateSmall.svg';
import { FrontPlateSmallStyled } from './styles';
import manufacturers from '../../constants/manufacturers';

const FrontPlateSmall = ({ height = 32, width = 32, rider }) => {
  return (
    <FrontPlateSmallStyled height={height} width={width}>
      <FrontPlateSmallIcon
        fill={manufacturers[rider.bike.toLowerCase()].color}
      />
      <div className="number-wrap">{rider.number}</div>
    </FrontPlateSmallStyled>
  );
};

export default FrontPlateSmall;
