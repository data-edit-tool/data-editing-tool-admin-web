import React from 'react';

import SVG, { type ISVG } from '..';

const NaviArrow: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 6" {...rest}>
      <path data-name="사각형 1084" opacity="0.283" fill="none" d="M0 0h5v6H0z" />
      <path data-name="패스 3924" d="m-2779-16110 3 2-3 2" transform="translate(2780 16111)" stroke={color} strokeLinejoin="round" fill="none" />
    </SVG>
  );
};

export default NaviArrow;
