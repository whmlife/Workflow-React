/* eslint-disable react/jsx-key */
import React, { useState, useCallback, useEffect } from 'react'
import { Button, TypeTreeSelect, Select } from 'famc'
import { Xrender } from '@/components'
import { FilterStatusLabelOptions } from '@/helpers/enum'
import FilterCheck from './components/FilterCheck'
import { handleResult } from './util'

import styles from './index.less'

const { FmFormRender } = Xrender

export function formatValueJobs(value) {
  return value?.map?.((job) => ({ label: job.name, value: job.id }))
}
export function formatChangeJobs(value) {
  return value?.map?.((job) => ({ id: job.value, name: job.label }))
}

function ConditionListSet({ value, onChange }) {
  const [initFilter, setInitFilter] = useState<any[]>()

  useEffect(() => {
    console.log('ConditionListSet value =========>>>>>', value)
    setInitFilter(value)
  }, [value])

  const onChangeByKey = useCallback(
    (key, item, changeValue) => {
      console.log('条件选中的数值  changeValue ==========>>>>>>>>>', changeValue)
      const newData = initFilter?.map((i) => {
        if (i.columnId === item.columnId) {
          return { ...i, [key]: changeValue, result: handleResult(i, changeValue) }
        }
        return i
      })

      console.log('newData ======>>>>>', newData)
      setInitFilter(newData)
      onChange?.(newData)
    },
    [initFilter, onChange]
  )

  const handleDelete = useCallback(
    (item) => {
      const newData = initFilter?.filter((v) => {
        if (v.columnId !== item.columnId) {
          return v
        }
      })
      setInitFilter(newData)
      onChange?.(newData)
    },
    [initFilter, onChange]
  )

  const onSelectChecked = useCallback(
    (v) => {
      console.log('onSelectChecked =======>>>>>', v)
      const newData = v?.map((i) => {
        const findData = initFilter?.find((item) => item.columnId === i.columnId)
        console.log('findData =====<<<<<', findData)
        if (findData) {
          return { ...i, ...findData }
        }
        return i
      })
      console.log('newData ======>>>>>', newData)
      setInitFilter(newData)
      onChange?.(newData)
    },
    [initFilter, onChange]
  )

  const renderCondition = useCallback(() => {
    return (
      <div>
        {initFilter?.map((item) => {
          // 代表默认的条件
          if (item.type === 1) {
            if (item.showName === '发起人所在部门') {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                    <label style={{ width: '28.5%', position: 'relative', left: 12 }}>
                      {item.showName}
                      <label style={{ margin: '0 10px 0 2px' }}>:</label>
                    </label>
                    <TypeTreeSelect
                      type="department"
                      multiple
                      placeholder="请选择部门"
                      value={formatValueJobs(item?.value)}
                      onChange={(checkedValue) => onChangeByKey('value', item, formatChangeJobs(checkedValue))}
                    />
                  </div>
                  <Button type="link" onClick={() => handleDelete(item)}>
                    删除
                  </Button>
                </div>
              )
            }
            if (item.showName === '发起人所在工作组') {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                    <label style={{ width: '29%', marginLeft: '-2px' }}>
                      {item.showName}
                      <label style={{ margin: '0 10px 0 2px' }}>:</label>
                    </label>
                    <TypeTreeSelect
                      type="workTeam"
                      multiple
                      placeholder="请选择工作组"
                      value={formatValueJobs(item?.value)}
                      onChange={(checkedValue) => onChangeByKey('value', item, formatChangeJobs(checkedValue))}
                    />
                  </div>
                  <Button type="link" onClick={() => handleDelete(item)}>
                    删除
                  </Button>
                </div>
              )
            }
          }
          // 自定义表单条件控件

          const schema = {
            type: 'object',
            properties: {
              [`${item.uId}`]: {
                ...item.componentProps,
                title: item.componentProps?.componentType === 'checkbox' ? item.title : '',
                labelWidth: item.showType === 'number' ? '3%' : '0%',
                // width: item.showType === 'string' || item.showType === 'array' ? '134%' : item.componentProps.width,
                default: item?.value
              }
            },
            labelWidth: 200,
            displayType: 'row'
          }
          console.log('schema =========>>>>>>', schema)
          console.log('FilterStatusLabelOptions =======>>>>>', item.optFilter, FilterStatusLabelOptions)
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                <label style={{ width: '22.55%', marginLeft: '-2px', textAlign: 'right' }}>
                  {item.showName}
                  <label style={{ margin: '0 10px 0 2px' }}>:</label>
                </label>
                {item.optFilter ? (
                  <Select
                    style={{ width: '20%' }}
                    value={item.optFilter}
                    options={FilterStatusLabelOptions}
                    placeholder="请选择条件"
                    onChange={(v) => onChangeByKey('optFilter', item, v)}
                  />
                ) : null}
                <div style={{ width: item.showType === 'number' ? '58%' : '78%' }}>
                  <FmFormRender
                    schema={schema}
                    onValuesChange={(values) => onChangeByKey('value', item, values[item.uId])}
                  />
                </div>
              </div>
              <Button type="link" onClick={() => handleDelete(item)}>
                删除
              </Button>
            </div>
          )
        })}
      </div>
    )
  }, [initFilter, onChangeByKey, handleDelete])

  return (
    <div className={styles.conditionList}>
      <span className={styles.filterTip}>当审批单同时满足以下条件时进入此流程</span>
      {/* <Button type="primary" className={styles.addFilter} onClick={() => show()}>
        添加条件
      </Button> */}
      <FilterCheck value={initFilter} onChange={onSelectChecked} />
      {renderCondition()}
      {/* <FormModal onFinish={onFinish} {...modalProps} /> */}
    </div>
  )
}

export default React.forwardRef((props: any, ref) => <ConditionListSet {...props} iref={ref} />)
