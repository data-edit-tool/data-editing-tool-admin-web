import React from 'react';

import SVG, { type ISVG } from '..';

const More: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...rest}>
      <g transform="translate(-453 16056)">
        <rect data-name="사각형 329" width="4" height="4" rx="2" transform="rotate(90 8253.5 -7789.5)" fill={color} />
        <rect data-name="사각형 39758" width="4" height="4" rx="2" transform="rotate(90 8256.5 -7786.5)" fill={color} />
        <rect data-name="사각형 39759" width="4" height="4" rx="2" transform="rotate(90 8259.5 -7783.5)" fill={color} />
      </g>
    </SVG>
  );
};

export default More;
