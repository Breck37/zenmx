import React from 'react';
import PodiumStyled from './styles';

// Props
// firstPlace: Rider
// secondPlace: Rider
// thirdPlace: Rider
// responsive boolean

export default function Podium({
  responsive = false,
  firstPlace,
  secondPlace,
  thirdPlace,
}) {
  return (
    <PodiumStyled className={responsive ? 'responsive' : ''}>
      <div className="second-user rider">{secondPlace?.name}</div>
      <div className="section two">
        <div className="second spot">2</div>
      </div>
      <div className="first-user rider">{firstPlace?.name}</div>
      <div className="section one">
        <div className="spot first">1</div>
        <div className="hidden spot" />
        <div className="hidden spot" />
      </div>
      <div className="third-user rider">{thirdPlace?.name}</div>
      <div className="section three">
        <div className="third spot">3</div>
      </div>
    </PodiumStyled>
  );
}
