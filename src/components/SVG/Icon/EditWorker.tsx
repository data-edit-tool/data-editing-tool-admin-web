import React from 'react';

import SVG, { type ISVG } from '..';

const EditWorker: React.FC<ISVG> = ({ color, ...rest }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <path
        data-name="빼기 92"
        d="M.738 16.754a.69.69 0 0 1-.167-.023.722.722 0 0 1-.454-.32.713.713 0 0 1-.1-.557 8.25 8.25 0 0 1 8-6.389 8.159 8.159 0 0 1 7.967 6.295.751.751 0 0 1-.54.887h-.068c-.04 0-.078.008-.111.008a.723.723 0 0 1-.713-.568 6.7 6.7 0 0 0-6.536-5.156 6.772 6.772 0 0 0-6.565 5.249.726.726 0 0 1-.713.574zM8.015 8.57A4.285 4.285 0 1 1 12.3 4.287 4.291 4.291 0 0 1 8.015 8.57zm0-7.1a2.816 2.816 0 1 0 2.817 2.816 2.823 2.823 0 0 0-2.817-2.815z"
        fill={color}
        transform="translate(4 3.623)"
      />
    </SVG>
  );
};

export default EditWorker;
