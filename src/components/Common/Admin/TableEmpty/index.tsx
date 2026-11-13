import React from 'react';
import styled from 'styled-components';

import Info from 'components/SVG/Icon/Info';

const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.adminColor.line1};
  border-bottom: 1px solid ${({ theme }) => theme.adminColor.line1};
  display: flex;
  width: 100%;
  align-items: center;
  height: 380px;
  justify-content: center;
  & > div {
    text-align: center;
  }
  .content {
    margin-top: 20px;
    text-align: center;
    color: ${({ theme }) => theme.adminColor.txt2};
    font-weight: 500;
    line-height: 20px;
  }
`;

interface ITableEmpty {
  children: React.ReactNode;
}

const TableEmpty: React.FC<ITableEmpty> = ({ children }) => {
  return (
    <Container>
      <div>
        <Info width="40" height="40" color="#dadde0" />
        <div className="content">{children}</div>
      </div>
    </Container>
  );
};

export default TableEmpty;
