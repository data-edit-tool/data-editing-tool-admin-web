import React, { useState } from 'react';
import classNames from 'classnames';
import useClickAway from 'hooks/useClickAway';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IOption } from 'types/interface';

import Arrow from 'components/SVG/Icon/Arrow';

const Container = styled.div`
  position: relative;
  .select {
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.adminColor.line1};
    font-size: ${({ theme }) => theme.fontSize.text_16};
    color: ${({ theme }) => theme.adminColor.txt2};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.adminColor.white};
    line-height: 18px;
    cursor: pointer;
    &.open {
      border: 1px solid #75869b;
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      svg {
        transform: rotate(180deg);
      }
    }
    &.placeholder {
      color: #949ca5 !important;
    }
  }
  ul {
    background-color: ${({ theme }) => theme.adminColor.white};
    position: absolute;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid #75869b;
    width: 100%;
    top: 46px;
    left: 0;
    z-index: 1;
    li {
      padding: 15px 20px;
      cursor: pointer;
      color: ${({ theme }) => theme.adminColor.txt2};
      font-size: ${({ theme }) => theme.fontSize.text_16};
      &:hover {
        background-color: ${({ theme }) => theme.adminColor.primary};
        color: ${({ theme }) => theme.adminColor.white};
      }
    }
  }
`;

interface ISelect {
  className: string;
  list: IOption[];
  selectOption: IOption | null;
  onClick?: (item: IOption) => void;
  placeholderText: string;
}

const Select: React.FC<ISelect> = ({ className, list, selectOption, onClick, placeholderText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useClickAway(() => {
    setIsOpen(false);
  });

  const handleOpen = () => {
    if (list.length) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectItem: IOption) => {
    e.stopPropagation();
    setIsOpen(false);
    if (onClick) {
      onClick(selectItem);
    }
  };

  return (
    <Container className={className} ref={ref}>
      <div onClick={handleOpen} className={classNames('select', { open: isOpen, placeholder: !selectOption })}>
        {selectOption ? selectOption.name : placeholderText}
        <Arrow width="16" height="16" color={theme.adminColor.txt2} />
      </div>
      {isOpen && (
        <ul>
          {list.map((item) => (
            <li key={`select-item-${item.value}`} onClick={(e) => handleOptionClick(e, item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Select;
