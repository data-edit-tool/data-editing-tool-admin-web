import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';

import Back from 'components/SVG/Icon/Back';

const Container = styled.h1`
  padding-bottom: 16px;
  width: 100%;
  border-bottom: 1px solid #5b636d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.type {
    width: 1600px;
  }
  .title {
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
      cursor: pointer;
    }
    span {
      font-size: ${({ theme }) => theme.fontSize.text_24};
      font-weight: 500;
      color: #111;
    }
  }
`;

interface ITitle {
  title: string;
  button?: React.ReactNode;
  className?: string;
  backUrl?: string;
  onBack?: () => void;
  type?: string;
}

const Title: React.FC<ITitle> = ({ title, button, className, backUrl, type, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
      return;
    }
    if (backUrl) {
      navigate(backUrl);
    }
  };

  return (
    <Container className={classNames(className, { type: type === 'user' })}>
      <div className="title">
        {backUrl && <Back width="30" height="30" color="#111" onClick={handleBack} />}
        {onBack && <Back width="30" height="30" color="#111" onClick={onBack} />}
        <span>{title}</span>
      </div>
      {button && <div>{button}</div>}
    </Container>
  );
};

export default Title;
