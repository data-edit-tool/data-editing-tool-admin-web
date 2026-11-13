import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 's' | 'm';
  fontWeight?: 'bold' | 'normal';
}

const ButtonWrapper = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 16px 0px;
  background-color: ${({ theme }) => theme.adminColor.primary};
  color: ${({ theme }) => theme.adminColor.white};
  font-size: ${({ theme }) => theme.fontSize.text_16};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.adminColor.primary};
  line-height: 16px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 6px;
  }
  &.normal {
    font-weight: 500 !important;
  }
  &.s {
    padding: 6px 0px;
    font-size: ${({ theme }) => theme.fontSize.text_14};
    border-radius: 4px;
    font-weight: 500;
  }
  &:hover {
    background-color: #2a358b;
    border: 1px solid #2a358b;
  }
  &:disabled {
    background-color: #f4f5f8 !important;
    border: 1px solid ${({ theme }) => theme.adminColor.line1} !important;
    color: #949ca5 !important;
    cursor: not-allowed !important;
  }
  &.outline {
    background-color: ${({ theme }) => theme.adminColor.white};
    color: ${({ theme }) => theme.adminColor.txt2};
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    &:hover {
      background-color: ${({ theme }) => theme.adminColor.hover};
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
    }
  }
  &.secondary {
    background-color: ${({ theme }) => theme.adminColor.secondary};
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    &:hover {
      background-color: #555555;
      border: 1px solid #555555;
    }
  }
`;

const Button: React.FC<IButton> = ({ children, type, variant, className, onClick, fontWeight, ...props }) => {
  return (
    <ButtonWrapper
      className={classNames(className, {
        primary: variant === 'primary',
        outline: variant === 'outline',
        secondary: variant === 'secondary',
        s: props.size === 's',
        normal: fontWeight === 'normal',
      })}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  type: 'button',
  className: '',
  variant: 'primary',
  size: 'm',
  fontWeight: 'bold',
};

export default Button;
