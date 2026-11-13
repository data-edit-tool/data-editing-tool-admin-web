import React from 'react';

import SVG, { type ISVG } from '..';

const BackBtn: React.FC<ISVG> = ({ ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32 " {...rest}>
      <g clipPath="url(#clip0_10_169)">
        <path
          d="M25.1998 16.0518L24.0692 17.1835L16.1492 25.1024L15.0185 23.9718L22.9385 16.0518L15.0185 8.13171L16.1492 7.00001L25.1998 16.0518Z"
          fill="#BFBFBF"
        />
        <path d="M5.99998 16.8507L23.0667 16.8507L23.0667 15.2507L5.99998 15.2507L5.99998 16.8507Z" fill="#BFBFBF" />
      </g>
      <defs>
        <clipPath id="clip0_10_169">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default BackBtn;
