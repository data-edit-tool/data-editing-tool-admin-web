/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useBeforeUnload as _useBeforeUnload } from 'react-router-dom';
import { useWorkspaceManagementActions } from 'actions/workspace-management-action';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useCallbackPrompt } from 'hooks/useCallbackPrompt';
import { useRecoilValue } from 'recoil';
import { workspaceManagementDetailSelector } from 'state/workspace-management';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IAlert, IApi } from 'types/interface';
import { IWorkspaceManagementDetailGuide } from 'types/workspace-management-interface';
import axios from 'utils/axios';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import FormLayout from 'components/Common/Admin/FormLayout';
import Input from 'components/Common/Admin/Input';
import Textarea from 'components/Common/Admin/Textarea';
import Title from 'components/Common/Admin/Title';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import CalendarModal from 'components/Modal/Calendar';
import Calendar from 'components/SVG/Icon/Calendar';
import Close from 'components/SVG/Icon/Close';
import NaviArrow from 'components/SVG/Icon/NaviArrow';

const Container = styled.section`
  padding: 40px;
  .sub-title {
    font-size: ${({ theme }) => theme.fontSize.text_20};
    font-weight: 500;
    color: #111;
    margin-top: 40px;
  }

  form {
    .form-calender {
      margin-right: 10px;
      position: relative;
      .form-input-calender {
        width: 345px;
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
      &:last-child {
        margin-right: 0px;
      }
    }
    .m-b-auto {
      margin-top: 16px;
      margin-bottom: auto;
    }
    .file-btn {
      width: 120px;
      margin-right: 10px;
      margin-bottom: auto;
    }
    .form-textarea {
      height: 80px;
    }
    .file-list {
      width: 570px;
      height: 167px;
      overflow-y: auto;
      padding: 16px 20px;
      border-radius: 6px;
      background-color: ${({ theme }) => theme.adminColor.hover};
      &.empty-list {
        height: 50px;
        overflow-y: hidden;
      }
      & > ul {
        & > li {
          display: flex;
          margin-bottom: 10px;
          align-items: center;
          &.empty {
            font-size: ${({ theme }) => theme.fontSize.text_16};
            color: #949ca5;
            margin-bottom: 0;
            line-height: 20px;
          }
          &:last-child {
            margin-bottom: 0px;
          }
          span {
            font-size: ${({ theme }) => theme.fontSize.text_16};
            color: ${({ theme }) => theme.adminColor.txt2};
            font-weight: 500;
            margin-right: 12px;
          }
          svg {
            cursor: pointer;
          }
        }
      }
    }
    .notice {
      margin-top: 10px;
      font-size: ${({ theme }) => theme.fontSize.text_14};
      color: #5b636d;
    }
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
    }
  }
`;

interface IForm {
  name: string;
  manager: string;
  startDate: string | null;
  endDate: string | null;
  guides: File[] | IWorkspaceManagementDetailGuide[];
  desc: string;
}

