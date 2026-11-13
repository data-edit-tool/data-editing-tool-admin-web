import React, { RefObject, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWorkspaceCodeActions } from 'actions/workspace-code-action';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import classNames from 'classnames';
import { format } from 'date-fns';
import useClickAway from 'hooks/useClickAway';
import qs from 'qs';
import { useRecoilValue } from 'recoil';
import { workspaceCodeCategoryCodeListSelector, workspaceCodeStatusCodeListSelector } from 'state/workspace-code';
import { workspaceManagementAtom } from 'state/workspace-management';
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
import Edit from 'components/SVG/Icon/Edit';
import EditWorker from 'components/SVG/Icon/EditWorker';
import More from 'components/SVG/Icon/More';
import Plus from 'components/SVG/Icon/Plus';
import Reset from 'components/SVG/Icon/Reset';
import Workspace from 'components/SVG/Icon/Workspace';

const Container = styled.section`
  padding: 34px 40px 40px;
  .report-wrapper {
    margin-top: 30px;
  }
  .title-box {
    button {
      width: 210px;
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
    .status-select {
      width: 213px;
      margin-right: 10px;
    }
    .search-select {
      width: 191px;
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
        border-left: 0px;
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
      &.list {
        cursor: pointer;
        &:hover {
          background-color: ${({ theme }) => theme.adminColor.hover};
        }
      }
      td,
      th {
        &:nth-child(1) {
          width: 60px;
        }
        &:nth-child(2) {
          width: 50px;
        }
        &:nth-child(3) {
          width: 220px;
        }
        &:nth-child(4) {
          width: 380px;
        }
        &:nth-child(5) {
          width: 100px;
        }
        &:nth-child(6) {
          width: 100px;
        }
        &:nth-child(7) {
          width: 100px;
        }
        &:nth-child(8) {
          width: 100px;
        }
        &:nth-child(9) {
          width: 100px;
        }
        &:nth-child(10) {
          width: 100px;
          line-height: 20px;
        }
        &:nth-child(11) {
          width: 120px;
        }
        &:nth-child(12) {
          width: 120px;
        }
        &:nth-child(13) {
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
      &.active {
        background-color: ${({ theme }) => theme.adminColor.hover};
      }
      .more-option {
        position: absolute;
        width: 148px;
        top: 34px;
        right: 0px;
        z-index: 1;
        border-radius: 6px;
        border: 1px solid ${({ theme }) => theme.adminColor.line1};
        background-color: ${({ theme }) => theme.adminColor.white};
        box-shadow: 0 2px 8px 0 rgba(18, 44, 72, 0.15);
        ul {
          li {
            a {
              display: flex;
              align-items: center;
              padding: 8px 14px;
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
  status: IOption | null;
  filter: IOption;
  startDate: string | null;
  endDate: string | null;
}

const ManagementWorkspace = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { list, workspaceDelete, workspaceDetailReset } = useWorkspaceManagementActions();
  const workspaceManagement = useRecoilValue(workspaceManagementAtom);
  const workspaceStatus = useRecoilValue(workspaceCodeStatusCodeListSelector);
  const workspaceCategory = useRecoilValue(workspaceCodeCategoryCodeListSelector);
  const { workspaceStatusList, workspaceCategoryList } = useWorkspaceCodeActions();
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('');

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
      setSelectedWorkspaceId('');
    }
  });

  const { register, setValue, watch, reset, handleSubmit } = useForm<IForm>({
    defaultValues: {
      query: query.query ? String(query.query) : '',
      status: query.status ? workspaceStatus.find((item) => item.value === query.status) : workspaceStatus[0],
      filter: query.filter ? workspaceCategory.find((item) => item.value === query.filter) : workspaceCategory[0],
      startDate: query.start_date ? String(query.start_date) : null,
      endDate: query.end_date ? String(query.end_date) : null,
    },
  });

  useEffect(() => {
    // 해당 데이터가 있을 경우 리스트 조회
    if (workspaceStatus.length && workspaceCategory.length) {
      onList();
    }
  }, [search, workspaceStatus.length, workspaceCategory.length]);

  useEffect(() => {
    // 검색 필터들 조회
    if (!workspaceStatus.length) {
      onWorkspaceStatusList();
    }
    if (!workspaceCategory.length) {
      onWorkspaceCategoryList();
    }
    return () => {
      workspaceDetailReset();
    };
  }, []);

  const onWorkspaceCategoryList = async () => {
    try {
      await workspaceCategoryList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 카테고리 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  const onWorkspaceStatusList = async () => {
    try {
      await workspaceStatusList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 상태 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  // 리스트 조회
  const onList = async () => {
    try {
      const queryData = {
        page: query.page ? Number(query.page) : 1,
        status: query.status ? String(query.status) : workspaceStatus[0].value,
        filter: query.filter ? String(query.filter) : workspaceCategory[0].value,
        query: query.query ? String(query.query) : '',
        startDate: query.start_date ? String(query.start_date) : '',
        endDate: query.end_date ? String(query.end_date) : '',
      };
      reset({
        query: query.query ? String(query.query) : '',
        status: query.status ? workspaceStatus.find((item) => item.value === query.status) : workspaceStatus[0],
        filter: query.filter ? workspaceCategory.find((item) => item.value === query.filter) : workspaceCategory[0],
        startDate: query.start_date ? String(query.start_date) : null,
        endDate: query.end_date ? String(query.end_date) : null,
      });
      await list(queryData);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  const handleSearchFilter = (option: IOption, type: 'status' | 'filter') => {
    setValue(type, option);
  };

  // 페이징 이동
  const onPageChange = (page: number) => {
    const newQuery = { ...query, page };
    navigate(`${PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT}?${qs.stringify(newQuery)}`);
  };

  // 검색
  const onSubmit = handleSubmit(({ status, filter, query, startDate, endDate }) => {
    const queryData = {
      filter: filter.value,
    } as {
      filter: string;
      query?: string;
      status?: string;
      start_date?: string;
      end_date?: string;
    };
    if (query) {
      queryData.query = query;
    }
    if (status) {
      queryData.status = status ? String(status.value) : '';
    }
    if (startDate) {
      queryData.start_date = startDate;
    }
    if (endDate) {
      queryData.end_date = endDate;
    }
    navigate(`${PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT}?${qs.stringify(queryData)}`);
  });

  const handleReset = () => {
    reset({
      query: '',
      status: workspaceStatus[0],
      filter: workspaceCategory[0],
      startDate: null,
      endDate: null,
    });
  };

  const onConfirm = async () => {
    const { type } = isAlert;
    if (type === 'delete') {
      try {
        await workspaceDelete(checkList);
        setTimeout(() => {
          onAlertSetting(true, '삭제 완료 알림', '삭제가 완료되었습니다', '', 'alert');
          setCheckList([]);
        }, 0);
      } catch (err) {
        setTimeout(() => {
          onAlertSetting(
            true,
            '삭제 불가 알림',
            `${isCustomError(err) && err?.message ? err.message : '진행 중인 프로젝트가 있어 삭제 불가합니다.'}`,
            '',
            'alert',
          );
        }, 0);
      }
    }
    onCancel();
  };

  const onCancel = () => {
    onAlertSetting(false, '', '', '', 'alert');
  };

  const handleCheck = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, workspaceId: string) => {
    e.stopPropagation();
    if (workspaceId === 'all') {
      if (checkList.length === workspaceManagement.list.length) {
        setCheckList([]);
        return;
      }
      const newCheckList = workspaceManagement.list.map((item) => item.workspace_id);
      setCheckList(newCheckList);
      return;
    }
    if (checkList.includes(workspaceId)) {
      const newCheckList = checkList.filter((item) => item !== workspaceId);
      setCheckList(newCheckList);
      return;
    }
    const newCheckList = [...checkList, workspaceId];
    setCheckList(newCheckList);
  };

  const handleDeleteOpen = () => {
    onAlertSetting(true, '알림', `${checkList.length}개의 워크스페이스를 삭제하시겠습니까?`, 'delete', 'confirm');
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

  const handleEdit = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>, workSpaceId: string) => {
    e.stopPropagation();
    setSelectedWorkspaceId((prev) => (prev === workSpaceId ? '' : workSpaceId));
  };

  const handleWorkspaceLink = (workspaceId: string) => {
    navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', workspaceId));
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
        <b>워크스페이스 관리</b>
      </Header>
      <Container>
        <Title
          className="title-box"
          title="워크스페이스 관리"
          button={
            <>
              <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_REGISTER}>
                <Button variant="secondary">
                  <Plus width="12" height="12" color={theme.adminColor.white} />새 워크스페이스 등록
                </Button>
              </Link>
            </>
          }
        />
        <div className="report-wrapper">
          <ReportCard
            icon={<Workspace width="30" height="30" color="#3ec3a1" />}
            title="전체 워크스페이스"
            count={workspaceManagement.workSpaceCount || 0}
            type="workspace"
          />
        </div>
        <div className="sub-title">워크스페이스 조회</div>
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
              className="status-select"
              list={workspaceStatus}
              onClick={(option) => handleSearchFilter(option, 'status')}
              selectOption={watch('status')}
              placeholderText="워크스페이스 상태"
            />
            <Select
              className="search-select"
              list={workspaceCategory}
              onClick={(option) => handleSearchFilter(option, 'filter')}
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
            <span>{workspaceManagement.resultCount || 0}</span>
            건의 검색결과가 있습니다.
          </div>
          {!!workspaceManagement.list.length && (
            <Button variant="outline" size="s" disabled={!checkList.length} onClick={handleDeleteOpen}>
              삭제
            </Button>
          )}
        </div>
        {workspaceManagement.isLoading ? null : workspaceManagement.list.length ? (
          <div className="table">
            <Table>
              <thead>
                <tr>
                  <th>
                    <CheckBox
                      name="all"
                      checked={checkList.length === workspaceManagement.list.length}
                      className="check-wrapper"
                      onClick={(e) => handleCheck(e, 'all')}
                    />
                  </th>
                  <th>No</th>
                  <th>워크스페이스 명</th>
                  <th>워크스페이스 소개</th>
                  <th>프로젝트 개수</th>
                  <th>작업자</th>
                  <th>검수자</th>
                  <th>뷰어</th>
                  <th>담당자</th>
                  <th>
                    워크스페이스
                    <br />
                    상태
                  </th>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {workspaceManagement.list.map((item, index) => (
                  <tr key={`table-workspace-${item.workspace_id}`} className="list" onClick={() => handleWorkspaceLink(item.workspace_id)}>
                    <td>
                      <CheckBox
                        name="all"
                        checked={checkList.includes(item.workspace_id)}
                        className="check-wrapper"
                        onClick={(e) => handleCheck(e, item.workspace_id)}
                      />
                    </td>
                    <td>{(workspaceManagement.resultCount || 0) - ((query?.page ? Number(query.page) : 1) - 1) * 10 - index}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.project_count || '-'}</td>
                    <td>{item.worker_count || '-'}</td>
                    <td>{item.checker_count || '-'}</td>
                    <td>{item.viewer_count || '-'}</td>
                    <td>{item.manager}</td>
                    <td>{item.status}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>
                      <div className={classNames('more-wrapper', { active: selectedWorkspaceId === item.workspace_id })}>
                        <More width="30" height="30" color="#949ca5" onClick={(e) => handleEdit(e, item.workspace_id)} />
                        {selectedWorkspaceId === item.workspace_id && (
                          <div className="more-option" ref={ref}>
                            <ul>
                              <li onClick={(e) => e.stopPropagation()}>
                                <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_DETAIL.replace(':id', item.workspace_id)}>
                                  <Edit width="24" height="24" color={theme.adminColor.txt2} />
                                  <span>정보 입력 수정</span>
                                </Link>
                              </li>
                              <li onClick={(e) => e.stopPropagation()}>
                                <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_WORKER.replace(':id', item.workspace_id)}>
                                  <EditWorker width="24" height="24" color={theme.adminColor.txt2} />
                                  <span>작업자 지정</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="table-empty">
            <TableEmpty>
              워크스페이스가 없습니다.
              <br />
              워크스페이스를 추가해주세요.
            </TableEmpty>
          </div>
        )}
        {!workspaceManagement.isLoading && workspaceManagement.totalPage !== 1 && (
          <div className="pagination">
            <Pagination totalPages={workspaceManagement.totalPage || 0} onPageChange={onPageChange} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default ManagementWorkspace;
