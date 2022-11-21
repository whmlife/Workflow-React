import { nodeUserType, employeeTypeOptions, jobTypeOptions, workTeamTypeOptions } from '@/helpers/enum'
export const TypeMap = {
  [nodeUserType.employee]: employeeTypeOptions,
  [nodeUserType.job]: jobTypeOptions,
  [nodeUserType.role]: null,
  [nodeUserType.workTeam]: workTeamTypeOptions
}
