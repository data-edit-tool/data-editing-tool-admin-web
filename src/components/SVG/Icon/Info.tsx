import React from 'react';

import SVG, { type ISVG } from '..';

const Info: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" {...rest}>
      <rect data-name="사각형 327" width="40" height="40" rx="20" fill="#f4f6f8" />
      <rect data-name="사각형 328" width="4" height="12" rx="2" transform="translate(18 11)" fill={color} />
      <rect data-name="사각형 329" width="4" height="4" rx="2" transform="translate(18 26)" fill={color} />
    </SVG>
  );
};

export default Info;