const ManagementWorkspaceRegister: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [calendarType, setCalendarType] = useState<string>('');
  const { add, edit, detail, workspaceDetailReset } = useWorkspaceManagementActions();
  const workspaceDetail = useRecoilValue(workspaceManagementDetailSelector);
  const [saveWorkspaceId, setSaveWorkspaceId] = useState<string>('64a789f0e2cdbe52321c92ff');
  const [isWorkspaceCheck, setIsWorkspaceCheck] = useState<boolean>(false);
  const [isFileList, setIsFileList] = useState<
    {
      name: string;
      size: number;
    }[]
  >([]);
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const {
    register,
    setValue,
    watch,
    getValues,
    setError,
    reset,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      manager: '',
      startDate: null,
      endDate: null,
      guides: [],
      desc: '',
    },
  });

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isDirty);

  useEffect(() => {
    async function onDetail(id: string) {
      try {
        await detail(id);
      } catch (err) {
        onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '워크스페이스 정보를 가져오는데 실패했습니다'}`, '', 'alert');
      }
    }
    if (id) {
      onDetail(id);
    }

    return () => {
      workspaceDetailReset();
    };
  }, []);

  useEffect(() => {
    // 워크스페이스 항목 입력시 경고창
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showPrompt) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (showPrompt) {
      onAlertSetting(true, '알림', '변경된 내용이 저장되지 않습니다<br/>나가시겠습니까?', 'move', 'confirm');
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showPrompt]);

  useEffect(() => {
    // 수정일 경우 세팅
    if (workspaceDetail) {
      reset({
        name: workspaceDetail.name,
        manager: workspaceDetail.manager,
        startDate: workspaceDetail.start_date,
        endDate: workspaceDetail.end_date,
        guides: workspaceDetail.guides || [],
        desc: workspaceDetail.desc,
      });
      setIsWorkspaceCheck(true);
      // 가이드 파일 세팅
      setIsFileList(
        workspaceDetail.guides
          ? workspaceDetail.guides.map((guide) => ({ name: guide.file_name, size: Math.round((guide.file_size / (1024 * 1024) + Number.EPSILON) * 100) / 100 }))
          : [],
      );
    }
  }, [workspaceDetail]);

  // 워크스페이스 제목에서 Blur효과가 나면 중복체크
  const handleOnBlur = async () => {
    const { name } = watch();
    if (!name) {
      setError('name', {
        type: 'custom',
        message: '한글자 이상 입력해주세요',
      });
      return;
    }
    if (workspaceDetail?.name === name) {
      setIsWorkspaceCheck(true);
      return;
    }
    try {
      const {
        data: { result, code, data, message },
      }: AxiosResponse<IApi<boolean>> = await axios.get(`/admin/workspace/name/check?name=${name}`);
      if (result && code === 'F000') {
        // true인 경우 사용중인 워크스페이스
        if (data) {
          setError('name', {
            type: 'custom',
            message: '사용 중인 워크스페이스 이름입니다 다른 워크스페이스 이름을 입력 바랍니다',
          });
        }
        setIsWorkspaceCheck(!data);
      } else {
        onAlertSetting(true, '알림', message, '', 'alert');
        setIsWorkspaceCheck(false);
      }
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '네트워크가 불안정합니다'}`, '', 'alert');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 글자제한 30자
    if (e.target.value.length > 30) {
      const { name } = getValues();
      e.target.value = name;
      return;
    }
    // 한글, 영어, 숫자, _만 허용
    const regex = /[^a-zA-Z0-9ㄱ-힣_\s]/g;
    const inputValue = e.target.value;
    setIsWorkspaceCheck(false);
    setValue('name', inputValue.replace(regex, ''), { shouldValidate: true, shouldDirty: true });
    e.target.value = inputValue.replace(regex, '');
  };

  const handleManagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 한글, 영어, 숫자만 허용
    const regex = /[^a-zA-Z0-9ㄱ-힣\s]/g;
    const inputValue = e.target.value;
    setValue('manager', inputValue.replace(regex, ''), { shouldValidate: true, shouldDirty: true });
    e.target.value = inputValue.replace(regex, '');
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 글자제한 30자
    if (e.target.value.length > 30) {
      const { desc } = getValues();
      e.target.value = desc;
      return;
    }
    // 한글, 영어, 숫자만 허용
    const regex = /[^a-zA-Z0-9ㄱ-힣\s]/g;
    const inputValue = e.target.value;
    setValue('desc', inputValue.replace(regex, ''), { shouldValidate: true, shouldDirty: true });
    e.target.value = inputValue.replace(regex, '');
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

  const onAlertConfirm = async () => {
    const { type } = isAlert;
    if (type === 'submit' && saveWorkspaceId) {
      // 작업자 지정으로 이동
      cancelNavigation();
      navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_WORKER.replace(':id', saveWorkspaceId), {
        state: { isRegister: true },
      });
      confirmNavigation();
      return;
    } else if (type === 'move') {
      // 페이지 이동
      confirmNavigation();
    } else if (type === 'list') {
      // 리스트 이동
      cancelNavigation();
      navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT);
      confirmNavigation();
      return;
    }
    // confirmNavigation();
    onAlertSetting(false, '', '', '', 'alert');
  };

  const onCancel = () => {
    const { type } = isAlert;
    cancelNavigation();
    if (type === 'submit') {
      onAlertSetting(true, '작업자 지정 경로', '목록으로 이동합니다.<br/>작업자 지정은 워크스페이스 오른쪽<br/>설정에서 할 수 있습니다.', 'list', 'alert');
      return;
    }

    onAlertSetting(false, '', '', '', 'alert');
  };

  const handleCancel = () => {
    navigate(PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT);
  };

  // 등록 및 수정
  const onSubmit = handleSubmit(async ({ name, desc, manager, startDate, endDate, guides }) => {
    try {
      const files = [] as File[];
      const guideEditFiles = [] as IWorkspaceManagementDetailGuide[];
      // 가이드 파일이 있을 경우
      if (guides) {
        guides.forEach((guide) => {
          // File이면 새로 업로드 된 파일
          if (guide instanceof File) {
            files.push(guide);
          } else {
            // 파일이아니면 수정에서 가져온 파일
            guideEditFiles.push(guide);
          }
        });
      }
      const deleteFiles = [] as string[];

      workspaceDetail?.guides?.forEach((guide) => {
        // 해당 가이드 파일이 수정에서 가져온 파일에 없으면 삭제
        if (!guideEditFiles.some((editGuide) => editGuide.guide_id === guide.guide_id)) {
          deleteFiles.push(guide.guide_id);
        }
      });
      // id가 있으면 수정 없으면 등록
      if (id) {
        await edit({ name, desc, manager, startDate, endDate, id, deleteGuides: deleteFiles, newGuides: files });
        setSaveWorkspaceId(id);
      } else {
        const workspaceId = await add({ name, desc, manager, startDate, endDate, guides: files });
        setSaveWorkspaceId(workspaceId);
      }
      const message = id ? '워크스페이스 수정이 완료되었습니다' : '워크스페이스 등록이 완료되었습니다';
      onAlertSetting(true, '작업자 지정 알림', `${message}<br/>작업자 지정으로 가시겠습니까?`, 'submit', 'confirm');
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : `워크스페이스 ${id ? '수정' : '등록'}에 실패했습니다`}`, '', 'alert');
    }
  });

  const onConfirm = (type: 'startDate' | 'endDate', date: Date | null) => {
    setValue(type, date ? format(date, 'yyyy-MM-dd') : null, { shouldValidate: true, shouldDirty: true });
    setCalendarType('');
  };

  const onCalendarCancel = () => {
    setCalendarType('');
  };

  const handleCalendarOpen = (type: string) => {
    setCalendarType((prev) => (prev === type ? '' : type));
  };

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const { guides } = getValues();
    if (files.length + guides.length > 10) {
      onAlertSetting(true, '알림', '파일은 최대 10개까지 가능합니다', '', 'alert');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      // 파일 체크
      const fileSizeInMB = files[i].size / (1024 * 1024);
      // pdf 파일만 가능
      if (files[i].type !== 'application/pdf') {
        onAlertSetting(true, '알림', 'pdf 확장자만 가능합니다', '', 'alert');
        return;
      }
      // 10MB 이상 파일 체크
      if (fileSizeInMB > 10) {
        onAlertSetting(true, '알림', '10MB이내 파일만 가능합니다', '', 'alert');
        return;
      }
    }
    // 화면에 표시하기 위한 데이터 구조
    const fileNameList = Array.from(files).map((file) => {
      return {
        name: file.name,
        size: Math.round((file.size / (1024 * 1024) + Number.EPSILON) * 100) / 100,
      };
    });
    setIsFileList((prev) => [...prev, ...fileNameList]);
    const fileArr = Array.from(files).map((file) => file);
    const newFileArr = [...Array.from(watch('guides') as File[]), ...fileArr];
    setValue('guides', newFileArr, { shouldDirty: true });
    e.target.value = '';
  };

  const handleFileDelete = (index: number) => {
    const newFileArr = Array.from(watch('guides') as File[]);
    newFileArr.splice(index, 1);
    setValue('guides', newFileArr, { shouldDirty: true });
    setIsFileList((prev) => prev.filter((_, i) => i !== index));
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
        <b>&nbsp;새 워크스페이스 {id ? '수정' : '등록'}</b>
      </Header>
      <Container>
        <Title className="title-box" title={id ? '새 워크스페이스 수정' : '새 워크스페이스 등록'} backUrl={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT} />
        <div className="sub-title">워크스페이스 정보 {id ? '수정' : '입력'}</div>
        <form onSubmit={onSubmit}>
          <FormLayout>
            <ul>
              <li>
                <div className="form-name">
                  워크스페이스 명<span>*</span>
                </div>
                <Input
                  register={register}
                  options={{
                    required: '워크스페이스 명을 입력해주세요',
                  }}
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="워크스페이스 명을 입력해주세요"
                  error={errors.name?.message}
                  onBlur={handleOnBlur}
                  onChange={handleNameChange}
                />
              </li>
              <li>
                <div className="form-name">
                  담당자<span>*</span>
                </div>
                <Input
                  register={register}
                  options={{
                    required: '담당자를 입력해주세요',
                  }}
                  type="text"
                  name="manager"
                  className="form-input"
                  placeholder="담당자를 입력해주세요"
                  error={errors.manager?.message}
                  onChange={handleManagerChange}
                />
              </li>
              <li>
                <div className="form-name">
                  작업 기간<span>*</span>
                </div>
                <div className="form-calender">
                  <Input
                    register={register}
                    options={{
                      required: '시작일을 선택해주세요',
                    }}
                    type="text"
                    name="startDate"
                    className={classNames('form-input-calender', { valid: calendarType === 'startDate' || watch('startDate') })}
                    placeholder="시작일"
                    error={errors.startDate?.message}
                    icon={<Calendar width="16" height="16" color={theme.adminColor.txt2} onClick={() => handleCalendarOpen('startDate')} />}
                    readOnly
                    onClick={() => handleCalendarOpen('startDate')}
                  />
                  {calendarType === 'startDate' && (
                    <div className="modal-calender">
                      <CalendarModal
                        date={watch('startDate') ? new Date(watch('startDate') as string) : null}
                        onConfirm={(date: Date | null) => onConfirm('startDate', date)}
                        onCancel={onCalendarCancel}
                        name="startDate"
                        endDate={watch('endDate') ? new Date(watch('endDate') as string) : null}
                      />
                    </div>
                  )}
                </div>
                <div className="form-calender">
                  <Input
                    register={register}
                    options={{
                      required: '종료일을 선택해주세요',
                    }}
                    type="text"
                    name="endDate"
                    className={classNames('form-input-calender', { valid: calendarType === 'endDate' || watch('endDate') })}
                    placeholder="종료일"
                    error={errors.endDate?.message}
                    icon={<Calendar width="16" height="16" color={theme.adminColor.txt2} onClick={() => handleCalendarOpen('endDate')} />}
                    readOnly
                    onClick={() => handleCalendarOpen('endDate')}
                  />
                  {calendarType === 'endDate' && (
                    <div className="modal-calender">
                      <CalendarModal
                        date={watch('endDate') ? new Date(watch('endDate') as string) : null}
                        onConfirm={(date: Date | null) => onConfirm('endDate', date)}
                        onCancel={onCalendarCancel}
                        name="endDate"
                        startDate={watch('startDate') ? new Date(watch('startDate') as string) : null}
                      />
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className="form-name m-b-auto">가이드 등록</div>
                <Button variant="outline" className="file-btn" fontWeight="normal" onClick={handleFileOpen}>
                  파일 선택
                </Button>
                <div>
                  <div className={classNames('file-list', { 'empty-list': !isFileList.length })}>
                    <ul>
                      {isFileList.length ? (
                        isFileList.map((file, index) => (
                          <li key={`fileList-${index}`}>
                            <span>{`${file.name} (${file.size}MB)`}</span>
                            <Close width="16" height="16" color="#949ca5" onClick={() => handleFileDelete(index)} />
                          </li>
                        ))
                      ) : (
                        <li className="empty">파일 선택 버튼을 클릭 해 가이드를 업로드 해주세요</li>
                      )}
                    </ul>
                  </div>
                  <div className="notice">첨부 파일은 각 10MB 이내의 파일을 최대 10개까지 가능하며, pdf 확장자 파일만 가능합니다.</div>
                </div>
              </li>
              <li>
                <div className="form-name m-b-auto">워크스페이스 소개 (30자 내외)</div>
                <Textarea
                  register={register}
                  name="desc"
                  className="form-textarea"
                  placeholder="워크스페이스 소개를 입력해주세요"
                  onChange={handleDescChange}
                />
              </li>
            </ul>
          </FormLayout>
          <div className="btn-wrapper">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={!isValid || !isWorkspaceCheck}>
              {id ? '수정' : '등록'}
            </Button>
          </div>
        </form>
        <input type="file" multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" />
      </Container>
    </Layout>
  );
};

export default ManagementWorkspaceRegister;
