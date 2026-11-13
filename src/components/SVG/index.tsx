import { type SVGProps } from 'react';

export interface ISVG extends SVGProps<SVGSVGElement> {
  width: string;
  height: string;
  color?: string;
}

const SVG = ({ width, height, color, children, ...rest }: ISVG) => {
  return (
    <svg width={width} height={height} color={color} {...rest}>
      {children}
    </svg>
  );
};

SVG.defaultProps = {
  width: '30',
  height: '30',
  color: 'none',
};

export default SVG;
