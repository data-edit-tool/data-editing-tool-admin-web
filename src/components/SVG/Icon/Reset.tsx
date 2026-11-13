import React from 'react';

import SVG, { type ISVG } from '..';

const Reset: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...rest}>
      <path
        data-name="패스 62"
        d="M2.517 8.313a7.812 7.812 0 1 1 2.551 5.776"
        transform="translate(.815 1.5)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5px"
      />
      <path
        data-name="패스 63"
        d="m1.44 5.5 1.989 1.985a.844.844 0 0 1-1.194 1.193L.246 6.69A.844.844 0 0 1 1.44 5.5"
        transform="translate(.501 3.219)"
        fill={color}
      />
      <path
        data-name="패스 64"
        d="M5.2 6.69 3.208 8.679a.844.844 0 0 1-1.193-1.194L4 5.5a.844.844 0 0 1 1.2 1.19"
        transform="translate(.722 3.219)"
        fill={color}
      />
    </SVG>
  );
};

export default Reset;
