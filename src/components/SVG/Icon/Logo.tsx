import React from 'react';

import SVG, { type ISVG } from '..';

const Logo: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 30" {...rest}>
      <path data-name="사각형 2694" d="M0 0h140v20.515H0z" transform="translate(30.001 6.743)" fill="none" />
      <g data-name="logo maumdata 136x20px">
        <g data-name="그룹 2619">
          <path
            data-name="패스 4058"
            d="M81 .442a6.445 6.445 0 0 1 3.3 2.592 9.363 9.363 0 0 1 1.381 3.3 16.689 16.689 0 0 1 .368 3.382 14.172 14.172 0 0 1-1.552 6.9A6.942 6.942 0 0 1 78 20.43h-8.359V0H78a9.722 9.722 0 0 1 3 .444zm-7.424 3.1v13.34h3.74a4.056 4.056 0 0 0 4-2.98 11 11 0 0 0 .618-3.9 10.018 10.018 0 0 0-.926-4.789q-.927-1.669-3.693-1.669z"
            transform="translate(32.048 6.744)"
            fill={color}
          />
          <path
            data-name="패스 4059"
            d="M94.1 0h4.582l6.857 20.432h-4.392l-1.28-4.2H92.73l-1.314 4.2H87.18zm-.267 12.711h4.962l-2.449-8.04z"
            transform="translate(32.564 6.743)"
            fill={color}
          />
          <path data-name="패스 4060" d="M119.592 0v3.618h-5.8v16.814h-4.079V3.618h-5.823V0z" transform="translate(33.059 6.743)" fill={color} />
          <path
            data-name="패스 4061"
            d="M125.086 0h4.582l6.857 20.432h-4.393l-1.28-4.2h-7.137l-1.314 4.2h-4.236zm-.267 12.711h4.962l-2.449-8.04z"
            transform="translate(33.475 6.743)"
            fill={color}
          />
        </g>
        <g data-name="그룹 73254">
          <g data-name="그룹 73255">
            <path
              data-name="패스 13034"
              d="M377.789 51.966h-2.86V44.6a2.25 2.25 0 1 0-4.5 0v7.367h-2.86V44.6a5.11 5.11 0 0 1 10.221 0z"
              transform="translate(-282.456 -24.784)"
              fill={color}
            />
            <path
              data-name="패스 13035"
              d="M325.837 44.191a5.094 5.094 0 0 1 1.465-3.577 5.108 5.108 0 0 0-8.825 3.506v7.367h2.86v-7.368a2.25 2.25 0 0 1 4.5 0z"
              transform="translate(-240.724 -24.377)"
              fill={color}
            />
            <path
              data-name="패스 13036"
              d="M137.319 48.7a3.415 3.415 0 0 1 0-6.829 1.43 1.43 0 0 1 0-2.86 6.275 6.275 0 1 0 2.913 11.829v-3.78a3.412 3.412 0 0 1-2.913 1.64"
              transform="translate(-81.396 -24.377)"
              fill={color}
            />
            <path
              data-name="패스 13037"
              d="M164.786 39.009a1.43 1.43 0 1 0 0 2.86 3.419 3.419 0 0 1 3.415 3.415v6.2h2.86v-6.2a6.282 6.282 0 0 0-6.275-6.275"
              transform="translate(-108.863 -24.377)"
              fill={color}
            />
            <path
              data-name="패스 13039"
              d="M232.824 50.536a1.43 1.43 0 0 1 1.43-1.43 2.857 2.857 0 0 1-2.854-2.853v-6.765h-2.86v6.764a5.72 5.72 0 0 0 5.714 5.714 1.43 1.43 0 0 1-1.43-1.43"
              transform="translate(-164.273 -24.784)"
              fill={color}
            />
            <path
              data-name="패스 13040"
              d="M261.393 39.488v6.764a2.857 2.857 0 0 1-2.853 2.853 1.43 1.43 0 1 0 0 2.86 5.72 5.72 0 0 0 5.714-5.714v-6.763z"
              transform="translate(-188.559 -24.784)"
              fill={color}
            />
            <path
              data-name="패스 13041"
              d="M59.313 51.966h-2.86V44.6a2.25 2.25 0 1 0-4.5 0v7.367h-2.86V44.6a5.11 5.11 0 1 1 10.221 0z"
              transform="translate(-11.731 -24.784)"
              fill={color}
            />
            <path
              data-name="패스 13042"
              d="M7.361 44.191a5.094 5.094 0 0 1 1.465-3.577A5.108 5.108 0 0 0 0 44.119v7.367h2.86v-7.367a2.25 2.25 0 0 1 4.5 0z"
              transform="translate(30 -24.377)"
              fill={color}
            />
          </g>
        </g>
      </g>
    </SVG>
  );
};

export default Logo;
