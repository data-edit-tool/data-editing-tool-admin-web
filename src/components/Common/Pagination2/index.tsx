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
    margin-right: 16px;
    border: 1px solid #ececec;
    svg {
      transform: rotate(90deg);
    }
  }
  .next {
    margin-left: 16px;
    border: 1px solid #ececec;
    svg {
      transform: rotate(270deg);
    }
  }
  .range {
    display: flex;
    justify-content: center;
    gap: 4px;
    button {
      &.active {
        color: ${({ theme }) => theme.adminColor.white};
        border: #555;
        background-color: #555;
      }
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: #616161;
    font-size: ${({ theme }) => theme.fontSize.text_16};
    font-weight: 500;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.adminColor.white};
  }
`;

interface IPagination {
  totalPages: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination2: React.FC<IPagination> = ({ totalPages, onPageChange, currentPage }) => {
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

export default Pagination2;
