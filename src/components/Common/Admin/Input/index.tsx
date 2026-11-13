import React, { useCallback } from 'react';
import { type RegisterOptions, type UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
  error?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    background-color: ${({ theme }) => theme.adminColor.white};
    padding: 16px 20px 14px;
    color: ${({ theme }) => theme.adminColor.txt2};
    border-radius: 6px;
    font-size: ${({ theme }) => theme.fontSize.text_16};
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    line-height: 18px;
    &::placeholder {
      color: #949ca5;
    }
    &:focus {
      border: 1px solid #75869b;
    }
    &:read-only {
      cursor: pointer;
    }
  }
  &.icon {
    svg {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
  }
  &.error {
    input {
      border: 1px solid ${({ theme }) => theme.adminColor.point};
      box-shadow: 0px 0px 2px 3px rgba(255, 105, 105, 0.25);
    }
  }
  p {
    color: ${({ theme }) => theme.adminColor.txt1};
    margin-top: 8px;
    font-size: ${({ theme }) => theme.fontSize.text_12};
  }
`;

const Input: React.FC<IInput> = ({ type, name, register, options, error, className, placeholder, icon, ...props }) => {
  const { onChange } = register(name, options);
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (e.target.value) {
      e.target.style.border = '1px solid #75869b';
      return;
    }
    e.target.style.border = `1px solid ${theme.adminColor.line1}`;
  }, []);
  return (
    <InputWrapper className={classNames(className, { error, icon })}>
      <input id={name} type={type} {...register(name, options)} placeholder={placeholder} onChange={onInputChange} {...props} />
      {icon && icon}
      {error && <p>{error}</p>}
    </InputWrapper>
  );
};

export default Input;
