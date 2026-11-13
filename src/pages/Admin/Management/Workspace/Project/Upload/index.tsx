/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import { useWorkspaceProjectUploadActions } from 'actions/workspace-project-upload-actions';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import qs from 'qs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import { workspaceProjectUploadAtom, workspaceProjectUploadListSelector } from 'state/workspace-project-upload';
import styled from 'styled-components';
import { IAlert, IApi } from 'types/interface';
import { IWorkspaceProjectUploadList } from 'types/workspace-project-upload-interface';
import axios from 'utils/axios';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import Title from 'components/Common/Admin/Title';
import UploadStatus from 'components/Common/Admin/UploadStatus';
import Pagination from 'components/Common/Pagination';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import NaviArrow from 'components/SVG/Icon/NaviArrow';

const Container = styled.section`
  padding: 40px;
  width: 1680px;
  .upload-container {
    margin-top: 28px;
    width: 1020px;
    .upload-data {
      width: 1020px;
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      padding: 30px;
      margin-bottom: 40px;
      .title-box {
        display: flex;
        justify-content: space-between;
        .title {
          color: #111;
          font-size: ${({ theme }) => theme.fontSize.text_16};
          font-weight: 700;
        }
      }
      .upload-status {
        padding: 30px;
        font-size: ${({ theme }) => theme.fontSize.text_16};
        font-weight: 500;
        color: #111;
        display: flex;
        margin-top: 20px;
        border-radius: 6px;
        border: solid 1px ${({ theme }) => theme.adminColor.line1};
        .title {
          margin-right: 60px;
        }
        ul {
          li {
            margin-bottom: 16px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .upload-list {
        margin-top: 20px;
        position: relative;
        ul.header {
          background-color: #f4f6f8;
          height: 70px;
          display: flex;
          align-items: center;
          color: #888888;
          font-weight: 500;
        }
        ul.body {
          margin-bottom: 40px;
          max-height: 480px;
          overflow-y: auto;
          color: ${({ theme }) => theme.adminColor.txt2};
          font-weight: 500;
          li {
            display: flex;
            height: 70px;
            align-items: center;
            border-bottom: 1px solid ${({ theme }) => theme.adminColor.line2};
          }
        }
        .error {
          color: ${({ theme }) => theme.adminColor.txt1};
        }
        .success {
          color: #33a87b;
        }
        .li-1 {
          width: 60px;
          display: flex;
          justify-content: center;
        }
        .li-2 {
          width: 50px;
          display: flex;
          justify-content: center;
        }
        .li-3 {
          width: 450px;
          padding-left: 30px;
        }
        .li-4 {
          width: 200px;
          display: flex;
          justify-content: center;
        }
        .retry {
          display: flex;
          align-items: center;
          button {
            width: 28px;
            height: 28px;
            margin-left: 12px;
            svg {
              margin: 0;
            }
          }
        }
        .upload-progress {
          width: 100%;
          height: 30px;
          background-color: ${({ theme }) => theme.adminColor.hover};
          border-radius: 4px;
          .upload-progress-bar {
            height: 100%;
            display: flex;
            align-items: center;
            background-color: ${({ theme }) => theme.adminColor.primary};
            justify-content: center;
            .upload-progress-text {
              font-size: ${({ theme }) => theme.fontSize.text_14};
              color: ${({ theme }) => theme.adminColor.white};
              font-weight: 500;
            }
          }
        }
        .pagination {
          padding-bottom: 63px;
        }
        .btn-change {
          position: absolute;
          right: 0;
          bottom: -48px;
          &.paging {
            bottom: 3px;
          }
          button {
            width: 84px;
          }
        }
      }
    }
    .btn-wrapper {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
      button {
        width: 132px;
      }
    }
  }
`;

