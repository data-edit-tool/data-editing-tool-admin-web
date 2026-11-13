export interface IWorkerProject {
  project_name: string;
  user_type: 'W' | 'C' | 'V';
}

export interface IJobListData {
  list: IJobList[];
  target_idx: number;
}

export interface IJobList {
  job_id: string;
  job_name: string;
  working: boolean;
}

export interface IJobFileList {
  file_id: string;
  file_type: string;
  file_name: string;
  file_url: string;
}

export interface IJobFile {
  file_id: string;
  file_org_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
}

export interface ILabelingData {
  meta: ILabelingMeta;
  labeling_all: ILabelingAll[];
  speakers: ILabelingSpeakers[];
  verbal: ILabelingAll[];
  labeling_info: ILabelingInfoList[];
}

export interface ILabelingSpeakers {
  speaker_id: string;
  thumbnail_file_url: string;
}

export interface ILabelingInfoList {
  labeling_id: string;
  speaker_id: string;
}

export interface ILabelingMeta {
  work_id: string;
  work_status: string;
  step: number;
  check_step: number;
  job_id: string;
  worker_id: string;
  has_rejected: boolean;
}

export interface IVerbalVAD {
  valence: number;
  arousal: number;
  dominance: number;
}

export interface IOverallVAD {
  valence: number;
  arousal: number;
  dominance: number;
}

export interface ILabelingAll {
  start_time: number;
  end_time: number;
  speaker_id: string;
  labeling_id: string;
  verbal_id: string;
  sentence: string;
  channel: string;
  sentiment: string;
  fc_intent: string;
  bc_intent: string;
  emotion: string;
  affective_state: string;
  verbal_vad: IVerbalVAD;
  overall_vad: IOverallVAD;
  paraverbal_id: string;
  func: string;
  nonverbal_id: string;
  angle: string;
  speaker: string;
  intent: string;
  subject: string;
  action: string;
  action_str: string;
  obj: string;
}

export interface IJobLabelingCategory {
  ctg_name: string;
  ctg_id: string;
  ctg_depth: IJobCategoryListDepth[];
}

export interface IJobCategoryListDepth {
  ctg_id: string;
  ctg_name: string;
  ctg_depth: IJobCategoryListDepth[];
}

export interface IJobStartForm {
  workspace_id: string;
  project_id: string;
  job_id: string;
  labelings: IJobStartFormLabeling[];
}

export interface IJobStartFormLabeling {
  labeling_id: string;
  speaker_id: string;
  verbal: IJobStartFormVerbal[];
}

export interface IJobStep2FormLabeling {
  labeling_id: string;
  speaker_id: string;
  paraverbal: IJobFormPavaverbal[];
}

export interface IJobStep3FormLabeling {
  labeling_id: string;
  speaker_id: string;
  nonverbal: IJobFormNonverbal[];
}

export interface IJobStartFormVerbal {
  start_time: number;
  end_time: number;
  verbal_id?: string;
  sentence: string;
  channel: string;
  sentiment: string;
  fc_intent: string;
  bc_intent: string;
  emotion: string;
  affective_state: string;
  verbal_vad: IVerbalVAD;
  overall_vad: IOverallVAD;
}
export interface IJobStartFormParingVerbal extends IJobStartFormVerbal {
  speaker_id: string;
}

export interface IJobFormPavaverbal {
  start_time: number;
  end_time: number;
  paraverbal_id?: string;
  func: string;
}

export interface IJobFormParingPavaverbal extends IJobFormPavaverbal {
  speaker_id: string;
}

export interface IJobFormNonverbal {
  start_time: number;
  end_time: number;
  nonverbal_id?: string;
  angle: string;
  subject: string;
  action: string;
  action_str: string;
  obj: string;
  intent: string;
  func: string;
  emotion: string;
  affective_state: string;
}

export interface IJobFormParingNonverbal extends IJobFormNonverbal {
  speaker_id: string;
}

export interface IWorkerImpossibleList {
  reason: string;
  created: string;
}
