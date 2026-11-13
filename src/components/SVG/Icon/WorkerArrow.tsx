import React from 'react';

import SVG, { type ISVG } from '..';

const WorkerArrow: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" {...rest}>
      <path opacity=".396" fill="none" d="M0 0h16.071v15.84H0z" transform="rotate(180 9.75 8.657)" />
      <path data-name="선 10" transform="rotate(180 9.107 4.697)" d="M16.714 0H0" stroke={color} strokeLinecap="round" strokeWidth="3px" fill="none" />
      <path
        data-name="패스 413"
        d="M0 6.429 7.277 0l7.277 6.429"
        transform="rotate(90 8.048 10.166)"
        strokeLinejoin="round"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3px"
        fill="none"
      />
    </SVG>
  );
};

export default WorkerArrow;
