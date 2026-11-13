import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWorkspaceProjectUploadActions } from 'actions/workspace-project-upload-actions';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import {
  workspaceProjectUploadCompleteFileSelector,
  workspaceProjectUploadFileListSelector,
  workspaceProjectUploadFileSuccessCountSelector,
  workspaceProjectUploadStatusSelector,
} from 'state/workspace-project-upload';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IApi } from 'types/interface';
import axios, { setToken } from 'utils/axios';
import { PATH_ADMIN_LIST, PATH_USER_MANAGEMENT_LIST } from 'utils/path';

import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import Logo from 'components/SVG/Icon/Logo';
import Logout from 'components/SVG/Icon/Logout';
import Member from 'components/SVG/Icon/Member';
import RecentUpload from 'components/SVG/Icon/RecentUpload';
import Upload from 'components/SVG/Icon/Upload';
import Workspace from 'components/SVG/Icon/Workspace';

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 240px;
  z-index: 4;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.adminColor.secondary};
  .content {
    width: 240px;
    height: 100%;
    padding: 26px 20px 60px;
    display: flex;
    flex-direction: column;
    .auth-id {
      margin-top: 40px;
      border: 1px solid #3b475d;
      border-radius: 10px;
      text-align: center;
      width: 100%;
      background-color: ${({ theme }) => theme.workerColor.hover};
      padding: 10px 0px;
      font-size: ${({ theme }) => theme.fontSize.text_18};
      color: ${({ theme }) => theme.workerColor.txt2};
      font-weight: bold;
      line-height: 20px;
    }
    ul.admin-menu {
      margin-top: 20px;
      li {
        display: flex;
        font-size: 16px;
        color: ${({ theme }) => theme.workerColor.txt2};
        width: 100%;
        cursor: pointer;
        margin-bottom: 10px;
        line-height: 18px;
        a {
          width: 100%;
          display: block;
          padding: 16px 0px 16px 20px;
          border-radius: 10px;
          svg {
            margin-right: 14px;
          }
          &:hover {
            background-color: ${({ theme }) => theme.workerColor.hover};
          }
          &.active {
            background-color: #263f74;
            font-weight: 700;
            color: ${({ theme }) => theme.adminColor.white};
          }
        }
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .upload-status {
      width: 100%;
      background-color: ${({ theme }) => theme.workerColor.line1};
      border-radius: 10px;
      margin-top: 40px;
      .upload-progress {
        border-bottom: 1px solid #3b475d;
        padding: 10px 10px 20px;
        .upload-progress-title {
          font-size: ${({ theme }) => theme.fontSize.text_16};
          color: ${({ theme }) => theme.adminColor.white};
          font-weight: 500;
          display: flex;
          align-items: center;
          svg {
            margin-right: 8px;
          }
        }
        .upload-progress-box-empty {
          padding: 0px 10px;
          margin-top: 20px;
          font-size: ${({ theme }) => theme.fontSize.text_12};
          color: ${({ theme }) => theme.workerColor.txt2};
          font-weight: 500;
        }
        .upload-progress-box {
          background-color: ${({ theme }) => theme.workerColor.hover};
          border-radius: 8px;
          margin-top: 10px;
          padding: 10px;
          cursor: pointer;
          .upload-progress-box-title {
            color: ${({ theme }) => theme.adminColor.white};
            font-size: ${({ theme }) => theme.fontSize.text_12};
            font-weight: 500;
            margin-bottom: 8px;
          }
          .upload-progress-box-bar {
            width: 100%;
            position: relative;
            height: 8px;
            background-color: #151b27;
            border-radius: 4px;
            .upload-progress-box-bar-inner {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              background-color: #33a87b;
              border-radius: 4px;
            }
          }
          .upload-progress-box-percentage {
            margin-top: 8px;
            font-size: ${({ theme }) => theme.fontSize.text_12};
            font-weight: 500;
            color: ${({ theme }) => theme.workerColor.txt2};
          }
        }
      }
      .upload-complete {
        padding: 20px 10px 30px;
        .upload-complete-title {
          font-size: ${({ theme }) => theme.fontSize.text_16};
          color: ${({ theme }) => theme.adminColor.white};
          font-weight: 500;
          display: flex;
          align-items: center;
          svg {
            margin-right: 8px;
          }
        }
        .upload-complete-empty {
          padding: 0px 10px;
          font-size: ${({ theme }) => theme.fontSize.text_12};
          color: ${({ theme }) => theme.workerColor.txt2};
          font-weight: 500;
          margin-top: 20px;
        }
        .upload-complete-box {
          background-color: ${({ theme }) => theme.workerColor.hover};
          border-radius: 8px;
          padding: 10px;
          margin-top: 10px;
          .upload-complete-box-title {
            color: ${({ theme }) => theme.adminColor.white};
            font-size: ${({ theme }) => theme.fontSize.text_12};
            font-weight: 500;
          }
        }
      }
    }
    ul.user-menu {
      margin-top: 20px;
      border-radius: 10px;
      background-color: #263f74;
      height: calc(100% - 166px);
      li {
        &.sidebar-list {
          height: calc(100% - 52px);
          overflow-y: auto;
          &::-webkit-scrollbar {
            background-color: #f4f6f8;
            width: 10px;
            height: 16px;
          }

          &::-webkit-scrollbar-track {
            background-color: #f4f6f8;
          }

          &::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.adminColor.boxBorder};
            border-radius: 16px;
          }

          &::-webkit-scrollbar-button {
            display: none;
          }
        }
        &.home {
          border-bottom: 1px solid #17284d;
          &.active {
            a {
              svg {
                path {
                  stroke: ${({ theme }) => theme.adminColor.white};
                }
              }
              span {
                color: ${({ theme }) => theme.adminColor.white};
              }
            }
          }
          a {
            svg {
              margin-right: 14px;
            }
            span {
              font-size: ${({ theme }) => theme.fontSize.text_16};
              font-weight: 700;
              color: ${({ theme }) => theme.workerColor.txt2};
            }
          }
        }
        a {
          padding: 17px 20px;
          display: flex;
          align-items: center;
          span {
            font-size: ${({ theme }) => theme.fontSize.text_14};
            color: ${({ theme }) => theme.workerColor.txt2};
          }
        }
        &.active {
          span {
            font-weight: 700;
            color: ${({ theme }) => theme.adminColor.white};
          }
        }
      }
    }
    .logout {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px;
      margin-top: auto;
      cursor: pointer;
      svg {
        margin-right: 14px;
      }
      span {
        font-size: ${({ theme }) => theme.fontSize.text_16};
        font-weight: 500;
        color: ${({ theme }) => theme.workerColor.txt2};
      }
    }
  }
