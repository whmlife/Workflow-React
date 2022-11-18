import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash'

import { nodeUserType, nodeUserTypeLabel, AllUserType, AllUserTypeLabel } from '@/helpers/enum'

function useHandleData() {
  const foramtKeyData = useCallback((data) => {
    const value = cloneDeep(data || [])
    return value.map((v) => {
      if (!v._uuid) {
        return { ...v, _uuid: uuidv4() }
      }
      return v
    })
  }, [])

  // 处理不同人员类型，选择不同指定，结果不同
  const handleResult = useCallback((value) => {
    let newValue = value
    const { userType, userSet } = value
    // 人员类型 - 人员
    if (userType === nodeUserType.employee) {
      // 选择 - 发起人指定
      if (userSet.type === AllUserType.sponsorAssign) {
        newValue = { ...newValue, type: nodeUserTypeLabel[userType], name: AllUserTypeLabel[userSet.type] }
      } else {
        newValue = {
          ...newValue,
          type: nodeUserTypeLabel[userType],
          name: userSet?.employees?.map((v) => v.name).join(';')
        }
      }
    }
    // 人员类型 - 角色
    if (userType === nodeUserType.role) {
      newValue = {
        ...newValue,
        type: nodeUserTypeLabel[userType],
        name: userSet?.role?.map((v) => v.name).join(';')
      }
    }
    // 人员类型 - 工作组
    if (userType === nodeUserType.workTeam) {
      // 选择 - 发起人所在工作组
      if (userSet.type === AllUserType.sponsorTeam) {
        newValue = { ...newValue, type: nodeUserTypeLabel[userType], name: AllUserTypeLabel[userSet.type] }
      } else {
        newValue = {
          ...newValue,
          type: nodeUserTypeLabel[userType],
          name: userSet?.workTeam?.map((v) => v.name).join(';')
        }
      }
    }
    // 人员类型 - 岗位
    if (userType === nodeUserType.job) {
      // 选择 - 发起人所在部门
      if (userSet.type === AllUserType.sponsorDepartment) {
        const gradeName = userSet?.job?.map((v) => v.name).join('、')
        newValue = {
          ...newValue,
          type: nodeUserTypeLabel[userType],
          name: `${AllUserTypeLabel[userSet.type]}(${gradeName})`
        }
      } else {
        newValue = {
          ...newValue,
          type: nodeUserTypeLabel[userType],
          name: userSet?.assignJob
            ?.map((v) => {
              const gradeName = v?.grade?.map((i) => i.name).join('、')
              return `${v.name}(${gradeName})`
            })
            .join(';')
        }
        console.log('newValue gradeName =========<<<<<<<', newValue)
      }
    }
    return newValue
  }, [])

  const handleAdd = useCallback(
    (data, v) => {
      let newData = null
      if (!v?._uuid) {
        newData = data.concat(v)
      } else {
        newData = data.map((item) => {
          if (item._uuid === v._uuid) {
            return {
              ...item,
              ...v
            }
          }
          return item
        })
      }

      return foramtKeyData(newData)
    },
    [foramtKeyData]
  )

  const handleDelete = useCallback(
    (data, v) => {
      console.log('data ===>>>', data, v)
      const newData = data.filter((item) => item._uuid !== v._uuid)
      return foramtKeyData(newData)
    },
    [foramtKeyData]
  )

  return { handleResult, handleAdd, handleDelete, foramtKeyData }
}

export default useHandleData
