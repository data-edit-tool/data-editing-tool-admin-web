import React from 'react';

import SVG, { type ISVG } from '..';

const RecentUpload: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <defs>
        <clipPath id="yyq9op9vna">
          <path data-name="사각형 40172" fill={color} d="M0 0h15.655v12.344H0z" />
        </clipPath>
      </defs>
      <path data-name="사각형 288" fill="none" opacity=".25" d="M0 0h16v16H0z" />
      <g data-name="그룹 73950" clipPath="url(#yyq9op9vna)" transform="translate(.174 1.828)">
        <path
          data-name="패스 13318"
          d="M13.045 4.665c-.171-.061-.206-.1-.2-.226a.836.836 0 0 0-.034-.261c-.007-.029-.015-.057-.02-.086a5.06 5.06 0 0 0-9.767-.629.232.232 0 0 1-.16.17 4.509 4.509 0 0 0 1.617 8.707H11.618a4.718 4.718 0 0 0 .77-.066 3.952 3.952 0 0 0 .657-7.608m.893 5.125a2.635 2.635 0 0 1-2.211 1.245q-.689.006-1.376.005H4.491a3.217 3.217 0 0 1-3.125-2.61A3.18 3.18 0 0 1 3.592 4.76a.79.79 0 0 0 .594-.615 3.752 3.752 0 0 1 7.37.516l.005.049c.009.1.019.2.022.306a.684.684 0 0 0 .642.766A2.575 2.575 0 0 1 14.1 7.258a2.634 2.634 0 0 1-.158 2.532"
          fill={color}
        />
        <path
          data-name="패스 13319"
          d="M9.363 4.882 7.175 7.07 6.127 6.023a.8.8 0 1 0-1.132 1.132l1.614 1.613a.8.8 0 0 0 1.131 0l2.755-2.754a.8.8 0 1 0-1.132-1.132"
          fill={color}
        />
      </g>
    </SVG>
  );
};

export default RecentUpload;
