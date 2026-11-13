/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceCodeActions } from 'actions/workspace-code-action';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useCallbackPrompt } from 'hooks/useCallbackPrompt';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { workspaceCodeCategoryClientListSelector, workspaceCodeListSelector, workspaceCodeManufacturingListSelector } from 'state/workspace-code';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import { workspaceProjectUploadFileListSelector, workspaceProjectUploadStatusSelector } from 'state/workspace-project-upload';
import styled from 'styled-components';
import { IAlert, IApi, IOption } from 'types/interface';
import { IWorkspaceProjectUploadFileList } from 'types/workspace-project-upload-interface';
import axios from 'utils/axios';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import CheckBox from 'components/Common/Admin/CheckBox';
import FormLayout from 'components/Common/Admin/FormLayout';
import Select from 'components/Common/Admin/Select';
import Title from 'components/Common/Admin/Title';
import UploadExample from 'components/Common/Admin/UploadExample';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import InfoS from 'components/SVG/Icon/InfoS';
import NaviArrow from 'components/SVG/Icon/NaviArrow';
import UploadCloud from 'components/SVG/Icon/UploadCloud';

const Container = styled.section`
  padding: 40px;
  width: 1680px;
  .sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .step-title {
      display: flex;
      align-items: center;
      .step-box {
        font-size: ${({ theme }) => theme.fontSize.text_14};
        color: ${({ theme }) => theme.adminColor.primary};
        padding: 7px 12px;
        font-weight: 700;
        margin-right: 10px;
        background-color: rgba(51, 64, 168, 0.14);
        border-radius: 3px;
      }
      .step-title {
        font-size: ${({ theme }) => theme.fontSize.text_20};
        color: #111;
        font-weight: 500;
      }
    }
    .step {
      display: flex;
      span {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #888888;
        font-size: ${({ theme }) => theme.fontSize.text_14};
        font-weight: 500;
        border: 1px solid ${({ theme }) => theme.adminColor.line1};
        border-radius: 50%;
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
        &.active {
          background-color: #f4f7fa;
          font-weight: 700;
          color: ${({ theme }) => theme.adminColor.txt2};
        }
      }
    }
    font-size: ${({ theme }) => theme.fontSize.text_20};
    font-weight: 500;
    color: #111;
    margin-top: 40px;
  }

  .btn-wrapper {
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;
    button {
      width: 88px;
      &:first-child {
        margin-right: 10px;
      }
      &.btn-create {
        width: 146px;
        margin-right: 0;
      }
      &.btn-next {
        margin-right: 0;
      }
    }
  }
  .upload-container {
    display: flex;
    margin-top: 28px;
    .upload-data {
      width: 1020px;
      border: 1px solid ${({ theme }) => theme.adminColor.line1};
      padding: 30px;
      &.list {
        height: 730px;
        display: flex;
        flex-direction: column;
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        .title {
          color: #111;
          font-size: ${({ theme }) => theme.fontSize.text_16};
          font-weight: 700;
        }
        .folder-structure {
          display: flex;
          align-items: center;
          span {
            font-size: ${({ theme }) => theme.fontSize.text_16};
            font-weight: 500;
            color: #111;
            margin-right: 8px;
          }
          svg {
            cursor: pointer;
          }
        }
      }
      .upload-wrapper {
        height: 730px;
        display: flex;
        flex-direction: column;
      }
      .drag-wrapper {
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 631px;
        border: 1px solid ${({ theme }) => theme.adminColor.boxBorder};
        border-radius: 10px;
        background-color: #f4f6f8;
        .content {
          text-align: center;
          .text {
            margin-top: 12px;
            color: ${({ theme }) => theme.adminColor.txt2};
            font-weight: 500;
            font-size: ${({ theme }) => theme.fontSize.text_16};
          }
          .upload-btn {
            display: flex;
            justify-content: center;
            margin-top: 12px;
            button {
              width: 130px;
            }
          }
        }
      }
      .upload-list {
        margin-top: 20px;
        ul.header {
          background-color: #f4f6f8;
          height: 70px;
          display: flex;
          align-items: center;
          color: #888888;
          font-weight: 500;
        }
        ul.body {
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
          width: 650px;
          padding-left: 30px;
        }
        .li-4 {
          width: 200px;
          display: flex;
          justify-content: center;
        }
      }
      .upload-btn-wrapper {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        button {
          width: 84px;
          &:last-child {
            width: 44px;
          }
        }
      }
    }
  }
`;

