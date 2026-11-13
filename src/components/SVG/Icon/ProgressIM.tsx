import React from 'react';

import SVG, { type ISVG } from '..';

const ProgressIM: React.FC<ISVG> = ({ ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...rest}>
      <g clipPath="url(#clip0_14_458)">
        <path d="M25.41 25L29 21.41L27.59 20L24 23.59L20.41 20L19 21.41L22.59 25L19 28.59L20.41 30L24 26.41L27.59 30L29 28.59L25.41 25Z" fill="white" />
        <path
          d="M24 5H21V4C20.9985 3.47004 20.7873 2.96222 20.4125 2.58748C20.0378 2.21274 19.53 2.00153 19 2H11C10.47 2.00153 9.96222 2.21274 9.58748 2.58748C9.21274 2.96222 9.00153 3.47004 9 4V5H6C5.47004 5.00153 4.96222 5.21274 4.58748 5.58748C4.21274 5.96222 4.00153 6.47004 4 7V28C4.00153 28.53 4.21274 29.0378 4.58748 29.4125C4.96222 29.7873 5.47004 29.9985 6 30H15V28H6V7H9V10H21V7H24V17H26V7C25.9985 6.47004 25.7873 5.96222 25.4125 5.58748C25.0378 5.21274 24.53 5.00153 24 5ZM19 8H11V4H19V8Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_458">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default ProgressIM;
