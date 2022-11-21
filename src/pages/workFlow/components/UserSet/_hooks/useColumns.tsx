import React, { useMemo } from 'react'
import { Select } from 'famc'
import { GradeEnumOptions } from '@/helpers/enum'
import styles from '../index.less'

function formatValueJobs(value) {
  return value?.map?.((job) => ({ label: job.name, value: job.id }))
}
function formatChangeJobs(value) {
  return value?.map?.((job) => ({ id: job.value, name: job.label }))
}

function useColumns({ onDelele, onChange }): any[] {
  return useMemo(
    () => [
      { title: '名称', dataIndex: 'name' },
      {
        title: '职务',
        dataIndex: 'grade',
        width: 340,
        render: (v, row) => (
          <React.Fragment>
            <Select
              className={v?.length ? styles.true : ''}
              value={formatValueJobs(v)}
              options={GradeEnumOptions}
              mode="multiple"
              placeholder="请选择职务"
              labelInValue
              onChange={(checkedValue) => onChange(row, formatChangeJobs(checkedValue))}
            />
          </React.Fragment>
        )
      },
      {
        title: '操作',
        dataIndex: 'op',
        fixed: 'right',
        width: 60,
        editor: (v, row) => ({
          buttons: [
            {
              text: '删除',
              danger: true,
              onClick: () => onDelele(row)
            }
          ]
        })
      }
    ],
    [onDelele, onChange]
  )
}

export default useColumns
