import React from 'react';

import SVG, { type ISVG } from '..';

const Workspace: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
      <path data-name="사각형 288" fill="none" opacity=".25" d="M0 0h16v16H0z" />
      <path
        data-name="합치기 45"
        d="M5594.947 16997.6a1.947 1.947 0 0 1-1.945-1.945v-10.711a1.947 1.947 0 0 1 1.945-1.945h10.707a1.95 1.95 0 0 1 1.945 1.945v10.711a1.95 1.95 0 0 1-1.945 1.945zm6.224-1.719h4.483a.227.227 0 0 0 .226-.227v-10.711a.228.228 0 0 0-.226-.227h-4.483zm-6.45-.227a.224.224 0 0 0 .226.227h4.5v-4.723h-4.727zm0-10.711v4.5h4.727v-4.723h-4.5a.226.226 0 0 0-.227.223z"
        transform="translate(-5592.3 -16982.299)"
        fill={color}
      />
    </SVG>
  );
};

export default Workspace;
