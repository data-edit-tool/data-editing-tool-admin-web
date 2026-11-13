import React from 'react';

import SVG, { type ISVG } from '..';

const Edit: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g data-name="그룹 73274">
        <g data-name="그룹 73702">
          <path
            data-name="패스 13224"
            d="m11.177 1.5-9.632 9.632-1.021 3.815a.668.668 0 0 0 .817.819l3.816-1.023 9.632-9.632z"
            transform="translate(3.5 4.207)"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.3px"
          />
          <path
            data-name="패스 13225"
            d="M10.382 5.814 6.771 2.2 7.975 1a1.7 1.7 0 0 1 2.407 0l1.2 1.2a1.7 1.7 0 0 1 0 2.407z"
            transform="translate(7.906 3.504)"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.3px"
          />
          <path
            data-name="선 249"
            transform="translate(12.23 19.77)"
            d="M0 0h7.77"
            strokeLinecap="round"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth="1.3px"
          />
        </g>
      </g>
    </SVG>
  );
};

export default Edit;
