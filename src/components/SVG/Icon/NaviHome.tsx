import React from 'react';

import SVG, { type ISVG } from '..';

const NaviHome: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" {...rest}>
      <path data-name="사각형 288" opacity="0.25" fill="none" d="M0 0h12v12H0z" />
      <path
        data-name="패스 2083"
        d="M1 7.278 6.5 3 12 7.278v5.5A1.222 1.222 0 0 1 10.778 14H2.222A1.222 1.222 0 0 1 1 12.778z"
        transform="translate(-.5 -2.5)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        data-name="패스 2084"
        d="M7 16v-5h3v5"
        transform="translate(-2.497 -4.498)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SVG>
  );
};

export default NaviHome;
