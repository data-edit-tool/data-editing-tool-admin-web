import React from 'react';

import SVG, { type ISVG } from '..';

const Plus: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" {...rest}>
      <rect data-name="사각형 85" width="2" height="12" rx="1" transform="translate(5)" fill={color} />
      <rect data-name="사각형 86" width="12" height="2" rx="1" transform="translate(0 5)" fill={color} />
    </SVG>
  );
};

export default Plus;
