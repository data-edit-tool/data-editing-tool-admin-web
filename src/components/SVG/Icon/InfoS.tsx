import React from 'react';

import SVG, { type ISVG } from '..';

const InfoS: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <g data-name="타원 269" stroke={color} strokeWidth="2px" fill="none">
        <circle cx="8" cy="8" r="8" stroke="none" />
        <circle cx="8" cy="8" r="7" fill="none" />
      </g>
      <path data-name="패스 13235" d="M0 3V0" transform="translate(8 8)" strokeLinecap="round" stroke={color} strokeWidth="2px" fill="none" />
      <path data-name="선 261" transform="translate(8 5)" strokeLinecap="round" stroke={color} strokeWidth="2px" fill="none" d="M0 0h0" />
    </SVG>
  );
};

export default InfoS;
