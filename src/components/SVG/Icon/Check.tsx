import React from 'react';

import SVG, { type ISVG } from '..';

const Check: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" {...rest}>
      <path data-name="사각형 874" transform="translate(.413)" fill="none" d="M0 0h14v12H0z" />
      <path
        data-name="패스 2107"
        d="m304.486 701.065 4.609 5 7.391-8"
        transform="translate(-303.073 -696.065)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="none"
      />
    </SVG>
  );
};

export default Check;
