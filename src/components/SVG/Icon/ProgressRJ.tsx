import React from 'react';

import SVG, { type ISVG } from '..';

const ProgressRJ: React.FC<ISVG> = ({ ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...rest}>
      <g clipPath="url(#clip0_14_339)">
        <path d="M16 22H8V24H16V22Z" fill="white" />
        <path d="M18 16H8V18H18V16Z" fill="white" />
        <path
          d="M16 28H6V3.99998H14V9.99998C14.0015 10.5299 14.2127 11.0378 14.5875 11.4125C14.9622 11.7872 15.47 11.9984 16 12H22V15H24V9.99998C24.0036 9.86855 23.9786 9.7379 23.9268 9.61705C23.875 9.4962 23.7976 9.38803 23.7 9.29998L16.7 2.29998C16.612 2.20231 16.5038 2.1249 16.3829 2.07311C16.2621 2.02131 16.1314 1.99636 16 1.99998H6C5.47004 2.00151 4.96222 2.21271 4.58748 2.58745C4.21274 2.9622 4.00153 3.47002 4 3.99998V28C4.00153 28.5299 4.21274 29.0378 4.58748 29.4125C4.96222 29.7872 5.47004 29.9984 6 30H16V28ZM16 4.39998L21.6 9.99998H16V4.39998Z"
          fill="white"
        />
        <path
          d="M28 20.415L26.586 19L24 21.587L21.414 19L20 20.415L22.586 23L20 25.586L21.414 27L24 24.414L26.586 27L28 25.586L25.414 23L28 20.415Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_339">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default ProgressRJ;
