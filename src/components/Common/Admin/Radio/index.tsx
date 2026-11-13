import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface IRadio extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children?: React.ReactNode;
  checked: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &.self {
    .check-box {
      margin-right: 0;
    }
  }
  .check-box {
    width: 20px;
    height: 20px;
    position: relative;
    border: 1px solid #c3cbd8;
    border-radius: 50%;
    background-color: #fafbfc;
    margin-right: 8px;
    &.checked {
      border: 1px solid #4262ff;
    }
    &.disabled {
      border: 1px solid ${({ theme }) => theme.adminColor.boxBorder};
      background-color: #f0f3f6;
    }
    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background-color: #4262ff;
      border-radius: 50%;
    }
  }
  label {
    color: #5b636d;
    font-size: ${({ theme }) => theme.fontSize.text_16};
  }
`;

const Radio: React.FC<IRadio> = ({ name, checked, onClick, children, className, disabled, ...props }) => {
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <RadioWrapper onClick={onCheckClick} className={classNames(className, { self: !children })} {...props}>
      <div className={classNames('check-box', { checked, disabled })}>{checked && <div className="circle" />}</div>
      {children && <label htmlFor={name}>{children}</label>}
    </RadioWrapper>
  );
};

export default Radio;
