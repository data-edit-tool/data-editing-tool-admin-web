import React from 'react';

import SVG, { type ISVG } from '..';

const Back: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30 " {...rest}>
      <path
        data-name="합치기 24"
        d="m-111 822.97 1.06-1.061 7.425-7.424 1.06 1.06-7.425 7.425 7.425 7.425-1.06 1.061z"
        transform="translate(117 -807.97)"
        fill={color}
      />
      <path data-name="사각형 40065" transform="translate(8 14.251)" fill={color} d="M0 0h16v1.5H0z" />
    </SVG>
  );
};

export default Back;
