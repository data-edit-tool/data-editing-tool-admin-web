/* eslint-disable indent */
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { workspaceAssignManagementAtom, workspaceAssignManagementResultCountSelector } from 'state/workspace-assign-management';
import { workspaceAvailableManagementAtom, workspaceAvailableManagementResultCountSelector } from 'state/workspace-available-management';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import styled from 'styled-components';
import { IAlert } from 'types/interface';
import { IUserManagementUser } from 'types/user-management-interface';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import CheckBox from 'components/Common/Admin/CheckBox';
import Input from 'components/Common/Admin/Input/index';
import Title from 'components/Common/Admin/Title';
import Pagination from 'components/Common/Pagination';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import NaviArrow from 'components/SVG/Icon/NaviArrow';
import WorkerArrow from 'components/SVG/Icon/WorkerArrow';

const Container = styled.section`
  padding: 34px 40px 40px;
  .sub-title {
    font-size: ${({ theme }) => theme.fontSize.text_20};
    font-weight: 500;
    color: #111;
    margin-top: 32px;
  }
  .wrapper {
    display: flex;
    margin-top: 80px;
    position: relative;
    align-items: center;
    width: 1600px;
    ul.menu {
      position: absolute;
      top: -49px;
      left: -1px;
      display: flex;
      border-top: 1px solid ${({ theme }) => theme.adminColor.line1};
      border-left: 1px solid ${({ theme }) => theme.adminColor.line1};
      border-right: 1px solid ${({ theme }) => theme.adminColor.line1};
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      width: 360px;
      li {
        border-right: 1px solid ${({ theme }) => theme.adminColor.line1};
        padding: 16px 0px;
        width: 120px;
        text-align: center;
        color: #888888;
        cursor: pointer;
        &:first-child {
          border-top-left-radius: 6px;
        }
        &.active {
          background-color: ${({ theme }) => theme.adminColor.secondary};
          color: ${({ theme }) => theme.adminColor.white};
          border-right: 1px solid ${({ theme }) => theme.adminColor.secondary};
        }
        &:last-child {
          border-right: 0;
          border-top-right-radius: 6px;
          .active {
            border-left: 1px solid ${({ theme }) => theme.adminColor.secondary};
            border-right: 1px solid ${({ theme }) => theme.adminColor.line1};
          }
        }
      }
    }
    .list-box {
      width: 488px;
      padding: 30px;
      border-radius: 6px;
      margin-bottom: auto;
      &.left {
        border-top-left-radius: 0px;
      }
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      .title {
        font-size: ${({ theme }) => theme.fontSize.text_16};
        font-weight: 700;
        color: #111;
      }
      .search-box {
        display: flex;
        margin-top: 20px;
        align-items: center;
        form {
          display: flex;
          align-items: center;
          .name-input {
            margin-left: 13px;
            width: 289px;
            input {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
          .search-btn {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            width: 100px;
            &:disabled {
              border-left: 0px !important;
            }
          }
        }
      }
      .search-list {
        margin-top: 20px;
        min-height: 300px;
        li {
          height: 60px;
          border-bottom: 1px solid ${({ theme }) => theme.adminColor.line2};
          display: flex;
          align-items: center;
          .name {
            width: 150px;
            margin-left: 33px;
          }
          .desc {
            width: calc(100% - 207px);
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
      .pagination {
        margin-top: 40px;
        padding-bottom: 40px;
      }
      .result {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .total {
          font-size: 15px;
          color: #111;
          span {
            color: ${({ theme }) => theme.adminColor.primary};
          }
        }
        .register-btn {
          width: 84px;
        }
      }
    }
    .arrow-box {
      margin: 0px 13px;
    }
  }
`;

const workerType = [
  {
    name: '작업자 지정',
    value: 'W',
  },
  {
    name: '검수자 지정',
    value: 'C',
  },
  {
    name: '뷰어 지정',
    value: 'V',
  },
];

