import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import useClickAway from 'hooks/useClickAway';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { takeMonth } from 'utils/calendar';

import Button from 'components/Common/Admin/Button';
import Arrow from 'components/SVG/Icon/Arrow';

const Container = styled.div`
  width: 100%;
  padding: 38px 0 20px;
  box-shadow: 0 2px 8px 0 rgba(18, 44, 72, 0.15);
  border: 1px solid ${({ theme }) => theme.adminColor.line1};
  background-color: ${({ theme }) => theme.adminColor.white};
  border-radius: 10px;
  position: relative;
  z-index: 1;
  .arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      top: 0;
      left: 50%;
      /* box-shadow: 1px 1px 5px -2px rgba(0, 0, 0, 0.6); */
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
    }
  }
  .cal-header {
    display: flex;
    align-items: center;
    padding: 0px 33px;
    .prev {
      margin-right: 18px;
      &.disabled {
        background-color: ${({ theme }) => theme.adminColor.disabled} !important;
        cursor: not-allowed !important;
      }
    }
    .prev,
    .next {
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      border-radius: 6px;
      svg {
        transform: rotate(90deg);
      }
      &:hover {
        background-color: ${({ theme }) => theme.adminColor.hover};
      }
    }
    .next {
      margin-left: 18px;
      svg {
        transform: rotate(-90deg) !important;
      }
    }
    .month {
      .select {
        select {
          width: 68px;
          margin-right: 0;
        }
      }
    }
    .select {
      position: relative;
      cursor: pointer;
      select {
        width: 86px;
        cursor: pointer;
        padding: 7px 11px;
        font-size: ${({ theme }) => theme.fontSize.text_14};
        font-weight: 500;
        color: ${({ theme }) => theme.adminColor.txt2};
        margin-right: 2px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.adminColor.white};
        border: 0;
        outline: 0;
        &:hover {
          background-color: ${({ theme }) => theme.adminColor.hover};
        }
        &::-ms-expand {
          display: none;
        }
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
      }
      svg {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }
    }
  }
  .cal-body {
    padding: 0px 33px 30px;
    border-bottom: 1px solid ${({ theme }) => theme.adminColor.line1};
    ul {
      li {
        display: flex;
        font-size: ${({ theme }) => theme.fontSize.text_14};
        &.day {
          color: #949ca5;
        }
        & > span {
          display: flex;
          width: 36px;
          height: 36px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &.date {
            color: ${({ theme }) => theme.adminColor.txt2};
            &:hover {
              border-radius: 50%;
              background-color: ${({ theme }) => theme.adminColor.primary};
              opacity: 0.6;
              color: ${({ theme }) => theme.adminColor.white};
            }
          }
          &.selected {
            border-radius: 50%;
            background-color: ${({ theme }) => theme.adminColor.primary};
            color: ${({ theme }) => theme.adminColor.white};
          }
          &.disabled {
            cursor: not-allowed;
            background-color: ${({ theme }) => theme.adminColor.disabled};
            color: #949ca5;
            border-radius: 50%;
            &:hover {
              opacity: 1;
              background-color: ${({ theme }) => theme.adminColor.disabled};
            }
          }
        }
      }
    }
  }
  .cal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    padding: 0px 33px;
    button {
      width: 88px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;

// 연도 데이터 생성
const yearsArray = Array.from({ length: 2099 - 2021 + 1 }, (_, index) => {
  return {
    value: index + 2021,
    name: `${index + 2021}년`,
  };
});

// 월 데이터 생성
const monthsArray = Array.from({ length: 12 }, (_, index) => {
  return {
    value: index + 1,
    name: `${index + 1}월`,
  };
});

interface ICalendar {
  date?: Date | null;
  onCancel: () => void;
  onConfirm: (selectDay: Date | null) => void;
  name: string;
  startDate?: Date | null;
  endDate?: Date | null;
  type?: string;
}

const Calendar: React.FC<ICalendar> = ({ date, onCancel, onConfirm, name, startDate, endDate, type }) => {
  const [selectDate, setSelectDate] = useState(date || new Date());
  const [activeSelectDate, setActiveSelectDate] = useState<Date | null>(date ?? null);
  const [dayList, setDayList] = useState(takeMonth(selectDate)());
  const [selectYear, setSelectYear] = useState(format(selectDate, 'yyyy'));
  const [selectMonth, setSelectMonth] = useState(format(selectDate, 'M'));

  // 날짜컴포던트 다른곳 클릭시 닫힘
  const outsideRef: RefObject<HTMLDivElement> = useClickAway((e: MouseEvent | TouchEvent) => {
    if ((typeof (e.target as HTMLDivElement).className === 'string' && (e.target as HTMLDivElement).id) !== name) {
      onCancel();
    }
  });

  const handlePrevDate = () => {
    // 선택된 날짜가 같은날이면 세팅 하지 않음 (검색이 아닐경우에만)
    if (type !== 'search' && format(new Date(), 'yyyyMM') === format(selectDate, 'yyyyMM')) {
      return;
    }
    const prevDate = new Date(selectDate);
    prevDate.setMonth(prevDate.getMonth() - 1);
    setSelectDate(prevDate);
    setDayList(takeMonth(prevDate)());
    setSelectYear(format(prevDate, 'yyyy'));
    setSelectMonth(format(prevDate, 'M'));
  };

  // 다음달 이동
  const handleNextDate = () => {
    const nextDate = new Date(selectDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    setSelectDate(nextDate);
    setDayList(takeMonth(nextDate)());
    setSelectYear(format(nextDate, 'yyyy'));
    setSelectMonth(format(nextDate, 'M'));
  };

  // 날짜 선택
  const onSelectDate = (selectDay: Date, disabled: boolean) => {
    if (disabled) {
      return;
    }
    // 선택된 날짜랑 같은날이면 선택 해제
    if (activeSelectDate && format(activeSelectDate, 'yyyyMMdd') === format(selectDay, 'yyyyMMdd')) {
      setActiveSelectDate(null);
      return;
    }
    setActiveSelectDate(selectDay);
  };

  // 날짜 선택 완료
  const onSubmit = () => {
    onConfirm(activeSelectDate);
  };

  // 연도 선택
  const handleSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
    const newDate = new Date(selectDate);
    newDate.setFullYear(Number(e.target.value));
    setSelectDate(newDate);
    setDayList(takeMonth(newDate)());
  };

  // 달 선택
  const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectMonth(e.target.value);
    const newDate = new Date(selectDate);
    newDate.setMonth(Number(e.target.value) - 1);
    setSelectDate(newDate);
    setDayList(takeMonth(newDate)());
  };

  return (
    <Container ref={outsideRef}>
      <div className="arrow" />
      <div className="cal-header">
        <div
          className={classNames('prev', { disabled: type !== 'search' && format(new Date(), 'yyyyMM') === format(selectDate, 'yyyyMM') })}
          onClick={handlePrevDate}
        >
          <Arrow width="20" height="20" color={format(new Date(), 'yyyyMM') === format(selectDate, 'yyyyMM') ? '#949ca5' : '#888888'} />
        </div>
        <div className="year">
          <label htmlFor="year" className="select">
            <select name="year" id="year" value={selectYear} onChange={handleSelectYear}>
              {yearsArray.map((year, index) => (
                <option key={`year-${index}`} value={year.value}>
                  {year.name}
                </option>
              ))}
            </select>
            <Arrow width="10" height="10" color={theme.adminColor.txt2} />
          </label>
        </div>
        <div className="month">
          <label htmlFor="month" className="select">
            <select name="month" id="month" value={selectMonth} onChange={handleSelectMonth}>
              {monthsArray.map((month, index) => (
                <option key={`month-${index}`} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
            <Arrow width="10" height="10" color={theme.adminColor.txt2} />
          </label>
        </div>
        <div className={classNames('next')} onClick={handleNextDate}>
          <Arrow width="20" height="20" color="#888888" />
        </div>
      </div>
      <div className="cal-body">
        <ul>
          <li className="day">
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span>토</span>
            <span>일</span>
          </li>
          {dayList.map((week, index) => (
            <li key={index}>
              {week.map((day, index) => {
                if (format(selectDate, 'MM') !== format(day, 'MM')) {
                  return <span key={index} />;
                }
                return (
                  <span
                    className={classNames({
                      disabled:
                        (type !== 'search' && format(new Date(), 'yyyyMMdd') > format(day, 'yyyyMMdd')) ||
                        (startDate ? format(startDate, 'yyyyMMdd') > format(day, 'yyyyMMdd') : false) ||
                        (endDate ? format(endDate, 'yyyyMMdd') < format(day, 'yyyyMMdd') : false),
                      date: format(selectDate, 'MM') === format(day, 'MM'),
                      selected: activeSelectDate ? format(activeSelectDate, 'yyyyMMdd') === format(day, 'yyyyMMdd') : false,
                    })}
                    key={index}
                    onClick={() =>
                      onSelectDate(
                        day,
                        (type !== 'search' && format(new Date(), 'yyyyMMdd') > format(day, 'yyyyMMdd')) ||
                          (startDate ? format(startDate, 'yyyyMMdd') > format(day, 'yyyyMMdd') : false) ||
                          (endDate ? format(endDate, 'yyyyMMdd') < format(day, 'yyyyMMdd') : false),
                      )
                    }
                  >
                    {Number(format(day, 'dd'))}
                  </span>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
      <div className="cal-footer">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="button" variant="primary" onClick={onSubmit}>
          확인
        </Button>
      </div>
    </Container>
  );
};

export default Calendar;
