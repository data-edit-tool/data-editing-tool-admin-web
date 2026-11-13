import React, { RefObject, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserManagementActions } from 'actions/user-management-action';
import classNames from 'classnames';
import { format } from 'date-fns';
import useClickAway from 'hooks/useClickAway';
import qs from 'qs';
import { useRecoilValue } from 'recoil';
import { userManagementAtom } from 'state/user-management';
import { workspaceCodeUserCategoryListSelector } from 'state/workspace-code';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IAlert, IOption } from 'types/interface';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import CheckBox from 'components/Common/Admin/CheckBox';
import Input from 'components/Common/Admin/Input';
import ReportCard from 'components/Common/Admin/ReportCard';
import Select from 'components/Common/Admin/Select';
import Table from 'components/Common/Admin/Table';
import TableEmpty from 'components/Common/Admin/TableEmpty';
import Title from 'components/Common/Admin/Title';
import Pagination from 'components/Common/Pagination';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import CalendarModal from 'components/Modal/Calendar';
import Calendar from 'components/SVG/Icon/Calendar';
import Member from 'components/SVG/Icon/Member';
import More from 'components/SVG/Icon/More';
import PasswordChange from 'components/SVG/Icon/PasswordChange';
import Plus from 'components/SVG/Icon/Plus';
import Reset from 'components/SVG/Icon/Reset';

const Container = styled.section`
  padding: 34px 40px 40px;
  .report-wrapper {
    margin-top: 30px;
  }
  .title-box {
    button {
      width: 151px;
    }
  }
  .sub-title {
    margin-top: 40px;
    font-size: ${({ theme }) => theme.fontSize.text_20};
    font-weight: 500;
    color: #111111;
  }
  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    background-color: #f4f6f8;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.adminColor.boxBorder};
    padding: 20px 0px;
    .calender {
      width: 160px;
      margin-right: 10px;
      position: relative;
      .form-input-calender {
        input {
          line-height: 18px;
        }
        &.valid {
          input {
            border: 1px solid #75869b;
          }
        }
      }
      .modal-calender {
        position: absolute;
        top: 65px;
        right: -132px;
      }
    }
    .search-select {
      width: 160px;
      & > div {
        border-top-left-radius: 6px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 6px;
      }
    }

    .name-input {
      width: 260px;
      input {
        border-top-left-radius: 0px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 0px;
        border-left: 0px !important;
      }
    }
    .reset-btn {
      width: 50px;
      height: 50px;
      margin-left: 30px;
      svg {
        margin-right: 0;
      }
    }
    .search-btn {
      width: 88px;
      margin-left: 10px;
    }
  }
  .search-result {
    margin: 46px 0px 25px;
    font-size: 15px;
    color: #111111;
    display: flex;
    justify-content: space-between;
    span {
      color: ${({ theme }) => theme.adminColor.primary};
    }
    button {
      width: 44px;
    }
  }
  .table {
    tr {
      td,
      th {
        &:nth-child(1) {
          width: 60px;
        }
        &:nth-child(2) {
          width: 50px;
        }
        &:nth-child(3) {
          width: 380px;
        }
        &:nth-child(4) {
          width: 380px;
        }
        &:nth-child(5) {
          width: 380px;
        }
        &:nth-child(6) {
          width: 300px;
        }
        &:nth-child(7) {
          width: 50px;
        }
      }
    }
    .more-wrapper {
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${({ theme }) => theme.adminColor.hover};
      }
      .password-reset {
        position: absolute;
        width: 144px;
        top: 34px;
        right: 0px;
        border-radius: 6px;
        padding: 8px;
        border: 1px solid ${({ theme }) => theme.adminColor.line1};
        background-color: ${({ theme }) => theme.adminColor.white};
        box-shadow: 0 2px 8px 0 rgba(18, 44, 72, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          margin-right: 4px;
        }
        span {
          font-size: ${({ theme }) => theme.fontSize.text_14};
          color: ${({ theme }) => theme.adminColor.txt2};
          font-weight: 500;
        }
      }
    }
  }
  .pagination {
    margin-top: 40px;
    padding-bottom: 100px;
  }
`;

