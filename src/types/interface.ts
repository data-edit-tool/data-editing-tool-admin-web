export interface IApi<T = any> {
  result: boolean;
  code: string;
  message: string;
  data: T;
}

export interface IOption {
  value: string | number;
  name: string;
}

export interface ICustomError {
  message: string;
  code: string;
}

export interface IAlert {
  open: boolean;
  title: string;
  content: string;
  type: string;
  alertType: 'confirm' | 'alert';
}

export interface ICode {
  code: string;
  name: string;
}

export interface ICategoryClient {
  ctg_id: string;
  name: string;
}

export interface IPage {
  total_elements: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
  is_first: boolean;
  is_last: boolean;
}
