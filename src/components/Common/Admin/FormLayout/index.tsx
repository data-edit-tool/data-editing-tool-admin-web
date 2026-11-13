import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.adminColor.line1};
  padding: 30px;
  border-radius: 6px;
  & > ul {
    & > li {
      display: flex;
      padding-bottom: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.adminColor.line1};
      align-items: center;
      margin-bottom: 16px;
      .form-name {
        width: 255px;
        font-size: ${({ theme }) => theme.fontSize.text_16};
        color: ${({ theme }) => theme.adminColor.txt2};
        font-weight: 500;
        & > span {
          color: ${({ theme }) => theme.adminColor.txt1};
        }
      }
      .form-input,
      .form-textarea {
        width: 700px;
      }
      &:last-child {
        padding-bottom: 0px;
        border-bottom: 0px;
        margin-bottom: 0;
      }
    }
  }
`;

interface IFormLayout {
  children: React.ReactNode;
}

const FormLayout: React.FC<IFormLayout> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormLayout;
