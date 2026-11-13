import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import qs from 'qs';
import styled from 'styled-components';

import Arrow from 'components/SVG/Icon/Arrow';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .prev {
    margin-right: 20px;
    svg {
      transform: rotate(90deg);
    }
  }
  .next {
    margin-left: 20px;
    svg {
      transform: rotate(270deg);
    }
  }
  .range {
    display: flex;
    justify-content: center;
    button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
      &.active {
        color: ${({ theme }) => theme.adminColor.white};
        border: 1px solid ${({ theme }) => theme.adminColor.primary};
        background-color: ${({ theme }) => theme.adminColor.primary};
      }
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: #888888;
    font-size: ${({ theme }) => theme.fontSize.text_14};
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.adminColor.white};
  }
`;

interface IPagination {
  totalPages: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ totalPages, onPageChange, currentPage }) => {
  const { search } = useLocation();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const [selectPage, setSelectPage] = useState<number>(currentPage || (query as any).page || 1);

  useEffect(() => {
    // 쿼리 바뀔때 page 세팅
    setSelectPage(Number(currentPage || (query as any).page || 1));
  }, [search, currentPage, query]);

  // 페이지 범위 설정
  const range = () => {
    const start = Math.floor((selectPage - 1) / 5) * 5 + 1;
    const end = start + 4 > totalPages ? totalPages : start + 4;
    return [...Array(end - start + 1).keys()].map((i) => start + i);
  };

  // 페이지 그리기 (1~5)
  const renderPaginationLinks = () => {
    const pageRange = range();

    return pageRange.map((page) => (
      <button key={`page-${page}`} onClick={() => onPageChange(page)} className={classNames({ active: page === selectPage })}>
        {page}
      </button>
    ));
  };

  return (
    <Container>
      {selectPage > 1 && (
        <button className="prev" onClick={() => onPageChange(selectPage - 1)}>
          <Arrow width="20" height="20" color="#888888" />
        </button>
      )}
      <div className="range">{renderPaginationLinks()}</div>
      {selectPage < totalPages && (
        <button className="next" onClick={() => onPageChange(selectPage + 1)}>
          <Arrow width="20" height="20" color="#888888" />
        </button>
      )}
    </Container>
  );
};

export default Pagination;
