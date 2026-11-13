import React from 'react';

import SVG, { type ISVG } from '..';

const ProgressIC: React.FC<ISVG> = ({ ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...rest}>
      <g clipPath="url(#clip0_14_688)">
        <path
          d="M25 5H22V4C21.9985 3.47004 21.7873 2.96222 21.4125 2.58748C21.0378 2.21274 20.53 2.00153 20 2H12C11.47 2.00153 10.9622 2.21274 10.5875 2.58748C10.2127 2.96222 10.0015 3.47004 10 4V5H7C6.47004 5.00153 5.96222 5.21274 5.58748 5.58748C5.21274 5.96222 5.00153 6.47004 5 7V28C5.00153 28.53 5.21274 29.0378 5.58748 29.4125C5.96222 29.7873 6.47004 29.9985 7 30H12V28H7V7H10V10H22V7H25V12H27V7C26.9985 6.47004 26.7873 5.96222 26.4125 5.58748C26.0378 5.21274 25.53 5.00153 25 5ZM20 8H12V4H20V8Z"
          fill="white"
        />
        <path d="M16 24H24.1719L21.5859 26.5859L23 28L28 23L23 18L21.5859 19.4141L24.1719 22H16V24Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_14_688">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
};

export default ProgressIC;
