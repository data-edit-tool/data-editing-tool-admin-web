import React from 'react';

import SVG, { type ISVG } from '..';

const Arrow: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <path data-name="사각형 57" opacity="0.189" fill="none" d="M0 0h16v16H0z" />
      <path data-name="패스 55" d="m5892 3121 6 6 6-6" transform="translate(-5890 -3116)" stroke={color} strokeWidth="1.5px" fill="none" />
    </SVG>
  );
};

export default Arrow;
