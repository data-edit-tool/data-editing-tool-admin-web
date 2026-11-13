import styled from 'styled-components';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 240px);
  padding: 12px 0;
  background-color: #f4f6f8;
  text-align: center;
  color: #949ca5;
  font-size: ${({ theme }) => theme.fontSize.text_14};
`;

const Footer = () => {
  return <Container>© MAUM.AI. All rights reserved.</Container>;
};

export default Footer;
