import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import { useWorkspaceProjectActions } from 'actions/workspace-project-actions';
import classNames from 'classnames';
import { format } from 'date-fns';
import qs from 'qs';
import { useRecoilValue } from 'recoil';
import {
  workspaceCodeProjectPostCodeListSelector,
  workspaceCodeProjectStatusCodeListSelector,
  workspaceCodeProjectToolTypeCodeListSelector,
  workspaceCodeProjectUploadCodeListSelector,
} from 'state/workspace-code';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import { workspaceProjectManagementAtom } from 'state/workspace-project-management';
import { workspaceProjectUploadFileListSelector } from 'state/workspace-project-upload';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IAlert, IOption } from 'types/interface';
import { IWorkspaceProjectList } from 'types/workspace-project-management-interface';
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
import Folder from 'components/SVG/Icon/Folder';
import NaviArrow from 'components/SVG/Icon/NaviArrow';
import Plus from 'components/SVG/Icon/Plus';
import Reset from 'components/SVG/Icon/Reset';

const Container = styled.section`
  padding: 34px 40px 40px;
  width: 1680px;
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
    .status-select {
      width: 170px;
      margin-right: 10px;
    }
    .project-status-select {
      width: 190px;
      margin-right: 10px;
    }
    .project-select {
      width: 191px;
      margin-right: 10px;
    }
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
    .name-input {
      width: 260px;
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
    align-items: center;
    span {
      color: ${({ theme }) => theme.adminColor.primary};
    }
    .btn-wrapper {
      display: flex;
      button {
        width: 44px;
        margin-right: 10px;
        &:last-child {
          width: 68px;
          margin-right: 0;
        }
      }
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
          width: 220px;
        }
        &:nth-child(4) {
          width: 120px;
        }
        &:nth-child(5) {
          width: 200px;
        }
        &:nth-child(6) {
          width: 110px;
        }
        &:nth-child(7) {
          width: 120px;
        }
        &:nth-child(8) {
          width: 120px;
        }
        &:nth-child(9) {
          width: 120px;
        }
        &:nth-child(10) {
          width: 120px;
        }
        &:nth-child(11) {
          width: 120px;
        }
        &:nth-child(12) {
          width: 120px;
        }
        &:nth-child(13) {
          width: 120px;
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
  toolType: IOption | null;
  uploadStatus: IOption | null;
  projectStatus: IOption | null;
  postStatus: IOption | null;
  startDate: string | null;
  endDate: string | null;
}

const ManagementWorkspaceProject = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const { detail } = useWorkspaceManagementActions();
  const { list, projectPost, projectDelete, projectToolTypeCodeList, projectUploadCodeList, projectStatusCodeList, projectPostCodeCodeList } =
    useWorkspaceProjectActions();
  const workspaceProjectManagement = useRecoilValue(workspaceProjectManagementAtom);
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const projectToolTypeCode = useRecoilValue(workspaceCodeProjectToolTypeCodeListSelector);
  const projectUploadCode = useRecoilValue(workspaceCodeProjectUploadCodeListSelector);
  const projectStatusCode = useRecoilValue(workspaceCodeProjectStatusCodeListSelector);
  const projectPostCode = useRecoilValue(workspaceCodeProjectPostCodeListSelector);
  const uploadFileList = useRecoilValue(workspaceProjectUploadFileListSelector);
  const projectUploadFileList = useRecoilValue(workspaceProjectUploadFileListSelector);

  const [checkList, setCheckList] = useState<string[]>([]); // 체크박스 체크된 리스트
  const [calendarType, setCalendarType] = useState<string>('');
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const { register, setValue, watch, reset, handleSubmit } = useForm<IForm>({
    defaultValues: {
      query: query.query ? String(query.query) : '',
      toolType: query.tool_type ? projectToolTypeCode.find((item) => item.value === String(query.tool_type)) : projectToolTypeCode[0],
      uploadStatus: query.upload_status ? projectUploadCode.find((item) => item.value === String(query.upload_status)) : projectUploadCode[0],
      projectStatus: query.project_status ? projectStatusCode.find((item) => item.value === String(query.project_status)) : projectStatusCode[0],
      postStatus: query.post_status ? projectPostCode.find((item) => item.value === String(query.post_status)) : projectPostCode[0],
      startDate: query.start_date ? String(query.start_date) : null,
      endDate: query.end_date ? String(query.end_date) : null,
    },
  });

  useEffect(() => {
    // 검색 필터들 조회
    if (!projectToolTypeCode.length) {
      onWorkspaceProjectToolType();
    }
    if (!projectUploadCode.length) {
      onWorkspaceProjectUpload();
    }
    if (!projectStatusCode.length) {
      onWorkspaceProjectStatus();
    }
    if (!projectPostCode.length) {
      onWorkspaceProjectPostStatus();
    }
    onWorkspaceDetail();
  }, [id]);

  // 검색 필더가 다 조회된 경우 리스트 조회
  useEffect(() => {
    if (projectToolTypeCode.length && projectUploadCode.length && projectStatusCode.length && projectPostCode.length) {
      onList();
    }
  }, [search, projectToolTypeCode.length, projectUploadCode.length, projectStatusCode.length, projectPostCode.length, id]);

  const onWorkspaceProjectToolType = async () => {
    try {
      await projectToolTypeCodeList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '가공 유형 조회에 실패하였습니다.'}`, 'back', 'alert');
    }
  };

  const onWorkspaceProjectUpload = async () => {
    try {
      await projectUploadCodeList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '업로드 상태 조회에 실패하였습니다.'}`, 'back', 'alert');
    }
  };

  const onWorkspaceProjectStatus = async () => {
    try {
      await projectStatusCodeList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '프로젝트 상태 조회에 실패하였습니다.'}`, 'back', 'alert');
    }
  };

  const onWorkspaceProjectPostStatus = async () => {
    try {
      await projectPostCodeCodeList();
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '게시 상태 조회에 실패하였습니다.'}`, 'back', 'alert');
    }
  };

  // 워크스페이스 조회
  const onWorkspaceDetail = async () => {
    try {
      await detail(id as string);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 리스트 조회
  const onList = async () => {
    try {
      const queryData = {
        workspaceId: id as string,
        page: query.page ? Number(query.page) : 1,
        toolType: query.tool_type ? String(query.tool_type) : projectToolTypeCode[0].value,
        uploadStatus: query.upload_status ? String(query.upload_status) : projectUploadCode[0].value,
        projectStatus: query.project_status ? String(query.project_status) : projectStatusCode[0].value,
        postStatus: query.post_status ? String(query.post_status) : projectPostCode[0].value,
        query: query.query ? String(query.query) : '',
        startDate: query.start_date ? String(query.start_date) : null,
        endDate: query.end_date ? String(query.end_date) : null,
      };
      reset({
        query: query.query ? String(query.query) : '',
        toolType: query.tool_type ? projectToolTypeCode.find((item) => item.value === String(query.tool_type)) : projectToolTypeCode[0],
        uploadStatus: query.upload_status ? projectUploadCode.find((item) => item.value === String(query.upload_status)) : projectUploadCode[0],
        projectStatus: query.project_status ? projectStatusCode.find((item) => item.value === String(query.project_status)) : projectStatusCode[0],
        postStatus: query.post_status ? projectPostCode.find((item) => item.value === String(query.post_status)) : projectPostCode[0],
        startDate: query.start_date ? String(query.start_date) : null,
        endDate: query.end_date ? String(query.end_date) : null,
      });
      await list(queryData);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 조회에 실패하였습니다'}`, '', 'alert');
    }
  };

  const handleSearchFilter = (option: IOption, type: 'toolType' | 'uploadStatus' | 'projectStatus' | 'postStatus') => {
    setValue(type, option);
  };

  const onPageChange = (page: number) => {
    const newQuery = { ...query, page };
    navigate(`${PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string)}?${qs.stringify(newQuery)}`);
  };

  // 검색
  const onSubmit = handleSubmit(({ toolType, uploadStatus, projectStatus, postStatus, query, startDate, endDate }) => {
    const queryData = {} as {
      tool_type?: string;
      upload_status?: string;
      project_status?: string;
      post_status?: string;
      query?: string;
      start_date?: string;
      end_date?: string;
    };
    if (toolType) {
      queryData.tool_type = String(toolType.value);
    }
    if (uploadStatus) {
      queryData.upload_status = String(uploadStatus.value);
    }
    if (projectStatus) {
      queryData.project_status = String(projectStatus.value);
    }
    if (postStatus) {
      queryData.post_status = String(postStatus.value);
    }
    if (query) {
      queryData.query = query;
    }
    if (startDate) {
      queryData.start_date = startDate;
    }
    if (endDate) {
      queryData.end_date = endDate;
    }
    navigate(`${PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string)}?${qs.stringify(queryData)}`);
  });

  const handleReset = () => {
    reset({
      query: '',
      toolType: projectToolTypeCode[0],
      uploadStatus: projectUploadCode[0],
      projectStatus: projectStatusCode[0],
      postStatus: projectPostCode[0],
      startDate: null,
      endDate: null,
    });
  };

  const onConfirm = async () => {
    const { type } = isAlert;
    if (type === 'delete') {
      try {
        checkList.forEach((item) => {
          const project = workspaceProjectManagement.list.find((project) => project.project_id === item);
          // 일시정지 및 게시중인 프로젝트는 삭제 불가
          if (project?.upload_status === 'Success' && project?.post_status === '일시중지') {
            throw new Error('진행 및 게시중인 프로젝트가 있어 삭제 불가합니다.');
          }
        });
        await projectDelete({
          workspaceId: id as string,
          projectIds: checkList,
        });
        onAlertSetting(true, '삭제 완료 알림', '삭제가 완료되었습니다', '', 'alert');
        setCheckList([]);
      } catch (err) {
        onAlertSetting(
          true,
          '삭제 불가 알림',
          `${isCustomError(err) && err?.message ? err.message : '진행 및 게시중인 프로젝트가 있어 삭제 불가합니다.'}`,
          '',
          'alert',
        );
      }
      return;
    } else if (type === 'post') {
      checkList.forEach((item) => {
        const project = workspaceProjectManagement.list.find((project) => project.project_id === item);
        // 업로드 진행중 및 게시중인 프로젝트는 게시 불가
        if (project?.upload_status === 'Pending' && project.post_status === '게시중') {
          throw new Error('업로드 및 게시중인 프로젝트가 있어 삭제 불가합니다.');
        }
      });
      try {
        await projectPost({ workspaceId: id as string, projectIds: checkList, postStatus: 'PJ_POST_ST_ON' });
        setCheckList([]);
        onCancel();
      } catch (err) {
        onAlertSetting(true, '게시 불가 알림', `${isCustomError(err) && err?.message ? err.message : '게시 불가합니다.'}`, '', 'alert');
      }
      return;
    } else if (type === 'pause') {
      checkList.forEach((item) => {
        const project = workspaceProjectManagement.list.find((project) => project.project_id === item);
        // Pending이거나 일시정지일경우 일시정지 불가
        if (project?.upload_status === 'Pending' && project.post_status === '일시정지') {
          throw new Error('업로드 및 게시중인 프로젝트가 있어 삭제 불가합니다.');
        }
      });
      try {
        await projectPost({ workspaceId: id as string, projectIds: checkList, postStatus: 'PJ_POST_ST_OFF' });
        setCheckList([]);
        onCancel();
      } catch (err) {
        onAlertSetting(true, '일시정지 불가 알림', `${isCustomError(err) && err?.message ? err.message : '일시정지 불가합니다.'}`, '', 'alert');
      }
      return;
    }
    onCancel();
  };

  const onCancel = () => {
    onAlertSetting(false, '', '', '', 'alert');
  };

  // 체크박스 체크
  const handleCheck = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, projectId: string) => {
    e.stopPropagation();
    const successProject = workspaceProjectManagement.list.length - projectUploadFileList.projectId.length;
    if (projectId === 'all') {
      if (checkList.length === successProject) {
        setCheckList([]);
        return;
      }
      const newCheckList = [] as string[];
      workspaceProjectManagement.list.forEach((item) => {
        if (projectUploadFileList.projectId.includes(item.project_id)) {
          return;
        }
        newCheckList.push(item.project_id);
      });
      setCheckList(newCheckList);
      return;
    }
    if (checkList.includes(projectId)) {
      const newCheckList = checkList.filter((item) => item !== projectId);
      setCheckList(newCheckList);
      return;
    }
    const newCheckList = [...checkList, projectId];
    setCheckList(newCheckList);
  };

  const handleDeleteOpen = () => {
    onAlertSetting(true, '삭제 알림', `선택된 ${checkList.length}개의 프로젝트를 삭제하시겠습니까?`, 'delete', 'confirm');
  };

  const handlePostOpen = () => {
    onAlertSetting(true, '게시 알림', `선택된 ${checkList.length}개의 프로젝트를 게시하시겠습니까?`, 'post', 'confirm');
  };

  const handlePauseOpen = () => {
    onAlertSetting(true, '일시정지 알림', `프로젝트를 중지하면 작업목록에 표시되지 않습니다. \n중지하시겠습니까?`, 'pause', 'confirm');
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

  const handleWorkspaceLink = (project: IWorkspaceProjectList) => {
    if (project.upload_status === 'Success') {
      navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_ASSIGNMENT.replace(':id', id as string).replace(':projectId', project.project_id));
      return;
    }
    navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_UPLOAD.replace(':id', id as string).replace(':projectId', project.project_id));
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
        <span>워크스페이스 관리</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <b>&nbsp;{workspaceDetail?.name}</b>
      </Header>
      <Container>
        <Title
          className="title-box"
          title={workspaceDetail?.name || ''}
          backUrl={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT.replace(':id', id as string)}
          button={
            <>
              <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_REGISTER.replace(':id', id as string)}>
                <Button variant="secondary" disabled={!!uploadFileList.list.length}>
                  <Plus width="12" height="12" color={uploadFileList.list.length ? theme.adminColor.black : theme.adminColor.white} />새 프로젝트 등록
                </Button>
              </Link>
            </>
          }
        />
        <div className="report-wrapper">
          <ReportCard
            icon={<Folder width="30" height="30" color="#fa5" />}
            title="전체 프로젝트"
            count={workspaceProjectManagement.projectCount || 0}
            type="folder"
          />
        </div>
        <div className="sub-title">프로젝트 조회</div>
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
              className="project-select"
              list={projectToolTypeCode}
              onClick={(option) => handleSearchFilter(option, 'toolType')}
              selectOption={watch('toolType')}
              placeholderText="프로젝트 가공 유형"
            />
            <Select
              className="status-select"
              list={projectUploadCode}
              onClick={(option) => handleSearchFilter(option, 'uploadStatus')}
              selectOption={watch('uploadStatus')}
              placeholderText="업로드 상태"
            />
            <Select
              className="project-status-select"
              list={projectStatusCode}
              onClick={(option) => handleSearchFilter(option, 'projectStatus')}
              selectOption={watch('projectStatus')}
              placeholderText="프로젝트 상태"
            />
            <Select
              className="status-select"
              list={projectPostCode}
              onClick={(option) => handleSearchFilter(option, 'postStatus')}
              selectOption={watch('postStatus')}
              placeholderText="게시 상태"
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
            <span>{workspaceProjectManagement.resultCount || 0}</span>
            건의 검색결과가 있습니다.
          </div>
          {!!workspaceProjectManagement.list.length && (
            <div className="btn-wrapper">
              <Button variant="outline" size="s" disabled={!checkList.length} onClick={handleDeleteOpen}>
                삭제
              </Button>
              <Button variant="outline" size="s" disabled={!checkList.length} onClick={handlePostOpen}>
                게시
              </Button>
              <Button variant="outline" size="s" disabled={!checkList.length} onClick={handlePauseOpen}>
                일시정지
              </Button>
            </div>
          )}
        </div>
        {workspaceProjectManagement.isLoading ? null : workspaceProjectManagement.list.length ? (
          <div className="table">
            <Table>
              <thead>
                <tr>
                  <th>
                    <CheckBox
                      name="all"
                      checked={checkList.length === workspaceProjectManagement.list.length}
                      className="check-wrapper"
                      onClick={(e) => handleCheck(e, 'all')}
                    />
                  </th>
                  <th>No</th>
                  <th>프로젝트 명</th>
                  <th>데이터유형</th>
                  <th>가공 유형</th>
                  <th>카테고리 유형</th>
                  <th>가공 진행률</th>
                  <th>2차 가공 진행률</th>
                  <th>가공 완료</th>
                  <th>업로드 상태</th>
                  <th>프로젝트 상태</th>
                  <th>게시 상태</th>
                  <th>생성일자</th>
                </tr>
              </thead>
              <tbody>
                {workspaceProjectManagement.list.map((item, index) => (
                  <tr key={`table-${item.project_id}`} onClick={() => handleWorkspaceLink(item)}>
                    <td>
                      <CheckBox
                        name="all"
                        checked={checkList.includes(item.project_id)}
                        className="check-wrapper"
                        onClick={(e) => handleCheck(e, item.project_id)}
                        disabled={projectUploadFileList.projectId.includes(item.project_id)}
                      />
                    </td>
                    <td>{(workspaceProjectManagement.resultCount || 0) - ((query?.page ? Number(query.page) : 1) - 1) * 10 - index}</td>
                    <td>{item.name}</td>
                    <td>{item.data_type}</td>
                    <td>{item.tool_type}</td>
                    <td>{item.category_type}</td>
                    <td>{item.first_progress}</td>
                    <td>{item.second_progress}</td>
                    <td>{item.completed_progress}</td>
                    <td>{item.upload_status}</td>
                    <td>{item.project_status}</td>
                    <td>{item.post_status}</td>
                    <td>{item.created}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="table-empty">
            <TableEmpty>
              프로젝트가 없습니다.
              <br />
              프로젝트를 추가해주세요.
            </TableEmpty>
          </div>
        )}
        {!workspaceProjectManagement.isLoading && workspaceProjectManagement.totalPage !== 1 && (
          <div className="pagination">
            <Pagination totalPages={workspaceProjectManagement.totalPage || 0} onPageChange={onPageChange} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceProject;
