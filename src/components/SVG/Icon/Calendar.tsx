import React from 'react';

import SVG, { type ISVG } from '..';

const Calendar: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <g data-name="사각형 880" transform="translate(0 2)" stroke={color} strokeWidth="2px" fill="#fff">
        <rect width="16" height="14" rx="2" stroke="none" />
        <rect x="1" y="1" width="14" height="12" rx="1" fill="none" />
      </g>
      <circle data-name="타원 56" cx="1" cy="1" r="1" transform="translate(7 10)" />
      <circle data-name="타원 57" cx="1" cy="1" r="1" transform="translate(3.667 10)" />
      <circle data-name="타원 58" cx="1" cy="1" r="1" transform="translate(10.333 10)" />
      <path data-name="사각형 881" d="M1 6h14v2H1z" />
      <rect data-name="사각형 882" width="4" height="2" rx="1" transform="rotate(90 2.5 3.5)" />
      <rect data-name="사각형 883" width="4" height="2" rx="1" transform="rotate(90 5.5 6.5)" />
    </SVG>
  );
};

export default Calendar;
