/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import useWorkspaceProjectAssignmentActions from 'actions/workspace-project-assignment-actions';
import { useWorkspaceProjectUploadActions } from 'actions/workspace-project-upload-actions';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import { workspaceProjectAssignmentListSelector } from 'state/workspace-project-assignment';
import { workspaceProjectUploadAtom } from 'state/workspace-project-upload';
import styled from 'styled-components';
import { IAlert, IPage } from 'types/interface';
import { IWorkspaceProjectAssignmentUserList } from 'types/workspace-project-assignment-interface';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Title from 'components/Common/Admin/Title';
import Pagination2 from 'components/Common/Pagination2';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import BackBtn from 'components/SVG/Icon/BackBtn';
import NaviArrow from 'components/SVG/Icon/NaviArrow';
import ProgressAS from 'components/SVG/Icon/ProgressAS';
import ProgressCM from 'components/SVG/Icon/ProgressCM';
import ProgressIC from 'components/SVG/Icon/ProgressIC';
import ProgressIM from 'components/SVG/Icon/ProgressIM';
import ProgressIS from 'components/SVG/Icon/ProgressIS';
import ProgressNU from 'components/SVG/Icon/ProgressNU';
import ProgressRD from 'components/SVG/Icon/ProgressRD';
import ProgressRJ from 'components/SVG/Icon/ProgressRJ';
import ProgressRQ from 'components/SVG/Icon/ProgressRQ';
import Search from 'components/SVG/Icon/Search';

