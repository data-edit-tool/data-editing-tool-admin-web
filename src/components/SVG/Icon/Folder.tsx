import React from 'react';

import SVG, { type ISVG } from '..';

const Folder: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30 " {...rest}>
      <g data-name="그룹 73703">
        <g data-name="그룹 73704">
          <path
            data-name="패스 13226"
            d="M21.568 20.113H2.325a.951.951 0 0 1-.883-1.3l3.982-9.957A1.362 1.362 0 0 1 6.688 8h18.871a1.361 1.361 0 0 1 1.263 1.867l-3.669 9.173a1.707 1.707 0 0 1-1.585 1.073z"
            transform="translate(2.079 5.184)"
            fill="none"
            stroke={color}
            strokeWidth="2px"
            strokeMiterlimit="10"
          />
          <path
            data-name="패스 13227"
            d="M22.8 8.806v-2.78a1.392 1.392 0 0 0-1.392-1.392H10.69L8.741 1.711A1.6 1.6 0 0 0 7.414 1h-5.2A1.217 1.217 0 0 0 1 2.217V20.2a1.391 1.391 0 0 0 1.392 1.391h19.02"
            transform="translate(2 3.705)"
            fill="none"
            stroke={color}
            strokeWidth="2px"
            strokeMiterlimit="10"
          />
          <path data-name="선 250" transform="translate(24.804 12.511)" fill="none" stroke={color} strokeWidth="2px" strokeMiterlimit="10" d="M0 .673V0" />
        </g>
      </g>
    </SVG>
  );
};

export default Folder;