`;

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUpload } = useWorkspaceProjectUploadActions();
  const [projectUploadFileList, setProjectUploadFileList] = useRecoilState(workspaceProjectUploadFileListSelector);
  const [completeFile, setCompleteFile] = useRecoilState(workspaceProjectUploadCompleteFileSelector);
  const [uploadFileStatus, setUploadFileStatus] = useRecoilState(workspaceProjectUploadStatusSelector);
  const [successCount, setSuccessCount] = useRecoilState(workspaceProjectUploadFileSuccessCountSelector);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    fetchCurrentUpload();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (projectUploadFileList.list.length) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (projectUploadFileList.list.length && uploadFileStatus) {
      setUploadFileStatus(false);
      fetchUploadFileList();
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [projectUploadFileList.list.length, uploadFileStatus]);

  const fetchCurrentUpload = async () => {
    try {
      await currentUpload();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUploadFileList = async () => {
    for (const [_, file] of projectUploadFileList.list.entries()) {
      try {
        const url = `/admin/project/file/upload/${file.workspace_id}/${file.project_id}`;
        const {
          data: { code, result },
        }: AxiosResponse<IApi> = await axios.post(
          url,
          {
            file: file.file,
          },
          {
            timeout: 120000,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (code === 'F000' && result) {
          setSuccessCount((prev) => prev + 1);
        }
      } catch (err) {
        console.error(err);
      }
    }
    const completeFileParing = {
      title: projectUploadFileList.title,
      workspaceId: projectUploadFileList.workspaceId,
    };
    window.localStorage.setItem('completeFile', JSON.stringify(completeFileParing));
    setProjectUploadFileList({
      title: '',
      list: [],
      workspaceId: '',
      projectId: [],
    });
    setSuccessCount(0);
    setUploadFileStatus(true);
    fetchCurrentUpload();
  };

  const handleWorkspaceMove = (workspaceId: string) => {
    navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', workspaceId));
  };

  const handleLogout = () => {
    if (projectUploadFileList.list.length) {
      setIsAlert(true);
      return;
    }
    window.localStorage.removeItem('user');
    setCompleteFile(null);
    setToken('');
    navigate(PATH_ADMIN_LIST.LOGIN);
    // 로그아웃
  };

  const onCancel = () => {
    setIsAlert(false);
  };

  return (
    <Container>
      {isAlert && (
        <ModalContainer id="modal">
          <Alert
            title="알림"
            type="alert"
            content="업로드가 진행 중입니다.<br/>업로드가 완료 후 로그아웃 가능 합니다."
            onCancel={onCancel}
            onConfirm={onCancel}
          />
        </ModalContainer>
      )}
      <div className="content">
        <Logo width="200" height="30" color={theme.adminColor.white} />
        <div className="auth-id">Admin</div>
        <ul className="admin-menu">
          <li>
            <Link to={PATH_ADMIN_LIST.USER_MANAGEMENT} className={classNames({ active: PATH_USER_MANAGEMENT_LIST.includes(pathname) })}>
              <Member width="16" height="16" color={PATH_USER_MANAGEMENT_LIST.includes(pathname) ? theme.workerColor.white : theme.workerColor.txt2} />
              <span>사용자 관리</span>
            </Link>
          </li>
          <li>
            <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT} className={classNames({ active: pathname.includes('/admin/workspace') })}>
              <Workspace width="16" height="16" color={pathname.includes('/admin/workspace') ? theme.workerColor.white : theme.workerColor.txt2} />
              <span>워크스페이스 관리</span>
            </Link>
          </li>
        </ul>
        <div className="upload-status">
          <div className="upload-progress">
            <div className="upload-progress-title">
              <Upload width="16" height="16" color={theme.workerColor.txt2} />
              <span>업로드 진행 상황</span>
            </div>
            {projectUploadFileList.list.length ? (
              <div className="upload-progress-box" onClick={() => handleWorkspaceMove(projectUploadFileList.workspaceId)}>
                <div className="upload-progress-box-title">{projectUploadFileList.title}</div>
                <div className="upload-progress-box-bar">
                  <div
                    className="upload-progress-box-bar-inner"
                    style={{ width: `${Math.round((successCount / projectUploadFileList.list.length) * 100)}%` }}
                  />
                </div>
                <div className="upload-progress-box-percentage">{Math.round((successCount / projectUploadFileList.list.length) * 100)}%</div>
              </div>
            ) : (
              <div className="upload-progress-box-empty">업로드 항목이 없습니다</div>
            )}
          </div>
          <div className="upload-complete">
            <div className="upload-complete-title">
              <RecentUpload width="16" height="16" color={theme.workerColor.txt2} />
              <span>최근 업로드 완료</span>
            </div>
            {completeFile ? (
              <div className="upload-complete-box">
                <Link to={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', completeFile.workspace_id)}>
                  <div className="upload-complete-box-title">{completeFile.workspace_name}</div>
                </Link>
              </div>
            ) : (
              <div className="upload-complete-empty">최근 업로드 완료 항목이 없습니다</div>
            )}
          </div>
        </div>

        <div className="logout" onClick={handleLogout}>
          <Logout width="16" height="16" color="#acaebe" />
          <span>로그아웃</span>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
