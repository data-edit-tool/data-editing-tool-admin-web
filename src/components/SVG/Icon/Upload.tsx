import React from 'react';

import SVG, { type ISVG } from '..';

const Upload: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <defs>
        <clipPath id="xr5v0r3u6a">
          <path data-name="사각형 40169" d="M0 0h11.8v11.628H0z" strokeWidth="1.6px" stroke={color} fill="none" />
        </clipPath>
        <clipPath id="z3kj91sbub">
          <path data-name="사각형 40170" stroke={color} fill="none" d="M0 0h11.8v11.628H0z" />
        </clipPath>
        <clipPath id="lncahxsqec">
          <path data-name="사각형 40171" d="M0 0h11.8v11.628H0z" strokeWidth="1.6px" stroke={color} fill="none" />
        </clipPath>
      </defs>
      <path data-name="사각형 288" opacity=".25" fill="none" d="M0 0h16v16H0z" />
      <g data-name="그룹 73948">
        <path data-name="패스 13316" d="M3 12.914z" />
        <g data-name="그룹 73941">
          <g data-name="그룹 73949">
            <path
              data-name="선 262"
              transform="translate(3 12.914)"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.6px"
              stroke={color}
              fill="none"
              d="M0 0h10"
            />
          </g>
        </g>
        <path data-name="패스 13317" d="M8 9.915z" />
        <g data-name="그룹 73943">
          <g data-name="그룹 73942" clipPath="url(#xr5v0r3u6a)" transform="translate(2.1 2.186)">
            <path
              data-name="선 263"
              transform="translate(5.9 1.728)"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.6px"
              stroke={color}
              fill="none"
              d="M0 0v6"
            />
          </g>
        </g>
        <path data-name="선 264" d="M8 3.086 5.172 5.914" />
        <g data-name="그룹 73945">
          <g data-name="그룹 73944" clipPath="url(#z3kj91sbub)" transform="translate(2.1 2.186)">
            <path
              data-name="선 265"
              transform="translate(3.072 .9)"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.6px"
              stroke={color}
              fill="none"
              d="M2.828 0 0 2.828"
            />
          </g>
        </g>
        <path data-name="선 266" d="m8 3.086 2.828 2.828" />
        <g data-name="그룹 73947">
          <g data-name="그룹 73946" clipPath="url(#lncahxsqec)" transform="translate(2.1 2.186)">
            <path
              data-name="선 267"
              transform="translate(5.9 .9)"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.6px"
              stroke={color}
              fill="none"
              d="m0 0 2.828 2.828"
            />
          </g>
        </g>
      </g>
    </SVG>
  );
};

export default Upload;
