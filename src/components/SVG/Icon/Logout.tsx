import React from 'react';

import SVG, { type ISVG } from '..';

const Logout: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <defs>
        <clipPath id="304208a6qa">
          <path data-name="사각형 39742" fill="none" d="M0 0h14.5v15.5H0z" />
        </clipPath>
      </defs>
      <path data-name="사각형 288" opacity=".25" fill="none" d="M0 0h16v16H0z" />
      <g data-name="그룹 73259" clipPath="url(#304208a6qa)" transform="translate(1.5 .25)">
        <path
          data-name="패스 13043"
          d="M9.081 14.75H2.418A1.668 1.668 0 0 1 .75 13.081V2.419A1.668 1.668 0 0 1 2.418.75h6.663"
          strokeMiterlimit="10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5px"
          fill="none"
        />
        <path
          data-name="선 249"
          transform="translate(4.87 7.75)"
          strokeMiterlimit="10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5px"
          fill="none"
          d="M0 0h7.88"
        />
        <path
          data-name="패스 13044"
          d="m10.007 3.994 3.743 3.743v.085l-3.743 3.744"
          strokeLinejoin="round"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5px"
          fill="none"
        />
      </g>
    </SVG>
  );
};

export default Logout;
