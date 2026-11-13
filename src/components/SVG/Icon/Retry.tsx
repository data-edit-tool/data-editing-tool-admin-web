import React from 'react';

import SVG, { type ISVG } from '..';

const Retry: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <path data-name="사각형 1116" transform="rotate(90 8 8)" opacity=".478" fill="none" d="M0 0h16v16H0z" />
      <g data-name="그룹 74894">
        <g data-name="그룹 74896">
          <path
            data-name="패스 14054"
            d="M0 5a5 5 0 0 1 9.565-2.039"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.2px"
            fill="none"
            transform="translate(3 3)"
          />
          <path
            data-name="패스 14055"
            d="M0 2.174h2.174V0"
            transform="translate(10.826 3.785)"
            strokeLinecap="round"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.2px"
            fill="none"
          />
          <path
            data-name="패스 14056"
            d="M0 2.039A5 5 0 0 0 4.565 5a5 5 0 0 0 5-5"
            transform="translate(3.435 8)"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.2px"
            fill="none"
          />
          <path
            data-name="패스 14057"
            d="M2.174 0H0v2.174"
            transform="translate(3 10.039)"
            strokeLinecap="round"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="1.2px"
            fill="none"
          />
        </g>
      </g>
    </SVG>
  );
};

export default Retry;
