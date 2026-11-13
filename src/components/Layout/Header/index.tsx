import React from 'react';
import styled from 'styled-components';

import NaviArrow from 'components/SVG/Icon/NaviArrow';
import NaviHome from 'components/SVG/Icon/NaviHome';

const Container = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.adminColor.white};
  padding: 26px 40px 26px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.adminColor.line2};
  .navi-home {
    margin-right: 5px;
  }
  span {
    color: #5b636d;
    font-size: ${({ theme }) => theme.fontSize.text_14};
  }
  .arrow {
    margin: 0px 5px;
  }
  b {
    color: #5b636d;
    font-size: ${({ theme }) => theme.fontSize.text_14};
    font-weight: 700;
  }
`;

interface IHeader {
  children: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <Container>
      <NaviHome width="12" height="12" color="#5b636d" className="navi-home" />
      <span>maumDATA</span>
      <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
      {children}
    </Container>
  );
};

export default Header;
