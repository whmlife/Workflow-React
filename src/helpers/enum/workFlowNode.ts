/**
 * 节点类型
 * @enum
 * @property {string} 1 审批节点
 * @property {string} 2 抄送节点
 */
export const nodeTypeStatus = {
  approval: 1,
  copy: 2
}
export const nodeTypeStatusLabel = {
  [nodeTypeStatus.approval]: '审批节点',
  [nodeTypeStatus.copy]: '抄送节点'
}

/**
 * 审批方式
 * @enum
 * @property {string} 1 依次审批
 * @property {string} 2 会签
 * @property {string} 3 或签
 */
export const FlowApprovalType = {
  AllApproval: 2,
  OneApproval: 3
}

export const FlowApprovalTypeLabel = {
  [FlowApprovalType.AllApproval]: `会签（须所有审批人同意）`,
  [FlowApprovalType.OneApproval]: `或签（一名审批人同意或拒绝即可）`
}
export const FlowApprovalTypeOptions = [FlowApprovalType.AllApproval, FlowApprovalType.OneApproval].map((value) => ({
  label: FlowApprovalTypeLabel[value],
  value
}))

/**
 * 节点设置
 * @enum
 * @property {number} 1 自动通过
 * @property {number} 2 指定人员审批
 * @property {number} 3 自动转交管理员
 */
export const nodeApprovalSetStatus = {
  auto: '1',
  assign: '2',
  admin: '3'
}
export const nodeApprovalSetStatusLabel = {
  [nodeApprovalSetStatus.auto]: `自动通过`,
  [nodeApprovalSetStatus.assign]: `指定人员审批`,
  [nodeApprovalSetStatus.admin]: `自动转交管理员`
}

export const nodeApprovalSetOptions = Object.entries(nodeApprovalSetStatusLabel).map(([value, label]) => ({
  label,
  value
}))

/**
 * 人员类型
 * @enum
 * @property {string} 1 人员
 * @property {string} 2 岗位
 * @property {string} 3 角色
 * @property {string} 4 工作组
 */
export const nodeUserType = {
  employee: '1',
  job: '2',
  role: '3',
  workTeam: '4'
}
export const nodeUserTypeLabel = {
  [nodeUserType.employee]: `人员`,
  [nodeUserType.job]: `岗位`,
  [nodeUserType.role]: `角色`,
  [nodeUserType.workTeam]: `工作组`
}

export const nodeUserTypeOptions = Object.entries(nodeUserTypeLabel).map(([value, label]) => ({
  label,
  value
}))

/**
 * 选择人员时候，对应的radio
 * @enum
 * @property {number} 1 发起人指定
 * @property {number} 2 指定人员
 * @property {number} 3 发起人所在部门
 * @property {number} 4 指定部门
 * @property {number} 5 发起人所在工作组
 * @property {number} 6 指定工作组
 */
export const employeeType = {
  sponsorAssign: '1',
  appointEmployee: '2'
}
export const jobType = {
  sponsorDepartment: '3',
  appointDepartment: '4'
}
export const workTeamType = {
  sponsorTeam: '5',
  appointTeam: '6'
}
export const employeeTypeLabel = {
  [employeeType.sponsorAssign]: `发起人指定`,
  [employeeType.appointEmployee]: `指定人员`
}
export const jobTypeLabel = {
  [jobType.sponsorDepartment]: `发起人所在部门`,
  [jobType.appointDepartment]: `指定部门`
}
export const workTeamTypeLabel = {
  [workTeamType.sponsorTeam]: `发起人所在工作组`,
  [workTeamType.appointTeam]: `指定工作组`
}

export const employeeTypeOptions = Object.entries(employeeTypeLabel).map(([value, label]) => ({
  label,
  value
}))
export const jobTypeOptions = Object.entries(jobTypeLabel).map(([value, label]) => ({
  label,
  value
}))
export const workTeamTypeOptions = Object.entries(workTeamTypeLabel).map(([value, label]) => ({
  label,
  value
}))
export const AllUserType = { ...employeeType, ...jobType, ...workTeamType }
export const AllUserTypeLabel = { ...employeeTypeLabel, ...jobTypeLabel, ...workTeamTypeLabel }
export const AllUserTypeOptions = { ...employeeTypeOptions, ...jobTypeOptions, ...workTeamTypeOptions }

/**
 * 职级
 * @enum
 * @property {string} 0 员工
 * @property {string} 1 主管
 * @property {string} 2 总经理
 * @property {string} 3 行领导
 */
export const GradeEnum = {
  Employee: '0',
  Supervisor: '1',
  Manager: '2',
  Leader: '3'
}
/**
 * 职级名称
 * @enum
 * @property {string} 0 员工
 * @property {string} 1 主管
 * @property {string} 2 总经理
 * @property {string} 3 行领导
 */
export const GradeEnumLabel = {
  [GradeEnum.Employee]: '员工',
  [GradeEnum.Supervisor]: '主管',
  [GradeEnum.Manager]: '总经理',
  [GradeEnum.Leader]: '行领导'
}
export const GradeEnumOptions = Object.entries(GradeEnumLabel).map(([value, label]) => ({
  label,
  value
}))

/**
 * 条件
 * @enum
 * @property {string} 1 小于
 * @property {string} 2 大于
 * @property {string} 3 小于等于
 * @property {string} 4 等于
 * @property {string} 5 大于等于
 */
export const FilterStatus = {
  less: '1',
  greater: '2',
  lessEqual: '3',
  equal: '4',
  greaterEqual: '5'
}

export const ShowFilterLabel = {
  [FilterStatus.less]: '<',
  [FilterStatus.greater]: '>',
  [FilterStatus.lessEqual]: '≤',
  [FilterStatus.equal]: '=',
  [FilterStatus.greaterEqual]: '≥'
}
export const FilterStatusLabel = {
  [FilterStatus.less]: '小于',
  [FilterStatus.greater]: '大于',
  [FilterStatus.lessEqual]: '小于等于',
  [FilterStatus.equal]: '等于',
  [FilterStatus.greaterEqual]: '大于等于'
}

export const FilterStatusLabelOptions = Object.entries(FilterStatusLabel).map(([value, label]) => ({
  label,
  value
}))
