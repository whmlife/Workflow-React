import React, { useState, useCallback, useEffect } from 'react'
import { Radio, UserSelect, TypeTreeSelect } from 'famc'

import { nodeApprovalSetOptions, nodeApprovalSetStatus } from '@/helpers/enum'
import styles from './index.less'

function formatValueUsers(value) {
  return value?.map?.((team) => ({ label: team.name, value: team.id }))
}
function formatChangeUsers(value) {
  return value?.map?.((team) => ({ id: team.value, name: team.label }))
}
// function formatValueRole(value) {
//   return value?.map?.((v) => ({ label: v.name, value: v.id }))
// }
// function formatChangeRole(value) {
//   return value?.map?.((v) => ({ id: v.value, name: v.label }))
// }
/**
 * 收费设置 输入搜索选择器
 * @param {*} props
 */
function NodeSet(props) {
  const { value, onChange } = props

  const onChangeByKey = useCallback(
    (key, changeValue) => {
      onChange?.({ ...value, [key]: changeValue })
    },
    [value, onChange]
  )

  return (
    <div className={styles.setNode}>
      <span className={styles.nodeSpan}>无可用审批人时</span>
      <Radio.Group
        options={nodeApprovalSetOptions}
        value={value?.type}
        onChange={(checkedValue) => onChangeByKey('type', checkedValue.target.value)}
      />
      {/* <div className={value?.type?.includes?.(nodeApprovalSetStatus.assign) ? '' : styles.hide}>
        <TypeTreeSelect
          type="role"
          value={formatValueRole(value?.role)}
          onChange={(checkedValue) => onChangeByKey('role', formatChangeRole(checkedValue))}
          multiple
          placeholder="请选择角色"
        />
      </div> */}
      <div className={value?.type?.includes?.(nodeApprovalSetStatus.assign) ? '' : styles.hide}>
        <UserSelect
          value={formatValueUsers(value?.employees)}
          onChange={(checkedValue) => onChangeByKey('employees', formatChangeUsers(checkedValue))}
          mode="multiple"
          placeholder="请选择指定成员"
        />
      </div>
    </div>
  )
}

// NodeSet.defaultProps = {}

export default NodeSet