interface IFormStep1 {
  dataType: IOption | null;
  toolType: IOption | null;
  categoryType: IOption | null;
}

interface IUploadFileList {
  folderName: string;
  subFolderList: {
    subFolderName: string;
    fileList: File[];
    subError: boolean;
    fileSize: number;
  }[];
  fileSize: number;
  error: boolean;
}

const ManagementWorkspaceProjectRegister: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { detail } = useWorkspaceManagementActions();
  const { list, manufacturingList, categoryClientList } = useWorkspaceCodeActions();
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const workspaceCodeList = useRecoilValue(workspaceCodeListSelector);
  const workspaceCodeManufacturingList = useRecoilValue(workspaceCodeManufacturingListSelector);
  const workspaceCategoryClientList = useRecoilValue(workspaceCodeCategoryClientListSelector);
  const [workspaceProjectUploadFileList, setWorkspaceProjectUploadFileList] = useRecoilState(workspaceProjectUploadFileListSelector);
  const setWorkspaceProjectUploadStatus = useSetRecoilState(workspaceProjectUploadStatusSelector);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUploadStructure, setIsUploadStructure] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [isUploadStatus, _] = useState(false);
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<IFormStep1>({
    mode: 'onChange',
    defaultValues: {
      dataType: {
        value: 'D_TYPE_VIDEO',
        name: '비디오',
      },
      toolType: {
        value: 'T_TYPE_CC',
        name: '복합대화',
      },
      categoryType: null,
    },
  });

  // 폼 유효성 검사
  register('dataType', { required: true });
  register('toolType', { required: true });
  register('categoryType', { required: true });

  const [uploadFileList, setUploadFileList] = useState<IUploadFileList[]>([]);
  const [isCheckUploadFileList, setIsCheckUploadFileList] = useState<number[]>([]);

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isUploadStatus);

  useEffect(() => {
    // 워크스페이스 조회
    onWorkspaceDetail();
    onWorkspaceCode();
    onWorkspaceManufacturing('D_TYPE_VIDEO');
    onWorkspaceCategoryClient('T_TYPE_CC');
  }, []);

  useEffect(() => {
    // 폴더로 업로드시 설정(안하면 파일로 업로드 됨)
    if (fileUploadRef.current !== null) {
      fileUploadRef.current.setAttribute('directory', '');
      fileUploadRef.current.setAttribute('webkitdirectory', '');
    }
  }, [fileUploadRef.current]);

  useEffect(() => {
    // 입력된 값이 있을 경우 페이지 이동 방지
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showPrompt) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (showPrompt) {
      onAlertSetting(true, '알림', '데이터 업로드 내역이 삭제됩니다.<br/>나가시겠습니까?', 'move', 'confirm');
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showPrompt]);

  const onAlertConfirm = () => {
    const { type } = isAlert;
    confirmNavigation();
    if (type === 'move') {
      // 작업자 지정으로 이동
      confirmNavigation();
    } else if (type === 'back' || type === 'complete') {
      // 뒤로가기
      if (location.key !== 'default') {
        navigate(-1);
        return;
      }
      navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string), {
        replace: true,
      });
    } else if (type === 'backStep') {
      // step1로 이동
      setUploadFileList([]);
      setStep(1);
    }
    onAlertSetting(false, '', '', '', 'alert');
  };

  // 데이터 유형 조회
  const onWorkspaceCode = async () => {
    try {
      await list('D_TYPE');
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 코드 정보를 불러오지 못했습니다.'}`, 'back', 'alert');
    }
  };

  // 가공유형 조회
  const onWorkspaceManufacturing = async (code: string) => {
    try {
      await manufacturingList(code);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 코드 정보를 불러오지 못했습니다.'}`, '', 'alert');
    }
  };

  // 카테고리 유형
  const onWorkspaceCategoryClient = async (code: string) => {
    try {
      const categoryList = await categoryClientList(code);
      const firstCategory = categoryList[0];
      setValue(
        'categoryType',
        firstCategory
          ? {
              value: firstCategory.ctg_id,
              name: firstCategory.name,
            }
          : null,
        { shouldValidate: true },
      );
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 코드 정보를 불러오지 못했습니다.'}`, '', 'alert');
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

  // step1에서 데이터 유형 선택
  const handleSelectOption = (option: IOption, name: 'dataType' | 'toolType' | 'categoryType') => {
    const { dataType, toolType } = getValues();
    if (name === 'dataType' && dataType?.value !== option.value) {
      onWorkspaceManufacturing(String(option.value));
      setValue('toolType', null, { shouldValidate: true });
      setValue('categoryType', null), { shouldValidate: true };
    } else if (name === 'toolType' && toolType?.value !== option.value) {
      onWorkspaceCategoryClient(String(option.value));
      setValue('categoryType', null, { shouldValidate: true });
    }
    setValue(name, option, { shouldValidate: true });
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
    cancelNavigation();
    onAlertSetting(false, '', '', '', 'alert');
  };

  const handleCancel = () => {
    if (step === 2 && uploadFileList.length) {
      onAlertSetting(true, '알림', '데이터 업로드 내역이 삭제됩니다.<br/>나가시겠습니까?', 'backStep', 'confirm');
      return;
    }
    setStep(1);
  };

  const onNextSubmit = () => {
    setStep(2);
  };

  // 폴더 업로드 및 폴더 drop할경우
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], _fileRejections: any, event?: DropEvent) => {
      if (event?.type === 'drop' && uploadFileList.length) {
        return;
      }
      const newFileList = {} as { [key: string]: { [key: string]: File[] } };
      // 파일 체크 정규식
      const dotFileRegex = /\/\./;
      const extensionPattern = /\.[A-Za-z0-9]+$/;
      const folderNameRegex = /^SET\d{3}_M\d{3}$/;
      const subFolderNameRegex = /^SET\d{3}_M\d{3}_S\d{3}$/;
      // const imageRegex = /^SPEAKER_\d{3}_[MF]_(10|20|30|40|50|60|70|80|90)_[A-Za-z_\s]+\.jpg$/;
      const imageRegex = /^SPEAKER_\d{3}_[MF]_(10|20|30|40|50|60|70|80|90)_([A-Za-z_\s]|[A-Za-z_\s]_[A-Za-z_\s])+\.jpg$/;
      const wavAudioRegex = /^SET\d{3}_M\d{3}_S\d{3}_STT8K_\d{3}\.wav$/;
      // const videoAudioRegex =
      //   /^SET\d{3}_M\d{3}_S\d{3}_(\d{3}|MIX)_(M|F|MF|FM|MM|FF)_(10|20|30|40|50|60|70|80|90|10[1-9]0|20[1-9]0|30[1-9]0|40[1-9]0|50[1-9]0|60[1-9]0|70[1-9]0|80[1-9]0|90[1-9]0)_[A-Za-z_\s]+_(FS|WS|CS|P|B)+\.(mp4|wav)$/;
      const videoAudioRegex = /^SET\d{3}_M\d{3}_S\d{3}_(\d{3}|MIX)_[MF]+_(?:(?:[1-9]0|[1-9][0-9]0))+_[A-Za-z_\s]+_(FS|WS|CS|P|B)+\.(mp4|wav)$/;

      acceptedFiles
        .filter((file) => {
          const path = file.path || file.webkitRelativePath;
          // 불필요한 파일 제거
          return !path.startsWith('.') && !path.match(dotFileRegex) && !path.includes('Thumbs.db');
        })
        .forEach((file) => {
          if (file.path || file.webkitRelativePath) {
            const path = file.path || file.webkitRelativePath;
            // drop하고 폴더 업로드시 path가 다름
            const pathParts = event?.type === 'drop' ? path.split('/') : `/${path}`.split('/');
            const folderNumber = pathParts[2];
            const subFolderNumber = pathParts[3] || '';
            // 폴더 구조 검사
            if (!folderNumber) {
              return;
            }
            if (extensionPattern.test(folderNumber)) {
              return;
            }

            if (!subFolderNumber) {
              return;
            }
            if (extensionPattern.test(subFolderNumber)) {
              return;
            }
            if (!newFileList[folderNumber]) {
              newFileList[folderNumber] = {};
            }
            if (!newFileList[folderNumber][subFolderNumber]) {
              newFileList[folderNumber][subFolderNumber] = [];
            }
            newFileList[folderNumber][subFolderNumber].push(file);
            return;
          }
        });
      // newFileList가 비어있을시 폴더 구조가 안맞으므로 에러
      if (Object.keys(newFileList).length === 0) {
        onAlertSetting(true, '알림', '폴더 구조가 다릅니다.', '', 'alert');
        return;
      }
      // 업로드 데이터 파싱
      const paringFileList = Object.keys(newFileList).map((folderName) => {
        let errorMessage = '';
        // 서브구조 폴더 구조
        const subFolderList = Object.keys(newFileList[folderName]).map((subFolderName) => {
          let subError = false;
          let fileSize = 0;
          let wavCount = 0;
          let mp4Count = 0;
          let imageCount = 0;
          // 서브폴더 파일 검사
          if (newFileList[folderName][subFolderName].length === 0) {
            errorMessage = '(서브 폴더에 파일이 없습니다)';
            subError = true;
          }
          // 서브폴더 구조 검사
          if (
            subFolderName !== 'speakerThumbnail' &&
            !subFolderName.includes(`${folderName}_`) &&
            !subFolderNameRegex.test(subFolderName) &&
            !subError &&
            !errorMessage
          ) {
            errorMessage = '(서브 폴더 파일 규칙이 다릅니다)';
            subError = true;
          }
          if (subFolderName.includes(`${folderName}_`) && !subError) {
            const fileCheck = newFileList[folderName][subFolderName].some((file) => {
              // 비디오 파일 일때 파일명 검사
              if (file.type === 'video/mp4' && videoAudioRegex.test(file.name) && file.name.includes(`${subFolderName}_`)) {
                mp4Count += 1;
                return false;
              }
              // 오디오 파일 일때 파일명 검사
              if (file.type === 'audio/wav' && file.name.includes(`${subFolderName}_`)) {
                if (file.name.includes('STT8K') && wavAudioRegex.test(file.name)) {
                  wavCount += 1;
                  return false;
                } else if (videoAudioRegex.test(file.name)) {
                  wavCount += 1;
                  return false;
                }
              }
              return true;
            });
            subError = fileCheck;
          }
          if (subError && !errorMessage) {
            errorMessage = '(영상 및 오디오 파일 개수 및 파일명 규칙이 다릅니다)';
          }
          if (subFolderName === 'speakerThumbnail' && !subError) {
            const fileCheck = newFileList[folderName][subFolderName].some((file) => {
              // 이미지 파일 일때 파일명 검사
              if ((file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && imageRegex.test(file.name)) {
                imageCount += 1;
                return false;
              }
              return true;
            });
            subError = fileCheck;
          }
          if (subError && !errorMessage) {
            errorMessage = '(이미지 파일 개수 및 파일명 규칙이 다릅니다)';
          }
          // 비디오는 5개 이상 검사
          if (mp4Count < 5 && subFolderName !== 'speakerThumbnail' && !subError && !errorMessage) {
            subError = true;
            errorMessage = '(영상 파일 개수 및 파일명 규칙이 다릅니다)';
          }
          // 오디오는 4개 이상
          if (wavCount < 4 && subFolderName !== 'speakerThumbnail' && !subError && !errorMessage) {
            subError = true;
            errorMessage = '(오디오 파일 개수 및 파일명 규칙이 다릅니다)';
          }
          // 이미지는 2개 이상
          if (imageCount < 2 && subFolderName === 'speakerThumbnail' && !subError && !errorMessage) {
            subError = true;
            errorMessage = '(이미지 파일 개수 및 파일명 규칙이 다릅니다)';
          }
          // 파일 용량 체크
          fileSize =
            Math.round((newFileList[folderName][subFolderName].reduce((acc, file) => acc + file.size, 0) / 1024 / 1024 / 1024 + Number.EPSILON) * 100) / 100;
          return {
            subFolderName,
            fileList: newFileList[folderName][subFolderName],
            subError,
            fileSize,
          };
        });

        let error = false;
        // 폴더명 구조 검사
        if (!folderNameRegex.test(folderName) && !errorMessage) {
          error = true;
          errorMessage = '(폴더명 규칙이 다릅니다)';
        }
        // 서브폴더가 2개 이상이 아니거나 스피커 썸네일 폴더가 없을시 에러
        if (
          !error &&
          (subFolderList.some((subFolder) => subFolder.subError) ||
            subFolderList.length < 2 ||
            !subFolderList.some((subFolder) => subFolder.subFolderName === 'speakerThumbnail'))
        ) {
          error = true;
        }
        return {
          folderName: errorMessage ? `${folderName} ${errorMessage}` : folderName,
          subFolderList,
          fileSize: subFolderList.reduce((acc, subFolder) => Math.round((acc + subFolder.fileSize + Number.EPSILON) * 100) / 100, 0),
          error,
        };
      });
      // 폴더이름으로 정렬
      paringFileList.sort((a, b) => {
        if (a.folderName < b.folderName) {
          return -1;
        }
        if (a.folderName > b.folderName) {
          return 1;
        }
        return 0;
      });
      setUploadFileList([...uploadFileList, ...paringFileList]);
    },
    [uploadFileList],
  );

  // drop 설정
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true, noClick: true });

  const handleFileUpload = () => {
    fileUploadRef.current?.click();
  };

  // 업로드 구조 오픈
  const handleUploadStructure = (status: boolean) => {
    setIsUploadStructure(status);
  };

  // 체크박스 선택
  const handleAllUploadCheck = () => {
    if (isCheckUploadFileList.length === uploadFileList.length) {
      setIsCheckUploadFileList([]);
    } else {
      const newCheckList = [] as number[];
      uploadFileList.forEach((_, index) => {
        newCheckList.push(index);
      });
      setIsCheckUploadFileList(newCheckList);
    }
  };

  const handleUploadCheck = (index: number) => {
    if (isCheckUploadFileList.includes(index)) {
      setIsCheckUploadFileList(isCheckUploadFileList.filter((checkIndex) => checkIndex !== index));
    } else {
      setIsCheckUploadFileList([...isCheckUploadFileList, index]);
    }
  };

  const handleCheckFileListDelete = () => {
    const newUploadFileList = [] as IUploadFileList[];
    uploadFileList.forEach((uploadFile, index) => {
      if (!isCheckUploadFileList.includes(index)) {
        newUploadFileList.push(uploadFile);
      }
    });
    setUploadFileList(newUploadFileList);
    setIsCheckUploadFileList([]);
  };

  // 프로젝트 등록
  const onSubmit = handleSubmit(async ({ dataType, categoryType, toolType }) => {
    // 다른 프로젝트 등록 후 업로드가 진행시 또다른 프로젝트 등록 방지
    if (workspaceProjectUploadFileList.list.length) {
      onAlertSetting(true, '알림', '기존 프로젝트 파일이 등록중입니다.<br/>업로드가 완료후 등록해주세요', '', 'alert');
      return;
    }
    try {
      const projectIdList = [] as string[];
      const projectList = {} as {
        [key: string]: string;
      };
      // 프로젝트 등록 (폴더별)
      for (let i = 0; i < uploadFileList.length; i++) {
        const formData = {
          name: uploadFileList[i].folderName,
          data_type: {
            code: dataType?.value,
            name: dataType?.name,
          },
          category_type: categoryType?.value,
          tool_type: {
            code: toolType?.value,
            name: toolType?.name,
          },
          speaker_files: uploadFileList[i].subFolderList
            .filter((uploadFile) => uploadFile.subFolderName === 'speakerThumbnail')[0]
            .fileList.map((file) => ({
              file_name: file.name,
              file_size: file.size,
            })),
          subsets: uploadFileList[i].subFolderList
            .filter((uploadFile) => uploadFile.subFolderName !== 'speakerThumbnail')
            .map((subFolder) => ({
              name: subFolder.subFolderName.replace(`${uploadFileList[i].folderName}_`, ''),
              files: subFolder.fileList.map((file) => ({
                file_name: file.name,
                file_size: file.size,
              })),
            })),
        };
        setLoading(true);
        const url = `/admin/project/${id}`;
        const {
          data: { result, data, code, message },
        }: AxiosResponse<IApi<string>> = await axios.post(url, formData);
        if (result && code === 'F000') {
          projectList[uploadFileList[i].folderName] = data;
          projectIdList.push(data);
        } else {
          setLoading(false);
          onAlertSetting(true, '알림', message, '', 'alert');
          return;
        }
      }

      const uploadList = [] as IWorkspaceProjectUploadFileList[];

      // 백그라운드에서 업로드 할시 구조 만들기
      Object.entries(projectList).forEach(([key, value]) => {
        const findUploadFile = uploadFileList.find((uploadFile) => uploadFile.folderName === key);
        if (findUploadFile) {
          findUploadFile.subFolderList.forEach((subFolder) => {
            subFolder.fileList.forEach((file) => {
              uploadList.push({
                workspace_id: id as string,
                project_id: value,
                file: file,
              });
            });
          });
        }
      });
      // 업로드 파일 리스트 저장
      setWorkspaceProjectUploadFileList({
        title: workspaceDetail?.name || '',
        list: uploadList,
        workspaceId: id as string,
        projectId: projectIdList,
      });
      setWorkspaceProjectUploadStatus(true);
      onAlertSetting(
        true,
        '알림',
        '데이터 업로드 요청이 완료되었습니다<br/>상세 업로드 내역은 [프로젝트 조회]행을<br/>클릭하여 확인 바랍니다.',
        'complete',
        'alert',
      );
    } catch (err) {
      setLoading(false);
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '프로젝트 등록을 실패했습니다.'}`, '', 'alert');
    }
  });

  const handleOnBack = () => {
    if (uploadFileList.length) {
      onAlertSetting(true, '알림', '데이터 업로드 내역이 삭제됩니다.<br/>나가시겠습니까?', 'back', 'confirm');
      return;
    }
    if (location.key !== 'default') {
      navigate(-1);
      return;
    }
    navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT.replace(':id', id as string));
  };

  return (
    <Layout>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type={isAlert.alertType} content={isAlert.content} onConfirm={onAlertConfirm} onCancel={onCancel} />
        </ModalContainer>
      )}
      <Header>
        <span>워크스페이스 관리</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <span>&nbsp;{workspaceDetail?.name}</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <b>새 프로젝트 등록</b>
      </Header>
      <Container>
        <Title className="title-box" title="새 프로젝트 등록" onBack={handleOnBack} />
        <div className="sub-title">
          <div className="step-title">
            <span className="step-box">STEP {step}</span>
            <span className="step-title">{step === 1 ? '데이터 정보 입력' : '데이터 업로드'}</span>
          </div>
          <div className="step">
            <span className={classNames({ active: step === 1 })}>1</span>
            <span className={classNames({ active: step === 2 })}>2</span>
          </div>
        </div>
        {step === 1 ? (
          <>
            <form onSubmit={onNextSubmit}>
              <FormLayout>
                <ul>
                  <li>
                    <div className="form-name">
                      데이터 유형 선택<span>*</span>
                    </div>
                    <Select
                      className="form-input"
                      list={workspaceCodeList.map((code) => ({
                        value: code.code,
                        name: code.name,
                      }))}
                      onClick={(option) => handleSelectOption(option, 'dataType')}
                      selectOption={watch('dataType')}
                      placeholderText="데이터 유형을 선택해주세요"
                    />
                  </li>
                  <li>
                    <div className="form-name">
                      가공 유형 선택<span>*</span>
                    </div>
                    <Select
                      className="form-input"
                      list={workspaceCodeManufacturingList.map((code) => ({
                        value: code.code,
                        name: code.name,
                      }))}
                      onClick={(option) => handleSelectOption(option, 'toolType')}
                      selectOption={watch('toolType')}
                      placeholderText="데이터 유형을 선택해주세요"
                    />
                  </li>
                  <li>
                    <div className="form-name">
                      카테고리 유형 선택<span>*</span>
                    </div>
                    <Select
                      className="form-input"
                      list={workspaceCategoryClientList.map((code) => ({
                        value: code.ctg_id,
                        name: code.name,
                      }))}
                      onClick={(option) => handleSelectOption(option, 'categoryType')}
                      selectOption={watch('categoryType')}
                      placeholderText="데이터 유형을 선택해주세요"
                    />
                  </li>
                </ul>
              </FormLayout>
              <div className="btn-wrapper">
                <Button type="submit" disabled={!isValid} className="btn-next">
                  다음
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="upload-container">
              <div className={classNames('upload-data', { list: !!uploadFileList.length })}>
                <div className="title-box">
                  <div className="title">데이터 등록</div>
                  <div className="folder-structure">
                    <span>업로드 폴더 구조</span>
                    <InfoS width="16" height="16" color="#111" onClick={() => handleUploadStructure(true)} />
                  </div>
                </div>
                <div {...getRootProps({ className: 'upload-wrapper' })}>
                  {uploadFileList.length ? (
                    <>
                      <div className="upload-list">
                        <ul className="header">
                          <li className="li-1">
                            <CheckBox name="all" checked={isCheckUploadFileList.length === uploadFileList.length} onClick={handleAllUploadCheck} />
                          </li>
                          <li className="li-2">No</li>
                          <li className="li-3">File</li>
                          <li className="li-4">Size</li>
                        </ul>
                        <ul className="body">
                          {uploadFileList.map((uploadFile, index) => (
                            <li key={`upload-${uploadFile.folderName}-${index}`}>
                              <CheckBox
                                name={`${index}`}
                                checked={isCheckUploadFileList.includes(index)}
                                onClick={() => handleUploadCheck(index)}
                                className="li-1"
                              />
                              <div className={classNames('li-2', { error: uploadFile.error })}>{index + 1}</div>
                              <div className={classNames('li-3', { error: uploadFile.error })}>{uploadFile.folderName}</div>
                              <div className={classNames('li-4', { error: uploadFile.error })}>{uploadFile.fileSize}GB</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="upload-btn-wrapper">
                        <Button variant="outline" size="s" onClick={handleFileUpload}>
                          데이터 추가
                        </Button>
                        <Button variant="outline" size="s" onClick={handleCheckFileListDelete}>
                          삭제
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="drag-wrapper">
                      <div className="content">
                        <UploadCloud width="60" height="60" color="#949ca5" />
                        <div className="text">폴더를 마우스로 끌어오기</div>
                        <div className="text">또는</div>
                        <div className="upload-btn">
                          <Button variant="outline" size="s" onClick={handleFileUpload}>
                            내 PC에서 가져오기
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <input {...getInputProps()} style={{ display: 'none' }} ref={fileUploadRef} />
                </div>
              </div>
              {isUploadStructure && <UploadExample onClose={() => handleUploadStructure(false)} />}
            </div>
            <div className="btn-wrapper">
              {step === 2 && (
                <Button variant="outline" onClick={handleCancel}>
                  이전
                </Button>
              )}
              <Button
                className="btn-create"
                type="button"
                onClick={onSubmit}
                disabled={!uploadFileList.length || uploadFileList.some((uploadFile) => uploadFile.error) || loading}
              >
                프로젝트 생성
              </Button>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceProjectRegister;
