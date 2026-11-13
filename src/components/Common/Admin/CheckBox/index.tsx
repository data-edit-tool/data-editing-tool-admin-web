import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import Check from 'components/SVG/Icon/Check';

interface ICheckBox extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children?: React.ReactNode;
  checked: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &.self {
    .check-box {
      margin-right: 0;
    }
  }
  .check-box {
    width: 24px;
    height: 24px;
    position: relative;
    border: 1px solid #c3cbd8;
    background-color: #fafbfc;
    margin-right: 8px;
    &.checked {
      border: 1px solid ${({ theme }) => theme.adminColor.primary};
      background-color: ${({ theme }) => theme.adminColor.primary};
    }
    &.disabled {
      border: 1px solid ${({ theme }) => theme.adminColor.boxBorder};
      background-color: #f0f3f6;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  label {
    color: #5b636d;
    font-size: ${({ theme }) => theme.fontSize.text_16};
  }
`;

const CheckBox: React.FC<ICheckBox> = ({ name, checked, onClick, children, className, disabled, ...props }) => {
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <CheckBoxWrapper onClick={onCheckClick} className={classNames(className, { self: !children })} {...props}>
      <div className={classNames('check-box', { checked, disabled })}>{checked && <Check width="14" height="12" color={theme.adminColor.white} />}</div>
      {children && <label htmlFor={name}>{children}</label>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;