const Container = styled.section`
  padding: 40px;
  width: 1680px;
  .toast-popup {
    position: fixed;
    top: 48px;
    right: 40px;
    width: 320px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #fff;
    background-color: #ff7171;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(-20px);
    animation: toastSlideIn 0.3s ease-out forwards, toastFadeOut 0.3s ease-in 1.7s forwards;
    z-index: 9999;
    &.success {
      background-color: #78aff8;
    }
  }

  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes toastFadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  .wrapper {
    margin-top: 32px;
    display: flex;
    gap: 40px;
    .left {
      width: 1020px;
      min-height: 874px;
      overflow-y: auto;
      border-radius: 4px;
      padding: 32px;
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #f5f5f5;
        border-radius: 20px;
      }
      .title-box {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 32px;
        color: #3a3a3a;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
        li {
          width: 299px;
          height: 200px;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #eee;
          background: #fcfcfc;
          display: flex;
          flex-direction: column;
          gap: 20px;
          cursor: pointer;
          &:hover,
          &.active {
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
          }
          &.blur {
            opacity: 0.2;
          }
          .RD_background {
            background-color: #4c4c4c !important;
          }
          .AS_background {
            background-color: #1f96ff !important;
          }
          .RQ_background {
            background-color: #ff8800 !important;
          }
          .IS_background {
            background-color: #266ce5 !important;
          }
          .RJ_background {
            background-color: #fe3b21 !important;
          }
          .CM_background {
            background-color: #25c65b !important;
          }
          .NU_background {
            background-color: #00bccd !important;
          }
          .IC_background {
            background-color: #7501c9 !important;
          }
          .IM_background {
            background-color: #cf1fea !important;
          }
          .RD_border {
            border: 1px solid #4c4c4c !important;
          }
          .AS_border {
            border: 1px solid #1f96ff !important;
          }
          .RQ_border {
            border: 1px solid #ff8800 !important;
          }
          .IS_border {
            border: 1px solid #266ce5 !important;
          }
          .RJ_border {
            border: 1px solid #fe3b21 !important;
          }
          .CM_border {
            border: 1px solid #25c65b !important;
          }
          .NU_border {
            border: 1px solid #00bccd !important;
          }
          .IC_border {
            border: 1px solid #7501c9 !important;
          }
          .IM_border {
            border: 1px solid #cf1fea !important;
          }
          .RD_color {
            color: #4c4c4c !important;
          }
          .AS_color {
            color: #1f96ff !important;
          }
          .RQ_color {
            color: #ff8800 !important;
          }
          .IS_color {
            color: #266ce5 !important;
          }
          .RJ_color {
            color: #fe3b21 !important;
          }
          .CM_color {
            color: #25c65b !important;
          }
          .NU_color {
            color: #00bccd !important;
          }
          .IC_color {
            color: #7501c9 !important;
          }
          .IM_color {
            color: #cf1fea !important;
          }
          .project-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .project-left {
              display: flex;
              align-items: center;
              gap: 12px;
              .icon-box {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                border: 1px solid #ececec;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  width: 44px;
                  height: 44px;
                }
              }
              .project-name {
                font-size: 28px;
                font-weight: 700;
                line-height: 32px;
                color: #4c4c4c;
              }
            }
          }
          .project-middle {
            font-size: 20px;
            color: #4c4c4c;
            line-height: 24px;
            font-weight: 600;
          }
          .project-bottom {
            display: flex;
            flex-direction: column;
            gap: 4px;
            .project-bottom-item {
              display: flex;
              align-items: center;
              gap: 4px;
              span:first-child {
                font-size: 16px;
                color: #676767;
                line-height: 20px;
                font-weight: 600;
              }
              span:last-child {
                font-size: 16px;
                color: #777;
                line-height: 20px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .right {
      width: 540px;
      min-height: 844px;
      overflow-y: auto;
      border-radius: 4px;
      padding: 32px;
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      position: relative;
      &.blur {
        opacity: 0.2;
        pointer-events: none;
      }
      .out-alert {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 32px;
        .alert-content {
          width: 476px;
          height: 172px;
          padding: 24px 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          border-radius: 4px;
          background-color: #fff;
          .alert-content-title {
            font-size: 20px;
            font-weight: 600;
            color: #000;
            line-height: 24px;
          }
          .alert-content-content {
            font-size: 16px;
            color: #000;
            line-height: 24px;
          }
          .alert-content-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            button {
              padding: 8px 20px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              line-height: 24px;
              font-weight: 600;
              color: #fff;
              background-color: #1a81ff;
              &.cancel {
                background-color: #f5f5f5;
                color: #646464;
              }
            }
          }
        }
      }
      &.disabled {
        opacity: 0.2;
      }
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #f5f5f5;
        border-radius: 20px;
      }
      .title-box {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 32px;
        color: #3a3a3a;
      }
      .list-box {
        border: 1px solid #e3edf9;
        border-radius: 4px;
        padding: 20px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .search-input {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          justify-content: space-between;
          border: 1px solid #eee;
          background-color: #f7f7f7;
          margin-bottom: 8px;
          input {
            width: 372px;
            height: 24px;
            font-size: 16px;
            color: #000;
            border: none;
            background-color: transparent;
            :placeholder {
              color: #cecece;
            }
          }
          svg {
            cursor: pointer;
          }
        }
        .header {
          font-size: 16px;
          color: #000;
          line-height: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .header-list,
        .search-list {
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 8px 36px;
          display: flex;
          width: 100%;
          div {
            text-align: center;
            width: 50%;
            color: #8c8c8c;
            font-size: 16px;
            line-height: 24px;
          }
        }
        .header-content {
          border-radius: 4px;
          background-color: #f6f6f6;
          padding: 8px 36px;
          display: flex;
          width: 100%;
          margin-top: 8px;
          div {
            text-align: center;
            width: 50%;
            color: #5a5a5a;
            font-size: 16px;
            line-height: 24px;
          }
        }
        ul.search-content {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          li {
            cursor: pointer;
            border-radius: 4px;
            background-color: #f7fbff;
            border: 1px solid #e9f4ff;
            padding: 8px 36px;
            display: flex;
            width: 100%;
            &.active {
              background-color: #5aadff;
              div {
                color: #fff;
              }
            }
            div {
              text-align: center;
              width: 50%;
              color: #5a5a5a;
              font-size: 16px;
              line-height: 24px;
            }
          }
        }
      }
      .pagination {
        margin-top: 32px;
        padding-bottom: 14px;
      }
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
        gap: 12px;
        button {
          padding: 8px 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: #fff;
          background-color: #1a81ff;
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          &.submit,
          &.cancel {
            width: 68px;
          }
          &.out {
            background-color: #9b9b9b;
          }
          &.error,
          &.cancel {
            background-color: #ff4f52;
          }
        }
      }
    }
  }
`;

