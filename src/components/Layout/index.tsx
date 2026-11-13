import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import Footer from 'components/Layout/Footer';
import Sidebar from 'components/Layout/Sidebar';

const Container = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.adminColor.white};
  &.user {
    background-color: #f4f6f8;
  }
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    overflow-x: auto;
    min-width: 1065px;
  }
`;

interface ILayout {
  children: React.ReactNode;
  type?: string;
}

const Layout = ({ children, type }: ILayout) => {
  return (
    <Container className={classNames({ user: type === 'user' })}>
      <Sidebar />
      <main>
        {children}
        <Footer />
      </main>
    </Container>
  );
};

export default Layout;