const ManagementWorkspaceWorker: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, workspaceUserList, workspaceWorkerList, workspaceWorkerRegister, workspaceWorkerDelete } = useWorkspaceManagementActions();
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const workspaceAvailableManagement = useRecoilValue(workspaceAvailableManagementAtom);
  const workspaceAvailableManagementCount = useRecoilValue(workspaceAvailableManagementResultCountSelector);
  const workspaceAssignManagement = useRecoilValue(workspaceAssignManagementAtom);
  const workspaceAssignManagementCount = useRecoilValue(workspaceAssignManagementResultCountSelector);
  const [isAllUserCheckList, setIsAllUserCheckList] = useState<IUserManagementUser[]>([]);
  const [isAllWorkerCheckList, setIsAllWorkerCheckList] = useState<IUserManagementUser[]>([]);
  const [isUserPage, setIsUserPage] = useState<number>(1);
  const [isWorkerPage, setIsWorkerPage] = useState<number>(1);
  const [isWorkerType, setIsWorkerType] = useState<string>('W');
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const { register, getValues, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      query: '',
    },
  });

  const {
    register: workerRegister,
    getValues: workerGetValues,
    setValue: workerSetValues,
    handleSubmit: workerHandleSubmit,
  } = useForm({
    defaultValues: {
      query: '',
    },
  });

  useEffect(() => {
    // 워크스페이스 조회
    onWorkspaceDetail();
    // 지원자 목록 조회
    onUserList(isUserPage);
    // 작업자, 검수자, 뷰어 목록 조회
    onWorkerList(isWorkerPage, isWorkerType);
  }, []);

  // 작업자 타입 변경
  const handleWorkerType = (type: string) => {
    if (isWorkerType === type) {
      return;
    }
    workerSetValues('query', '');
    setIsWorkerType(type);
    setIsWorkerPage(1);
    onWorkerList(1, type);
    setIsAllWorkerCheckList([]);
  };

  // 작업자 타입에 따른 텍스트 변경
  const onTextParsing = useCallback(() => {
    switch (isWorkerType) {
      case 'W':
        return '작업자 등록';
      case 'C':
        return '검수자 등록';
      case 'V':
        return '뷰어 등록';
      default:
        return '';
    }
  }, [isWorkerType]);

  // 지원자 목록 조회
  const onUserSubmit = handleSubmit(() => {
    onUserList(1);
  });

  // 작업자, 검수자, 뷰어 목록 조회
  const onWorkerSubmit = workerHandleSubmit(() => {
    onWorkerList(1, isWorkerType);
  });

  // 워크스페이스 조회
  const onWorkspaceDetail = async () => {
    try {
      await detail(id as string);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 지원자 목록 조회
  const onUserList = async (selectPage: number) => {
    try {
      const { query } = getValues();
      await workspaceUserList({ workspaceId: id as string, page: selectPage, query });
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '지원자 목록을 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 작업자, 검수자, 뷰어 목록 조회
  const onWorkerList = async (selectPage: number, type: string) => {
    try {
      const { query } = workerGetValues();
      await workspaceWorkerList({ workspaceId: id as string, page: selectPage, type, query });
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '지원자 목록을 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 지원자 페이지 변경
  const onPageChange = (page: number) => {
    setIsUserPage(page);
    onUserList(page);
  };

  // 작업자, 검수자, 뷰어 페이지 변경
  const onPageWorkerChange = (page: number) => {
    setIsWorkerPage(page);
    onWorkerList(page, isWorkerType);
  };

  // 지원자 체크박스 선택
  const handleUserCheck = (user: IUserManagementUser) => {
    const isUserCheck = isAllUserCheckList.some((userCheck) => userCheck.user_id === user.user_id);
    if (isUserCheck) {
      setIsAllUserCheckList(isAllUserCheckList.filter((userCheck) => userCheck.user_id !== user.user_id));
      return;
    }
    setIsAllUserCheckList([...isAllUserCheckList, user]);
  };

  // 지원자 전체 체크박스 체크 유무
  const onAllCheck = useCallback(() => {
    let result = 0;
    workspaceAvailableManagement.list.forEach((user) => {
      if (!isAllUserCheckList.some((userCheck) => userCheck.user_id === user.user_id)) {
        result += 1;
      }
    });
    return result === 0;
  }, [isAllUserCheckList, workspaceAvailableManagement.list]);

  // 지원자 전체 체크박스 선택
  const handleAllUserCheck = () => {
    if (!onAllCheck()) {
      setIsAllUserCheckList([...isAllUserCheckList, ...workspaceAvailableManagement.list]);
      return;
    }
    let newIsAllUserCheckList = [...isAllUserCheckList];
    newIsAllUserCheckList.forEach((user) => {
      if (workspaceAvailableManagement.list.some((userCheck) => userCheck.user_id === user.user_id)) {
        newIsAllUserCheckList = newIsAllUserCheckList.filter((userCheck) => userCheck.user_id !== user.user_id);
      }
    });
    setIsAllUserCheckList(newIsAllUserCheckList);
  };

  // 작업자, 검수자, 뷰어 체크박스 선택
  const handleWorkerCheck = (user: IUserManagementUser) => {
    const isUserCheck = isAllWorkerCheckList.some((userCheck) => userCheck.user_id === user.user_id);
    if (isUserCheck) {
      setIsAllWorkerCheckList(isAllWorkerCheckList.filter((userCheck) => userCheck.user_id !== user.user_id));
      return;
    }
    setIsAllWorkerCheckList([...isAllWorkerCheckList, user]);
  };

  // 작업자, 검수자, 뷰어 전체 체크박스 체크 유무
  const onAllWorkerCheck = useCallback(() => {
    let result = 0;
    workspaceAssignManagement.list.forEach((user) => {
      if (!isAllWorkerCheckList.some((userCheck) => userCheck.user_id === user.user_id)) {
        result += 1;
      }
    });
    return result === 0;
  }, [isAllWorkerCheckList, workspaceAssignManagement.list]);

  // 작업자, 검수자, 뷰어 전체 체크박스 선택
  const handleAllWorkerCheck = () => {
    if (!onAllWorkerCheck()) {
      setIsAllWorkerCheckList([...isAllWorkerCheckList, ...workspaceAssignManagement.list]);
      return;
    }
    let newIsAllWorkerCheckList = [...isAllWorkerCheckList];
    newIsAllWorkerCheckList.forEach((user) => {
      if (workspaceAssignManagement.list.some((userCheck) => userCheck.user_id === user.user_id)) {
        newIsAllWorkerCheckList = newIsAllWorkerCheckList.filter((userCheck) => userCheck.user_id !== user.user_id);
      }
    });
    setIsAllWorkerCheckList(newIsAllWorkerCheckList);
  };

  // 작업자 등록
  const handleWorkerRegister = async () => {
    try {
      await workspaceWorkerRegister({
        type: isWorkerType,
        userIds: isAllUserCheckList.map((user) => user.user_id),
        workspaceId: id as string,
      });
      onUserList(1);
      setIsWorkerPage(1);
      onWorkerList(1, isWorkerType);
      setIsUserPage(1);
      setIsAllUserCheckList([]);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '작업자를 등록하지 못했습니다.'}`, '', 'alert');
    }
  };

  // 작업자 취소
  const handleWorkerCancel = async () => {
    try {
      await workspaceWorkerDelete({
        userIds: isAllWorkerCheckList.map((user) => user.user_id),
        workspaceId: id as string,
      });
      onWorkerList(1, isWorkerType);
      setIsWorkerPage(1);
      setIsAllWorkerCheckList([]);
      onAlertSetting(true, '삭제 완료 알림', '삭제가 완료되었습니다', '', 'alert');
    } catch (err) {
      onAlertSetting(
        true,
        `${isCustomError(err) && err?.message ? '등록 취소불가 알림' : '알림'}`,
        `${isCustomError(err) && err?.message ? err.message : '작업자를 취소하지 못했습니다.'}`,
        '',
        'alert',
      );
      setIsAllWorkerCheckList([]);
      onWorkerList(isWorkerPage, isWorkerType);
    }
  };

  // 알림창 설정
  const onAlertSetting = (open: boolean, title: string, content: string, type: string, alertType: 'alert' | 'confirm') => {
    setIsAlert({
      open,
      title,
      content,
      type,
      alertType,
    });
  };

  // 알림창 취소 및 확인
  const onCancel = () => {
    if (isAlert.type === 'back') {
      navigate(-1);
    }
    onAlertSetting(false, '', '', '', 'alert');
  };

  // 알림창 확인
  const onConfirm = () => {
    onCancel();
  };

  return (
    <Layout>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type={isAlert.alertType} content={isAlert.content} onConfirm={onConfirm} onCancel={onCancel} />
        </ModalContainer>
      )}
      <Header>
        <span>워크스페이스 관리</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <b>&nbsp;워크스페이스 작업자 지정</b>
      </Header>
      <Container>
        <Title className="title-box" title={workspaceDetail?.name || ''} backUrl={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT} />
        <div className="wrapper">
          <ul className="menu">
            {workerType.map((worker) => (
              <li key={worker.value} className={classNames({ active: isWorkerType === worker.value })} onClick={() => handleWorkerType(worker.value)}>
                {worker.name}
              </li>
            ))}
          </ul>
          <div className="list-box left">
            <div className="title">지원자 목록</div>
            <div className="search-box">
              <CheckBox
                name="all"
                checked={workspaceAvailableManagement.isLoading ? false : isAllUserCheckList.length ? onAllCheck() : false}
                onClick={handleAllUserCheck}
              />
              <form onSubmit={onUserSubmit}>
                <Input register={register} type="text" name="query" className="name-input" placeholder="사용자 ID, 설명 등" />
                <Button className="search-btn" type="submit">
                  검색
                </Button>
              </form>
            </div>
            <ul className="search-list">
              {workspaceAvailableManagement.list.map((item) => (
                <li key={`all-worker-${item.user_id}`}>
                  <CheckBox
                    name={`all-worker-${item.user_id}`}
                    checked={isAllUserCheckList.some((userCheck) => userCheck.user_id === item.user_id)}
                    onClick={() => handleUserCheck(item)}
                  />
                  <span className="name">{item.account}</span>
                  <span className="desc">{item.desc}</span>
                </li>
              ))}
            </ul>
            {!workspaceAvailableManagement.isLoading && workspaceAvailableManagement.totalPage !== 1 && (
              <div className="pagination">
                <Pagination totalPages={workspaceAvailableManagement.totalPage || 0} onPageChange={onPageChange} currentPage={isUserPage} />
              </div>
            )}
            <div className="result">
              <div className="total">
                전체 <span>{workspaceAvailableManagementCount}</span>명 선택 <span>{isAllUserCheckList.length}</span>명
              </div>
              <Button className="register-btn" size="s" variant="outline" onClick={handleWorkerRegister} disabled={!isAllUserCheckList.length}>
                {onTextParsing()}
              </Button>
            </div>
          </div>
          <div className="arrow-box">
            <WorkerArrow width="20" height="19" color="#949ca5" />
          </div>
          <div className="list-box">
            <div className="title">{onTextParsing()}</div>
            <div className="search-box">
              <CheckBox
                name="all"
                checked={workspaceAssignManagement.isLoading ? false : isAllWorkerCheckList.length ? onAllWorkerCheck() : false}
                onClick={handleAllWorkerCheck}
              />
              <form onSubmit={onWorkerSubmit}>
                <Input register={workerRegister} type="text" name="query" className="name-input" placeholder="사용자, ID, 설명 등" />
                <Button className="search-btn" type="submit">
                  검색
                </Button>
              </form>
            </div>
            <ul className="search-list">
              {workspaceAssignManagement.list.map((item) => (
                <li key={`all-worker-${item.user_id}`}>
                  <CheckBox
                    name={`all-worker-${item.user_id}`}
                    checked={isAllWorkerCheckList.some((userCheck) => userCheck.user_id === item.user_id)}
                    onClick={() => handleWorkerCheck(item)}
                  />
                  <span className="name">{item.account}</span>
                  <span className="desc">{item.desc}</span>
                </li>
              ))}
            </ul>
            {!workspaceAssignManagement.isLoading && workspaceAssignManagement.totalPage !== 1 && (
              <div className="pagination">
                <Pagination totalPages={workspaceAssignManagement.totalPage || 0} onPageChange={onPageWorkerChange} currentPage={isWorkerPage} />
              </div>
            )}
            <div className="result">
              <div className="total">
                전체 <span>{workspaceAssignManagementCount}</span>명 선택 <span>{isAllWorkerCheckList.length}</span>명
              </div>
              <Button className="register-btn" size="s" variant="outline" onClick={handleWorkerCancel} disabled={!isAllWorkerCheckList.length}>
                등록 취소
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceWorker;