const ManagementWorkspaceProjectAssignment: React.FC = () => {
  const { id, projectId } = useParams();
  const { detail } = useWorkspaceManagementActions();
  const { list } = useWorkspaceProjectUploadActions();
  const { list: assignmentList, workStatus, workerAndCheckerList } = useWorkspaceProjectAssignmentActions();
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const workspaceProjectUpload = useRecoilValue(workspaceProjectUploadAtom);
  const [workspaceProjectAssignmentList, setWorkspaceProjectAssignmentList] = useRecoilState(workspaceProjectAssignmentListSelector);
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });

  const [isSelectAssignment, setIsSelectAssignment] = useState<IWorkspaceProjectAssignmentUserList | null>(null);
  const [isSelectId, setIsSelectId] = useState<string>('');
  const [isSelectStatus, setIsSelectStatus] = useState<string>('');
  const [isOutAlert, setIsOutAlert] = useState<{ status: boolean; type: string }>({
    status: false,
    type: '',
  });
  const [isWorkerAndCheckerList, setIsWorkerAndCheckerList] = useState<IWorkspaceProjectAssignmentUserList[]>([]);
  const [isWorkerAndCheckerLoading, setIsWorkerAndCheckerLoading] = useState<boolean>(true);
  const [isWorkerAndCheckerPage, setIsWorkerAndCheckerPage] = useState<IPage | null>(null);
  const [isWorkerAndCheckerSelect, setIsWorkerAndCheckerSelect] = useState<IWorkspaceProjectAssignmentUserList | null>(null);
  const [isWorkerCheckerAndWorkerSelect, setIsWorkerCheckerAndWorkerSelect] = useState<IWorkspaceProjectAssignmentUserList | null>(null);
  const [isToastPopup, setIsToastPopup] = useState<{
    status: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    status: false,
    type: 'success',
    message: '',
  });

  const { register, getValues, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    // 워크스페이스 조회
    onWorkspaceDetail();
  }, []);

  useEffect(() => {
    // 업로드 리스트 페이징
    onWorkspaceProjectUpload();
  }, []);

  useEffect(() => {
    // 작업 리스트 조회
    onWorkspaceProjectAssignment();
  }, []);

  // 워크스페이스 조회
  const onWorkspaceDetail = async () => {
    try {
      await detail(id as string);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 업로드 리스트 조회
  const onWorkspaceProjectUpload = async () => {
    try {
      await list({ workspaceId: id as string, projectId: projectId as string, page: 1 });
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '업로드 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 작업 리스트 조회
  const onWorkspaceProjectAssignment = async () => {
    try {
      await assignmentList({ projectId: projectId as string });
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '작업 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
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

  const onCancel = () => {
    setIsAlert({
      open: false,
      title: '',
      content: '',
      type: '',
      alertType: 'alert',
    });
  };

  const onWorkStatus = (status: string) => {
    switch (status) {
      case 'RD':
        return '작업 할당 전(RD)';
      case 'AS':
        return '1차 작업중(AS)';
      case 'RQ':
        return '검수요청(RQ)';
      case 'IS':
        return '2차 작업중(IS)';
      case 'RJ':
        return '반려(RJ)';
      case 'CM':
        return '완료(CM)';
      case 'NU':
        return '작업불가 승인(NU)';
      case 'IC':
        return '작업불가 검수(IC)';
      case 'IM':
        return '작업불가 요청(IM)';
      default:
        return '-';
    }
  };

  const onWorkStatusColor = (status: string) => {
    switch (status) {
      case 'RD':
        return 'RD_background';
      case 'AS':
        return 'AS_background';
      case 'RQ':
        return 'RQ_background';
      case 'IS':
        return 'IS_background';
      case 'RJ':
        return 'RJ_background';
      case 'CM':
        return 'CM_background';
      case 'NU':
        return 'NU_background';
      case 'IC':
        return 'IC_background';
      case 'IM':
        return 'IM_background';
    }
    return 'RD_background';
  };

  const onWorkStatusBorderColor = (status: string) => {
    switch (status) {
      case 'RD':
        return 'RD_border';
      case 'AS':
        return 'AS_border';
      case 'RQ':
        return 'RQ_border';
      case 'IS':
        return 'IS_border';
      case 'RJ':
        return 'RJ_border';
      case 'CM':
        return 'CM_border';
      case 'NU':
        return 'NU_border';
      case 'IC':
        return 'IC_border';
      case 'IM':
        return 'IM_border';
    }
    return 'RD_border';
  };

  const onWorkStatusTextColor = (status: string) => {
    switch (status) {
      case 'RD':
        return 'RD_color';
      case 'AS':
        return 'AS_color';
      case 'RQ':
        return 'RQ_color';
      case 'IS':
        return 'IS_color';
      case 'RJ':
        return 'RJ_color';
      case 'CM':
        return 'CM_color';
      case 'NU':
        return 'NU_color';
      case 'IC':
        return 'IC_color';
      case 'IM':
        return 'IM_color';
    }
    return 'RD_color';
  };

  const onWorkerIcon = (status: string) => {
    switch (status) {
      case 'RD':
        return <ProgressRD width="32" height="32" />;
      case 'AS':
        return <ProgressAS width="32" height="32" />;
      case 'RQ':
        return <ProgressRQ width="32" height="32" />;
      case 'IS':
        return <ProgressIS width="32" height="32" />;
      case 'RJ':
        return <ProgressRJ width="32" height="32" />;
      case 'CM':
        return <ProgressCM width="32" height="32" />;
      case 'NU':
        return <ProgressNU width="32" height="32" />;
      case 'IC':
        return <ProgressIC width="32" height="32" />;
      case 'IM':
        return <ProgressIM width="32" height="32" />;
    }
    return <ProgressRD width="32" height="32" />;
  };

  const updateIsSelectStatus = (status: string) => {
    let updateStatus = 'W';
    switch (status) {
      case 'RD':
      case 'AS':
      case 'RJ':
        updateStatus = 'W';
        break;
      case 'RQ':
      case 'IM':
      case 'IS':
      case 'IC':
        updateStatus = 'C';
        break;
      default:
        updateStatus = 'N';
        break;
    }
    setIsSelectStatus(updateStatus);
  };

  const onSelectAssignment = (jobId: string, status: string, selectAssignment: IWorkspaceProjectAssignmentUserList | null) => {
    if (isSelectId === jobId) {
      setIsSelectAssignment(null);
      setIsSelectStatus('');
      setIsSelectId('');
      setIsWorkerAndCheckerSelect(null);
      setIsWorkerAndCheckerList([]);
      setIsWorkerAndCheckerPage(null);
      setIsWorkerCheckerAndWorkerSelect(null);
      return;
    }
    if (status === 'RQ' || status === 'IM' || status === 'IS' || status === 'IC' || status === 'CM') {
      let findWorker = workspaceProjectAssignmentList.find((item) => item.id === jobId)?.worker;
      if (status === 'CM') {
        findWorker = workspaceProjectAssignmentList.find((item) => item.id === jobId)?.checker;
      }
      setIsWorkerCheckerAndWorkerSelect(findWorker || null);
    } else {
      setIsWorkerCheckerAndWorkerSelect(null);
    }
    setIsSelectAssignment(selectAssignment);
    updateIsSelectStatus(status);
    setIsSelectId(jobId);
    setIsWorkerAndCheckerSelect(null);
    setIsWorkerAndCheckerList([]);
    setIsWorkerAndCheckerPage(null);
  };

  const handleAssignmentCancel = () => {
    if (isSelectAssignment) {
      setIsOutAlert({ status: true, type: 'cancel' });
    }
  };

  const handleOutAlertCancel = () => {
    setIsOutAlert({ status: false, type: '' });
  };

  const handleOutAlertConfirm = async () => {
    if (isOutAlert.type === 'cancel') {
      try {
        await workStatus(isSelectId, {
          workspace_id: id as string,
          project_id: projectId as string,
          user_type: isSelectStatus,
          user_id: null,
        });
        setIsSelectAssignment(null);
        const newList = workspaceProjectAssignmentList.map((item) => {
          if (item.id === isSelectId) {
            if (isSelectStatus === 'W') {
              updateIsSelectStatus('RD');
              return { ...item, worker: null, work_status: { code: 'RD', name: '작업 할당 전(RD)' } };
            } else {
              updateIsSelectStatus('RQ');
              return { ...item, checker: null, work_status: { code: 'RQ', name: '검수요청(RQ)' } };
            }
          }
          return item;
        });
        setWorkspaceProjectAssignmentList(newList);
        setIsToastPopup({ status: true, type: 'error', message: '작업자가 해제 되었습니다.' });
        setTimeout(() => {
          setIsToastPopup({ status: false, type: 'error', message: '' });
        }, 2000);
      } catch (err) {
        onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '작업자를 해제하지 못했습니다.'}`, 'back', 'alert');
      }
    } else if (isOutAlert.type === 'change') {
      handleWorkerAndCheckerList(1);
    }
    setIsOutAlert({ status: false, type: '' });
  };

  const handleWorkerAndCheckerList = async (page: number, search?: string) => {
    try {
      const newSearch = search || getValues('search');
      setIsWorkerAndCheckerLoading(false);
      const data = await workerAndCheckerList({ workspace_id: id as string, user_type: isSelectStatus, page: page, search: newSearch });
      setIsWorkerAndCheckerList(data.list);
      setIsWorkerAndCheckerPage(data.page);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '작업자 목록을 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  const handleWorkAndCheckerClick = (select: IWorkspaceProjectAssignmentUserList) => {
    if (isWorkerAndCheckerSelect?.id === select.id) {
      setIsWorkerAndCheckerSelect(null);
      return;
    }
    setIsWorkerAndCheckerSelect(select);
  };

  const handleWorkerAndCheckerRegister = async () => {
    if (isWorkerAndCheckerSelect) {
      try {
        await workStatus(isSelectId, {
          workspace_id: id as string,
          project_id: projectId as string,
          user_type: isSelectStatus,
          user_id: isWorkerAndCheckerSelect.id,
        });
        setIsWorkerAndCheckerSelect(null);
        setIsWorkerAndCheckerList([]);
        setIsWorkerAndCheckerPage(null);
        setIsSelectAssignment(isWorkerAndCheckerSelect);
        const newList = workspaceProjectAssignmentList.map((item) => {
          if (item.id === isSelectId) {
            if (isSelectStatus === 'W') {
              updateIsSelectStatus('AS');
              return { ...item, worker: isWorkerAndCheckerSelect, work_status: { code: 'AS', name: '1차 작업중(AS)' } };
            } else {
              updateIsSelectStatus('IS');
              return { ...item, checker: isWorkerAndCheckerSelect, work_status: { code: 'IS', name: '2차 작업중(IS)' } };
            }
          }
          return item;
        });

        setWorkspaceProjectAssignmentList(newList);
        setIsToastPopup({ status: true, type: 'success', message: '작업자가 등록 되었습니다.' });
        setTimeout(() => {
          setIsToastPopup({ status: false, type: 'success', message: '' });
        }, 2000);
        setIsWorkerAndCheckerLoading(true);
      } catch (err) {
        onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '작업자를 등록하지 못했습니다.'}`, 'back', 'alert');
      }
    }
  };

  const handleResetWorkerAndChecker = () => {
    setIsWorkerAndCheckerSelect(null);
    setIsWorkerAndCheckerList([]);
    setIsWorkerAndCheckerPage(null);
    setIsSelectAssignment(null);
    setIsSelectId('');
    setIsSelectStatus('');
    setIsWorkerAndCheckerLoading(true);
    setIsWorkerCheckerAndWorkerSelect(null);
  };

  const handleAssignmentChange = () => {
    if (isSelectAssignment) {
      setIsOutAlert({ status: true, type: 'change' });
    }
  };

  const onSubmit = handleSubmit(({ search }) => {
    const newQuery = search.trim();
    if (newQuery) {
      handleWorkerAndCheckerList(1, newQuery);
    }
  });

  const handleWorkerAndCheckerCancel = () => {
    setIsWorkerAndCheckerSelect(null);
    setIsWorkerAndCheckerList([]);
    setIsWorkerAndCheckerPage(null);
    setIsWorkerAndCheckerLoading(true);
  };

  return (
    <Layout>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type={isAlert.alertType} content={isAlert.content} onConfirm={onCancel} onCancel={onCancel} />
        </ModalContainer>
      )}
      <Header>
        <span>워크스페이스 관리</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <span>&nbsp;{workspaceDetail?.name}</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <b>프로젝트 업로드 상태</b>
      </Header>
      <Container>
        {isToastPopup.status && <div className={`toast-popup ${isToastPopup.type}`}>{isToastPopup.message}</div>}
        <Title
          className="title-box"
          title={`${workspaceProjectUpload.projectName} 프로젝트`}
          backUrl={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string)}
        />
        <div className="wrapper">
          <div className="left">
            <div className="title-box">작업관리</div>
            <ul>
              {workspaceProjectAssignmentList.map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    onSelectAssignment(
                      item.id,
                      item.work_status.code,
                      item.work_status.code === 'RQ' || item.work_status.code === 'IM' || item.work_status.code === 'IS' || item.work_status.code === 'IC'
                        ? item.checker
                        : item.worker,
                    )
                  }
                  className={classNames({
                    active: isSelectId === item.id,
                    blur: isSelectId !== '' && isSelectId !== item.id,
                  })}
                >
                  <div className="project-top">
                    <div className="project-left">
                      <div className={`icon-box ${onWorkStatusBorderColor(item.work_status.code)}`}>
                        <div className={`icon ${onWorkStatusColor(item.work_status.code)}`}>{onWorkerIcon(item.work_status.code)}</div>
                      </div>
                      <div className={`project-name ${onWorkStatusTextColor(item.work_status.code)}`}>{item.name}</div>
                    </div>
                    <BackBtn width="32" height="32" />
                  </div>
                  <div className={`project-middle ${onWorkStatusTextColor(item.work_status.code)}`}>{onWorkStatus(item.work_status.code)}</div>
                  <div className="project-bottom">
                    <div className="project-bottom-item">
                      <span>Worker.</span>
                      <span>{item.worker ? item.worker.account : '-'}</span>
                    </div>
                    <div className="project-bottom-item">
                      <span>Checker.</span>
                      <span>{item.checker ? item.checker.account : '-'}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={classNames('right', { blur: isSelectId === '' })}>
            {isOutAlert.status && (
              <div className="out-alert">
                <div className="alert-content">
                  <div className="alert-content-title">{isOutAlert.type === 'cancel' ? '해제 알림' : '변경 알림'}</div>
                  <div className="alert-content-content">
                    {isOutAlert.type === 'cancel'
                      ? `기존 ${isSelectStatus === 'C' ? '검수자' : '작업자'}를 해제 하시겠습니까?`
                      : `기존 ${isSelectStatus === 'C' ? '검수자' : '작업자'}를 변경 하시겠습니까?`}
                  </div>
                  <div className="alert-content-btn">
                    <button className="cancel" onClick={handleOutAlertCancel}>
                      취소
                    </button>
                    <button onClick={handleOutAlertConfirm}>확인</button>
                  </div>
                </div>
              </div>
            )}
            <div className="title-box">{workspaceProjectAssignmentList.find((item) => item.id === isSelectId)?.name || '-'}</div>
            <div className="list-box">
              <div className="header">현재 작업자</div>
              <div className="header-list">
                <div>ID</div>
                <div>설명</div>
              </div>
              <div className="header-content">
                <div>
                  {isSelectStatus === 'W' || isSelectStatus === 'N' ? isSelectAssignment?.account || '-' : isWorkerCheckerAndWorkerSelect?.account || '-'}
                </div>
                <div>
                  {isSelectStatus === 'W' || isSelectStatus === 'N'
                    ? isSelectAssignment?.description || '-'
                    : isWorkerCheckerAndWorkerSelect?.description || '-'}
                </div>
              </div>
              {isSelectStatus === 'W' ? (
                isSelectAssignment ? (
                  <div className="button-wrapper">
                    <button className="submit" onClick={() => handleAssignmentChange()}>
                      변경
                    </button>
                    <button className="cancel" onClick={() => handleAssignmentCancel()} disabled={!!(isSelectId && !isWorkerAndCheckerLoading)}>
                      해제
                    </button>
                  </div>
                ) : (
                  <div className="button-wrapper">
                    <button onClick={() => handleWorkerAndCheckerList(1)}>작업자 지정</button>
                  </div>
                )
              ) : null}
            </div>
            {(isSelectStatus === 'N' || isSelectStatus === 'C') && (
              <div className="list-box">
                <div className="header">현재 검수자</div>
                <div className="header-list">
                  <div>ID</div>
                  <div>설명</div>
                </div>
                <div className="header-content">
                  <div>{isSelectStatus !== 'N' ? isSelectAssignment?.account || '-' : isWorkerCheckerAndWorkerSelect?.account || '-'}</div>
                  <div>{isSelectStatus !== 'N' ? isSelectAssignment?.description || '-' : isWorkerCheckerAndWorkerSelect?.description || '-'}</div>
                </div>
                {isSelectStatus === 'C' ? (
                  isSelectAssignment ? (
                    <div className="button-wrapper">
                      <button className="submit" onClick={() => handleAssignmentChange()}>
                        변경
                      </button>
                      <button className="cancel" onClick={() => handleAssignmentCancel()} disabled={!!(isSelectId && !isWorkerAndCheckerLoading)}>
                        해제
                      </button>
                    </div>
                  ) : (
                    <div className="button-wrapper">
                      <button onClick={() => handleWorkerAndCheckerList(1)}>검수자 지정</button>
                    </div>
                  )
                ) : null}
              </div>
            )}
            {isSelectId && !isWorkerAndCheckerLoading && (
              <>
                <div className="list-box">
                  <div className="header">사용자 검색</div>
                  <form className="search-input" onSubmit={onSubmit}>
                    <input {...register('search')} type="text" name="search" placeholder="사용자를 검색하세요..." />
                    <Search width="24" height="24" onClick={onSubmit} />
                  </form>
                  <div className="search-list">
                    <div>ID</div>
                    <div>설명</div>
                  </div>
                  <ul className="search-content">
                    {isWorkerAndCheckerList.map((item) => (
                      <li
                        key={`worker-and-checker-${item.id}`}
                        className={classNames({ active: isWorkerAndCheckerSelect?.id === item.id })}
                        onClick={() => handleWorkAndCheckerClick(item)}
                      >
                        <div>{item.account}</div>
                        <div>{item.description}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="pagination">
                    <Pagination2
                      currentPage={isWorkerAndCheckerPage?.current_page || 1}
                      totalPages={isWorkerAndCheckerPage?.total_pages || 1}
                      onPageChange={(page) => {
                        handleWorkerAndCheckerList(page);
                      }}
                    />
                  </div>
                  <div className="button-wrapper">
                    <button className="out" onClick={() => handleWorkerAndCheckerCancel()}>
                      취소
                    </button>
                    <button onClick={() => handleWorkerAndCheckerRegister()} disabled={!isWorkerAndCheckerSelect}>
                      등록
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="button-wrapper">
              <button className="out" onClick={handleResetWorkerAndChecker}>
                나가기
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceProjectAssignment;