const ManagementWorkspaceProjectUpload: React.FC = () => {
  const { id, projectId } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const [itemProgress, setItemProgress] = useState<{ [key: string]: { percent: number; finish: boolean; error: boolean } }>({});
  const [isFileCheck, setIsFileCheck] = useState<IWorkspaceProjectUploadList | null>(null); // 체크박스 체크된 리스트
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { detail } = useWorkspaceManagementActions();
  const { list } = useWorkspaceProjectUploadActions();
  const workspaceProjectUpload = useRecoilValue(workspaceProjectUploadAtom);
  const [workspaceProjectUploadList, setWorkspaceProjectUploadList] = useRecoilState(workspaceProjectUploadListSelector); // 업로드 리스트
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const [retryFileList, setRetryFileList] = useState<{ file_id: string; file_type: string; file: File }[]>([]); // 재시도 파일 리스트

  useEffect(() => {
    // 워크스페이스 조회
    onWorkspaceDetail();
  }, []);

  useEffect(() => {
    // 업로드 리스트 페이징
    onWorkspaceProjectUpload();
  }, [search]);

  // 업로드 리스트 조회
  const onWorkspaceProjectUpload = async () => {
    try {
      await list({ workspaceId: id as string, projectId: projectId as string, page: query.page ? Number(query.page) : 1 });
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '업로드 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
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

  const onAlertSetting = (open: boolean, title: string, content: string, type: string, alertType: 'alert' | 'confirm') => {
    setIsAlert({
      open,
      title,
      content,
      type,
      alertType,
    });
  };

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const onCancel = () => {
    onAlertSetting(false, '', '', '', 'alert');
  };

  const onPageChange = (page: number) => {
    const newQuery = { ...query, page };
    // 페이징 클릭시
    navigate(
      `${PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_UPLOAD.replace(':id', id as string).replace(':projectId', projectId as string)}?${qs.stringify(
        newQuery,
      )}`,
    );
  };

  const handleFileCheck = (file: IWorkspaceProjectUploadList) => {
    setIsFileCheck(file);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (isFileCheck) {
        // 데이터 교체는 파일명이 같아야함
        if (isFileCheck.file_name !== file.name) {
          onAlertSetting(true, '알림', '파일명이 일치하지 않습니다.', 'back', 'alert');
          return;
        }
        const formData = {
          file_id: isFileCheck.file_id,
          file_type: isFileCheck.file_type,
          file,
        };
        setRetryFileList([...retryFileList, formData]);
        // 데이터 교체 api
        handleUpload(formData);
      }
      e.target.value = '';
    }
  };

  // 데이터 교체한 파일이 업로드가 실패되었을때 다시 retry할 경우(네트워크,서버,클라이언트 에러인경우)
  const handleRetry = (fileId?: string) => {
    if (fileId) {
      const findRetryFile = retryFileList.find((item) => item.file_id === fileId);
      if (findRetryFile) {
        handleUpload(findRetryFile);
      }
    }
  };

  // 업로드
  const handleUpload = async (formData: { file_id: string; file_type: string; file: File }) => {
    if (isFileCheck) {
      try {
        const {
          data: { code, message, result },
        }: AxiosResponse<IApi> = await axios.post(`/admin/project/file/reupload/${id}/${projectId}`, formData, {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              // 퍼센트 게이지 계산
              const percentage = (progressEvent.loaded * 100) / progressEvent.total;
              const percentCompleted = Math.round(percentage);
              setItemProgress((prevProgress) => ({
                ...prevProgress,
                [isFileCheck.file_id]: {
                  percent: percentCompleted === 100 ? 99 : percentCompleted,
                  finish: false,
                  error: false,
                },
              }));
            }
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 2000000,
        });
        if (code === 'F000' && result) {
          // 성공할 경우 retry File에서 제거
          setRetryFileList((prevList) => {
            const newList = prevList.filter((item) => item.file_id !== isFileCheck.file_id);
            return newList;
          });
          // 성공시 progress 제거
          setItemProgress((prevProgress) => {
            if (prevProgress[isFileCheck.file_id]) {
              delete prevProgress[isFileCheck.file_id];
            }
            return { ...prevProgress };
          });
          // 업로드 성공시 파일 상태 변경
          const newWorkspaceProjectUploadList = workspaceProjectUploadList.map((item) => {
            if (item.file_id === isFileCheck.file_id) {
              return {
                ...item,
                file_status: 'Success',
              };
            }
            return item;
          });
          setWorkspaceProjectUploadList(newWorkspaceProjectUploadList);
        } else {
          // 실패할 경우 error처리
          setItemProgress((prevProgress) => {
            if (prevProgress[isFileCheck.file_id]) {
              prevProgress[isFileCheck.file_id].error = true;
            }
            return { ...prevProgress };
          });
          onAlertSetting(true, '알림', message, 'back', 'alert');
        }
      } catch (err) {
        // 실패할 경우 error처리
        setItemProgress((prevProgress) => {
          if (prevProgress[isFileCheck.file_id]) {
            prevProgress[isFileCheck.file_id].error = true;
          }
          return { ...prevProgress };
        });
        onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '업로드를 실패했습니다'}`, 'back', 'alert');
      }
    }
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
        <Title
          className="title-box"
          title={`${workspaceProjectUpload.projectName} 프로젝트 업로드 상태`}
          backUrl={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string)}
        />

        <div className="upload-container">
          <div className="upload-data">
            <div className="title-box">
              <div className="title">데이터 등록</div>
            </div>
            <div className="upload-status">
              <div className="title">업로드 내역 상세</div>
              <ul>
                <li>
                  전체 업로드 데이터: <b>{workspaceProjectUpload.totalCount}</b>
                </li>
                <li>
                  업로드 완료 데이터: <b>{workspaceProjectUpload.successCount}</b>
                </li>
                <li>
                  업로드 에러 데이터: <b>{workspaceProjectUpload.errorCount}</b>
                </li>
              </ul>
            </div>
            <div className="upload-list">
              <ul className="header">
                <li className="li-1" />
                <li className="li-2">No</li>
                <li className="li-3">파일명</li>
                <li className="li-4">상태</li>
                <li className="li-4">크기</li>
              </ul>
              <ul className="body">
                {workspaceProjectUploadList.map((item, index) => (
                  <UploadStatus
                    key={`${item.file_id}-${index}`}
                    item={item}
                    index={index}
                    isFileCheck={isFileCheck}
                    handleFileCheck={handleFileCheck}
                    progress={itemProgress[item.file_id] || 0}
                    handleRetry={handleRetry}
                  />
                ))}
              </ul>
              {!workspaceProjectUpload.isLoading && workspaceProjectUpload.totalPage !== 1 && (
                <div className="pagination">
                  <Pagination totalPages={workspaceProjectUpload.totalPage || 0} onPageChange={onPageChange} />
                </div>
              )}
              <div className={classNames('btn-change', { paging: !workspaceProjectUpload.isLoading && workspaceProjectUpload.totalPage !== 1 })}>
                <Button size="s" variant="outline" disabled={!isFileCheck || !!itemProgress[isFileCheck.file_id]} onClick={handleFileOpen}>
                  데이터 교체
                </Button>
              </div>
            </div>
          </div>
        </div>
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceProjectUpload;
