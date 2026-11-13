import React from 'react';
import classNames from 'classnames';
import parse from 'html-react-parser';
import styled from 'styled-components';

import Button from 'components/Common/Admin/Button';

const Container = styled.div`
  .modal-main {
    z-index: 5002;
    position: fixed;
    width: 100%;
    max-width: 365px;
    padding: 40px 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.adminColor.white};
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 rgba(18, 44, 72, 0.15);
    .title {
      text-align: center;
      color: ${({ theme }) => theme.adminColor.txt2};
      font-weight: 700;
      font-size: ${({ theme }) => theme.fontSize.text_16};
    }
    .content {
      margin-top: 10px;
      color: ${({ theme }) => theme.adminColor.txt2};
      font-size: ${({ theme }) => theme.fontSize.text_16};
      text-align: center;
      line-height: 22px;
    }
    .btn-wrapper {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      &.confirm {
        button {
          &:first-child {
            margin-right: 10px;
          }
        }
      }
      button {
        width: 88px;
      }
    }
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.adminColor.black};
    opacity: 0.7;
    z-index: 5001;
  }
`;

interface IAlert {
  title: string;
  type?: 'alert' | 'confirm';
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Alert: React.FC<IAlert> = ({ title, type, content, onConfirm, onCancel }) => {
  return (
    <Container>
      <div className="overlay" onClick={onCancel} />
      <div className="modal-main">
        <div className="title">{title}</div>
        <div className="content">{content ? parse(content) : ''}</div>
        <div className={classNames('btn-wrapper', { confirm: type === 'confirm' })}>
          {type === 'confirm' && (
            <Button variant="outline" onClick={onCancel}>
              취소
            </Button>
          )}
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </Container>
  );
};

Alert.defaultProps = {
  type: 'alert',
};

export default Alert;
