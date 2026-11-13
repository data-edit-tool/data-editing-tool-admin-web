import React, { useCallback } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
  error?: string;
  className?: string;
  placeholder?: string;
}

const TextareaWrapper = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.adminColor.white};
    padding: 16px 20px;
    color: ${({ theme }) => theme.adminColor.txt2};
    border-radius: 6px;
    font-size: ${({ theme }) => theme.fontSize.text_16};
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    line-height: 18px;
    resize: none;
    &::placeholder {
      color: #949ca5;
    }
    &:focus {
      border: 1px solid #75869b;
    }
  }
  &.error {
    textarea {
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

const Textarea: React.FC<ITextarea> = ({ name, register, options, error, className, placeholder, ...props }) => {
  const { onChange } = register(name, options);
  const onTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    if (e.target.value) {
      e.target.style.border = '1px solid #75869b';
      return;
    }
    e.target.style.border = `1px solid ${theme.adminColor.line1}`;
  }, []);
  return (
    <TextareaWrapper className={classNames(className, { error })}>
      <textarea {...register(name, options)} className={className} placeholder={placeholder} onChange={onTextareaChange} {...props} />
      {error && <p>{error}</p>}
    </TextareaWrapper>
  );
};

export default Textarea;
