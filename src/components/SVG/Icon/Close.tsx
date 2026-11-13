import React from 'react';

import SVG, { type ISVG } from '..';

const Close: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <path fill="none" d="M0 0h16v16H0z" />
      <path data-name="패스 55" d="m2913-702-14 14" transform="translate(-2898 703)" stroke={color} strokeWidth="2px" fill="none" />
      <path data-name="패스 56" d="m2899-702 14 14" transform="translate(-2898 703)" stroke={color} strokeWidth="2px" fill="none" />
    </SVG>
  );
};

export default Close;
