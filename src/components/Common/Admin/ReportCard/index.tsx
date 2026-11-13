import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const Container = styled.div`
  width: 420px;
  padding: 32px 40px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.adminColor.boxBorder};
  border-radius: 6px;
  align-items: center;
  .icon {
    width: 60px;
    height: 60px;
    display: flex;
    background-color: #e2eaff;
    border-radius: 50%;
    margin-right: 30px;
    &.workspace {
      background-color: rgba(62, 195, 161, 0.14);
    }
    &.folder {
      background-color: rgba(255, 170, 85, 0.14);
    }
    svg {
      margin: auto;
    }
  }
  .content {
    .title {
      color: #011111;
      font-size: ${({ theme }) => theme.fontSize.text_16};
    }
    .count {
      margin-top: 8px;
      color: #111;
      font-size: ${({ theme }) => theme.fontSize.text_24};
      font-weight: 700;
    }
  }
`;

interface IReportCard {
  icon: React.ReactNode;
  title: string;
  count: number;
  type?: string;
}

const ReportCard: React.FC<IReportCard> = ({ icon, title, count, type }) => {
  return (
    <Container>
      <div className={classNames('icon', { workspace: type === 'workspace', folder: type === 'folder' })}>{icon}</div>
      <div className="content">
        <div className="title">{title}</div>
        <div className="count">{count}</div>
      </div>
    </Container>
  );
};

ReportCard.defaultProps = {
  type: 'user',
};

export default ReportCard;
