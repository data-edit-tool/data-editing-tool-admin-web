import { ICode } from 'types/interface';

type FilterCodeType = {
  [key: string]: ICode[];
};

export const FILTER_WS = {
  FILTER_WS_CATEGORY: [
    {
      name: '워크스페이스 명',
      value: 'FILTER_WS_CATEGORY_NAME',
    },
    {
      name: '워크스페이스 소개',
      value: 'FILTER_WS_CATEGORY_DESC',
    },
    {
      name: '담당자',
      value: 'FILTER_WS_CATEGORY_MANAGER',
    },
  ],
  FILTER_WS_ST: [
    {
      name: '워크스페이스 상태 전체',
      value: 'FILTER_WS_ST_ALL',
    },
    {
      name: '공개 전',
      value: 'FILTER_WS_ST_PENDING',
    },
    {
      name: '공개 중',
      value: 'FILTER_WS_ST_PROGRESS',
    },
    {
      name: '기간 만료',
      value: 'FILTER_WS_ST_EXPIRE',
    },
  ],
};

export const FILTER_PJ_CODE: FilterCodeType = {
  D_TYPE: [
    {
      name: '비디오',
      code: 'D_TYPE_VIDEO',
    },
  ],
  D_TYPE_IMAGE: [
    {
      name: '바운더리 박스',
      code: 'T_TYPE_BB',
    },
    {
      name: '세그멘테이션',
      code: 'T_TYPE_SEG',
    },
  ],
  D_TYPE_TEXT: [
    {
      name: 'OMR',
      code: 'T_TYPE_OMR',
    },
  ],
  D_TYPE_VIDEO: [
    {
      name: '복합대화',
      code: 'T_TYPE_CC',
    },
  ],
  D_TYPE_AUDIO: [
    {
      name: '오디오 추출',
      code: 'T_TYPE_SOUND',
    },
  ],
  FILTER_PJ_POST_STATUS: [
    {
      name: '게시 상태 전체',
      code: 'FILTER_PJ_POST_STATUS_ALL',
    },
    {
      name: '게시중',
      code: 'FILTER_PJ_POST_STATUS_ON',
    },
    {
      name: '일시정지',
      code: 'FILTER_PJ_POST_STATUS_OFF',
    },
  ],
  FILTER_PJ_PROJECT_STATUS: [
    {
      name: '프로젝트 상태 전체',
      code: 'FILTER_PJ_PROJECT_STATUS_ALL',
    },
    {
      name: '대기중',
      code: 'FILTER_PJ_PROJECT_STATUS_PENDING',
    },
    {
      name: '진행중',
      code: 'FILTER_PJ_PROJECT_STATUS_WORKING',
    },
    {
      name: '완료',
      code: 'FILTER_PJ_PROJECT_STATUS_FINISH',
    },
  ],
  FILTER_PJ_TOOL_TYPE: [
    {
      name: '가공 유형 전체',
      code: 'FILTER_PJ_TOOL_TYPE_ALL',
    },
    {
      name: '복합대화',
      code: 'FILTER_PJ_TOOL_TYPE_CC',
    },
  ],
  FILTER_PJ_UPLOAD_STATUS: [
    {
      name: '업로드 상태 전체',
      code: 'FILTER_PJ_UPLOAD_STATUS_ALL',
    },
    {
      name: 'Success',
      code: 'FILTER_PJ_UPLOAD_STATUS_SUCCESS',
    },
    {
      name: 'Progress',
      code: 'FILTER_PJ_UPLOAD_STATUS_PROGRESS',
    },
    {
      name: 'Error',
      code: 'FILTER_PJ_UPLOAD_STATUS_ERROR',
    },
  ],
};
