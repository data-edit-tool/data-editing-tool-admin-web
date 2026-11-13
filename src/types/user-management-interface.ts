export interface IUserManagement {
  member_count: number;
  total_page: number;
  result_count: number;
  users: IUserManagementUser[];
}

export interface IUserManagementUser {
  user_id: string;
  account: string;
  is_pw_changed: boolean;
  desc: string;
  created: string;
}