interface IForm {
  query: string;
  startDate: string | null;
  endDate: string | null;
  filter: IOption;
}

const ManagementUser: React.FC = () => {
  const { search } = useLocation();
  const navigation = useNavigate();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { list, passwordReset, userDelete, userReset, userSearchCategory } = useUserManagementActions();
  const userManagement = useRecoilValue(userManagementAtom);
  const userCategoryCode = useRecoilValue(workspaceCodeUserCategoryListSelector);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [checkList, setCheckList] = useState<string[]>([]); // 체크박스 체크된 리스트
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const [calendarType, setCalendarType] = useState<string>('');
  const ref: RefObject<HTMLDivElement> = useClickAway((e: MouseEvent | TouchEvent) => {
    if (typeof (e.target as HTMLDivElement).className === 'string') {
      if (!(e.target as HTMLDivElement).className.includes('primary')) {
        setSelectedUserId('');
      }
    }
  });
  const { register, setValue, watch, reset, handleSubmit } = useForm<IForm>({
    defaultValues: {
      query: query.query ? String(query.query) : '',
      filter: query.filter ? userCategoryCode.find((item) => item.value === query.filter) : userCategoryCode[0],
      startDate: query.start_date ? String(query.start_date) : null,
      endDate: query.end_date ? String(query.end_date) : null,
    },
  });

  useEffect(() => {
    // 사용자 카테고리 코드를 불러와있으면 호출 금지(불필요한 호출 제거)
    if (!userCategoryCode.length) {
      onUserCategory();
    }
  }, []);

  useEffect(() => {
    return () => {
      userReset();
    };
  }, []);

  useEffect(() => {
    // 사용자 카테고리 코드가 있어야 초기 검색때 설정값 보낼수있음
    if (userCategoryCode.length) {
      onList();
    }
  }, [search, userCategoryCode]);

  // 사용자 카테고리 코드 조회
  const onUserCategory = async () => {
    try {
      await userSearchCategory();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '사용자 카테고리 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  // 사용자 조회
  const onList = async () => {
    try {
      const queryData = {
        page: query.page ? Number(query.page) : 1,
        filter: query.filter ? String(query.filter) : 'account',
        query: query.query ? String(query.query) : '',
        startDate: query.start_date ? String(query.start_date) : '',
        endDate: query.end_date ? String(query.end_date) : '',
      };
      // filter가 없는 경우 기본값으로 사용자 카테고리코드 첫번째로 설정
      reset({
        query: query.query ? String(query.query) : '',
        filter: query.filter ? userCategoryCode.find((item) => item.value === query.filter) : userCategoryCode[0],
        startDate: query.start_date ? String(query.start_date) : null,
        endDate: query.end_date ? String(query.end_date) : null,
      });
      await list(queryData);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '사용자 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  const handleSearchFilter = (option: IOption) => {
    setValue('filter', option);
  };

  // 페이지 이동
  const onPageChange = (page: number) => {
    const newQuery = { ...query, page };
    navigation(`${PATH_ADMIN_LIST.USER_MANAGEMENT}?${qs.stringify(newQuery)}`);
  };

  // 검색
  const onSubmit = handleSubmit(({ filter, query, startDate, endDate }) => {
    const queryData = {
      filter: filter.value,
    } as {
      filter: string;
      query?: string;
      start_date?: string;
      end_date?: string;
    };
    if (query) {
      queryData.query = query;
    }
    if (startDate) {
      queryData.start_date = startDate;
    }
    if (endDate) {
      queryData.end_date = endDate;
    }
    navigation(`${PATH_ADMIN_LIST.USER_MANAGEMENT}?${qs.stringify(queryData)}`);
  });

  const handleReset = () => {
    reset({
      query: '',
      filter: userCategoryCode[0],
      startDate: null,
      endDate: null,
    });
  };

  const handlePasswordReset = (userId: string) => {
    setSelectedUserId((prev) => (prev === userId ? '' : userId));
  };

  const handlePasswordResetOpen = () => {
    onAlertSetting(true, '비밀번호 초기화', '초기 비밀번호로 변경하시겠습니까?', 'password-reset', 'confirm');
  };

  const onConfirm = async () => {
    const { type } = isAlert;
    // 얼럿창에서 비밀번호 초기화인지 삭제인지 체크
    if (type === 'password-reset') {
      try {
        await passwordReset(selectedUserId);
        onAlertSetting(true, '초기화 알림', '초기화를 하였습니다.', '', 'alert');
      } catch (err) {
        onAlertSetting(true, '초기화 불가 알림', `${isCustomError(err) && err?.message ? err.message : '비밀번호 초기화에 실패하였습니다'}`, '', 'alert');
      }
      return;
    } else if (type === 'delete') {
      try {
        await userDelete(checkList);
        onAlertSetting(true, '삭제 완료 알림', '삭제가 완료되었습니다', '', 'alert');
        setCheckList([]);
      } catch (err) {
        onAlertSetting(true, '삭제 불가 알림', `${isCustomError(err) && err?.message ? err.message : '사용자 삭제에 실패하였습니다'}`, '', 'alert');
      }
      return;
    }
    onCancel();
  };

  const onCancel = () => {
    onAlertSetting(false, '', '', '', 'alert');
  };

  // 체크박스 클릭시
  const handleCheck = (userId: string) => {
    if (userId === 'all') {
      if (checkList.length === userManagement.list.length) {
        setCheckList([]);
        return;
      }
      const newCheckList = userManagement.list.map((item) => item.user_id);
      setCheckList(newCheckList);
      return;
    }
    if (checkList.includes(userId)) {
      const newCheckList = checkList.filter((item) => item !== userId);
      setCheckList(newCheckList);
      return;
    }
    const newCheckList = [...checkList, userId];
    setCheckList(newCheckList);
  };

  const handleDeleteOpen = () => {
    onAlertSetting(true, '알림', `${checkList.length}명의 사용자를 삭제하시겠습니까?`, 'delete', 'confirm');
  };

  const onAlertSetting = (open: boolean, title: string, content: string, type: string, alertType: 'alert' | 'confirm') => {
    setIsAlert({
      open,
      title,
      content,
      type,
      alertType,
    });
  };

  const onCalendarConfirm = (type: 'startDate' | 'endDate', date: Date | null) => {
    setValue(type, date ? format(date, 'yyyy-MM-dd') : null, { shouldValidate: true });
    setCalendarType('');
  };

  const onCalendarCancel = () => {
    setCalendarType('');
  };

  const handleCalendarOpen = (type: string) => {
    setCalendarType((prev) => (prev === type ? '' : type));
  };

  return (
    <Layout>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type={isAlert.alertType} content={isAlert.content} onConfirm={onConfirm} onCancel={onCancel} />
        </ModalContainer>
      )}
      <Header>
        <b>사용자 관리</b>
      </Header>
      <Container>
        <Title
          className="title-box"
          title="사용자 관리"
          button={
            <>
              <Link to={PATH_ADMIN_LIST.USER_MANAGEMENT_REGISTER}>
                <Button variant="secondary">
                  <Plus width="12" height="12" color={theme.adminColor.white} />
                  사용자추가
                </Button>
              </Link>
            </>
          }
        />
        <div className="report-wrapper">
          <ReportCard
            icon={<Member width="30" height="30" color={theme.adminColor.primary} />}
            title="전체 사용자 현황"
            count={userManagement.memberCount || 0}
          />
        </div>
        <div className="sub-title">사용자 조회</div>
        <form onSubmit={onSubmit}>
          <div className="search-box">
            <div className="calender">
              <Input
                register={register}
                type="text"
                name="startDate"
                className={classNames('form-input-calender', { valid: calendarType === 'startDate' || watch('startDate') })}
                placeholder="시작일"
                icon={<Calendar width="16" height="16" color={theme.adminColor.txt2} onClick={() => handleCalendarOpen('startDate')} />}
                readOnly
                onClick={() => handleCalendarOpen('startDate')}
              />
              {calendarType === 'startDate' && (
                <div className="modal-calender">
                  <CalendarModal
                    date={watch('startDate') ? new Date(watch('startDate') as string) : null}
                    onConfirm={(date: Date | null) => onCalendarConfirm('startDate', date)}
                    onCancel={onCalendarCancel}
                    name="startDate"
                    endDate={watch('endDate') ? new Date(watch('endDate') as string) : null}
                    type="search"
                  />
                </div>
              )}
            </div>
            <div className="calender">
              <Input
                register={register}
                type="text"
                name="endDate"
                className={classNames('form-input-calender', { valid: calendarType === 'endDate' || watch('endDate') })}
                placeholder="종료일"
                icon={<Calendar width="16" height="16" color={theme.adminColor.txt2} onClick={() => handleCalendarOpen('endDate')} />}
                readOnly
                onClick={() => handleCalendarOpen('endDate')}
              />
              {calendarType === 'endDate' && (
                <div className="modal-calender">
                  <CalendarModal
                    date={watch('endDate') ? new Date(watch('endDate') as string) : null}
                    onConfirm={(date: Date | null) => onCalendarConfirm('endDate', date)}
                    onCancel={onCalendarCancel}
                    name="endDate"
                    startDate={watch('startDate') ? new Date(watch('startDate') as string) : null}
                    type="search"
                  />
                </div>
              )}
            </div>
            <Select
              className="search-select"
              list={userCategoryCode}
              onClick={handleSearchFilter}
              selectOption={watch('filter')}
              placeholderText="검색어 전체"
            />
            <Input register={register} type="text" name="query" className="name-input" placeholder="검색어를 입력해주세요" />
            <Button variant="outline" className="reset-btn" onClick={handleReset}>
              <Reset width="20" height="20" color="#aaa" />
            </Button>
            <Button className="search-btn" type="submit">
              검색
            </Button>
          </div>
        </form>
        <div className="search-result">
          <div>
            <span>{userManagement.resultCount || 0}</span>
            건의 검색결과가 있습니다.
          </div>
          {userManagement.list.length && (
            <Button variant="outline" size="s" disabled={!checkList.length} onClick={handleDeleteOpen}>
              삭제
            </Button>
          )}
        </div>
        {userManagement.isLoading ? null : userManagement.list.length ? (
          <div className="table">
            <Table>
              <thead>
                <tr>
                  <th>
                    <CheckBox
                      name="all"
                      checked={checkList.length === userManagement.list.length}
                      className="check-wrapper"
                      onClick={() => handleCheck('all')}
                    />
                  </th>
                  <th>No</th>
                  <th>ID</th>
                  <th>비밀번호 변경 유무</th>
                  <th>사용자 설명</th>
                  <th>생성일자</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userManagement.list.map((item, index) => (
                  <tr key={`table-${item.user_id}`}>
                    <td>
                      <CheckBox name="all" checked={checkList.includes(item.user_id)} className="check-wrapper" onClick={() => handleCheck(item.user_id)} />
                    </td>
                    <td>{userManagement.resultCount ? (userManagement.resultCount || 0) - ((query?.page ? Number(query.page) : 1) - 1) * 10 - index : null}</td>
                    <td>{item.account}</td>
                    <td>{item.is_pw_changed ? 'Y' : 'N'}</td>
                    <td>{item.desc}</td>
                    <td>{item.created}</td>
                    <td>
                      {item.is_pw_changed && (
                        <div className="more-wrapper">
                          <More width="30" height="30" color="#949ca5" onClick={() => handlePasswordReset(item.user_id)} />
                          {selectedUserId === item.user_id && (
                            <div className="password-reset" onClick={handlePasswordResetOpen} ref={ref}>
                              <PasswordChange width="24" height="24" color="#022222;" />
                              <span>비밀번호 초기화</span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="table-empty">
            <TableEmpty>
              사용자가 없습니다.
              <br />
              사용자를 추가해주세요.
            </TableEmpty>
          </div>
        )}
        {!userManagement.isLoading && userManagement.totalPage !== 1 && (
          <div className="pagination">
            <Pagination totalPages={userManagement.totalPage || 0} onPageChange={onPageChange} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default ManagementUser;
