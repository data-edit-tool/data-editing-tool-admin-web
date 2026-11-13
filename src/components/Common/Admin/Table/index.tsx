import React from 'react';
import styled from 'styled-components';

const Container = styled.table`
  width: 100%;
  thead {
    background-color: #f4f5f8;
    tr {
      font-size: ${({ theme }) => theme.fontSize.text_16};
      color: #888888;
      font-weight: 500;
      height: 70px;
    }
  }
  th,
  td {
    vertical-align: middle;
    text-align: center;
    & > .check-wrapper {
      display: inline-block;
    }
  }
  tbody {
    background-color: ${({ theme }) => theme.adminColor.white};
    td {
      font-size: ${({ theme }) => theme.fontSize.text_16};
      color: ${({ theme }) => theme.adminColor.txt2};
      font-weight: 500;
      height: 70px;
    }
  }
`;

interface ITable {
  children: React.ReactNode;
}

const Table: React.FC<ITable> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Table;
