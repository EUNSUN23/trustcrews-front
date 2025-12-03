type ProjectApplyStatusCode = 'PAS1001' | 'PAS1002' | 'PAS1003';

export type ProjectApply = {
  project_apply_id: bigint;
  project_id: bigint;
  project_name: string;
  position_name: string;
  status: {
    code: ProjectApplyStatusCode;
    name: string;
  };
  apply_message: string;
  createDate: string;
};
