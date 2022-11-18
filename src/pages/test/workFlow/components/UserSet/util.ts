export function formatValueUsers(value) {
  return value?.map?.((team) => ({ label: team.name, value: team.id }))
}
export function formatChangeUsers(value) {
  return value?.map?.((team) => ({ id: team.value, name: team.label }))
}
export function formatValueJobs(value) {
  return value?.map?.((job) => ({ label: job.name, value: job.id }))
}
export function formatChangeJobs(value) {
  return value?.map?.((job) => ({ id: job.value, name: job.label }))
}
export function formatValueRole(value) {
  return value?.map?.((role) => ({ label: role.name, value: role.id }))
}
export function formatChangeRole(value) {
  console.log('选择之后得到的数据 ========<<<<<<<', value)
  return value?.map?.((role) => ({ id: role.value, name: role.label }))
}
