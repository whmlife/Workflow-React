import { useState, useCallback, useEffect } from 'react'
import { Radio, UserSelect, TypeTreeSelect, Button, Select, FilterTable, TreeSelectModal } from 'famc'
import { AllUserType, nodeUserType, GradeEnumOptions } from '@/helpers/enum'
import { TypeMap } from './const'
import useColumns from './_hooks/useColumns'
import {
  formatValueUsers,
  formatChangeUsers,
  formatValueJobs,
  formatChangeJobs,
  formatValueRole,
  formatChangeRole
} from './util'
import styles from './index.less'

/**
 * 用户选择类型
 * @param {*} props
 */
function UserSet(props) {
  const { value, onChange, type } = props

  const [visible, setVisible] = useState(false)
  const [jobDataSource, setJobDataSource] = useState([])

  useEffect(() => {
    setJobDataSource(value?.assignJob || [])
  }, [value])

  console.log('UserSet ===========>>>>>', type, value)

  const onChangeByKey = useCallback(
    (key, changeValue) => {
      onChange?.({ ...value, [key]: changeValue })
    },
    [value, onChange]
  )
  // 删除已添加部门
  const onDelete = useCallback(
    (v) => {
      const newData = jobDataSource.filter((item: any) => item.id !== v.id)
      setJobDataSource(newData)
      onChange?.({ ...value, assignJob: newData })
    },
    [jobDataSource, value, onChange]
  )

  // 修改部门里的职务
  const onGradeChange = useCallback(
    (row, v) => {
      const newData: any = jobDataSource.map((i: any) => {
        if (i.id === row.id) return { ...i, grade: v }
        return i
      })
      onChange?.({ ...value, assignJob: newData })
      setJobDataSource(newData)
    },
    [jobDataSource, value, onChange]
  )

  const columns = useColumns({ onChange: (row, v) => onGradeChange(row, v), onDelele: (v) => onDelete(v) })

  const onOk = useCallback(
    (keys, values) => {
      console.log('onOk:', keys, values)
      const newData = formatChangeJobs(keys).map((v) => {
        const isHave: any = jobDataSource.find((i: any) => i.id === v.id)
        if (isHave) return { ...v, ...isHave }
        return v
      })
      setJobDataSource(newData)
      onChange?.({ ...value, assignJob: newData })
      setVisible(false)
    },
    [value, jobDataSource, onChange]
  )

  const renderRadioContent = useCallback(() => {
    const options = TypeMap[type]
    if (!options) return
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio.Group
          options={options}
          value={value?.type}
          onChange={(checkedValue) => onChangeByKey('type', checkedValue.target.value)}
        />
        {value.type === AllUserType.appointDepartment && (
          <Button type="primary" style={{ padding: '4px 10px', marginLeft: '-24px' }} onClick={() => setVisible(true)}>
            添加部门
          </Button>
        )}
      </div>
    )
  }, [type, value, onChangeByKey])

  return (
    <div className={styles.setNode}>
      {renderRadioContent()}
      {type === nodeUserType.role && (
        <div className={styles.content}>
          <TypeTreeSelect
            type="role"
            value={formatValueRole(value?.role)}
            onChange={(checkedValue) => onChangeByKey('role', formatChangeRole(checkedValue))}
            multiple
            placeholder="请选择角色"
          />
        </div>
      )}
      {value.type === AllUserType.appointEmployee && (
        <div className={styles.content}>
          <UserSelect
            value={formatValueUsers(value?.employees)}
            onChange={(checkedValue) => onChangeByKey('employees', formatChangeUsers(checkedValue))}
            mode="multiple"
            placeholder="请选择指定成员"
          />
        </div>
      )}
      {value.type === AllUserType.appointTeam && (
        <div className={styles.content}>
          <TypeTreeSelect
            type="workTeam"
            value={formatValueRole(value?.workTeam)}
            onChange={(checkedValue) => onChangeByKey('workTeam', formatChangeRole(checkedValue))}
            multiple
            placeholder="请选择指定工作组"
          />
        </div>
      )}
      {value.type === AllUserType.sponsorDepartment && (
        <div className={styles.content}>
          <Select
            value={formatValueJobs(value?.job)}
            options={GradeEnumOptions}
            mode="multiple"
            placeholder="请选择职务"
            labelInValue
            onChange={(checkedValue) => onChangeByKey('job', formatChangeJobs(checkedValue))}
          />
        </div>
      )}
      {value.type === AllUserType.appointDepartment && (
        <div className={styles.content}>
          <FilterTable
            className={styles.table}
            columns={columns}
            dataSource={jobDataSource}
            noFilter
            pagination={false}
          />
          <TreeSelectModal
            type="department"
            multiple
            visible={visible}
            selectedKeys={jobDataSource.map((v: any) => v.id)}
            onOk={onOk}
            onCancel={() => setVisible(false)}
          />
        </div>
      )}
    </div>
  )
}

// UserSet.defaultProps = {}

export default UserSet
