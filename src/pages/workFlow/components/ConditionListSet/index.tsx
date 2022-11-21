
import React, { useState, useCallback, useEffect } from 'react'
import { Button, TypeTreeSelect, Select } from 'famc'
import { Xrender } from '@/components'
import { FilterStatusLabelOptions } from '@/helpers/enum'
import FilterCheck from './components/FilterCheck'
import { handleResult } from './util'

import styles from './index.less'

const { FmFormRender } = Xrender

function ConditionListSet({ value, onChange }) {
  const [initFilter, setInitFilter] = useState<any[]>()

  useEffect(() => {
    console.log('ConditionListSet value =========>>>>>', value)
    setInitFilter(value)
  }, [value])

  const onChangeByKey = useCallback(
    (key: any, item: { columnId: any }, changeValue: any) => {
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
    (item: { columnId: any }) => {
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
    (v: any[]) => {
      console.log('onSelectChecked =======>>>>>', v)
      const newData = v?.map((i: { columnId: any }) => {
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
          // 自定义表单条件控件
          const schema = {
            type: 'object',
            properties: {
              [`${item.uId}`]: {
                ...item.componentProps,
                title: item.componentProps?.componentType === 'checkbox' ? item.title : '',
                labelWidth: item.showType === 'number' ? '3%' : '0%',
                default: item?.value
              }
            },
            labelWidth: 200,
            displayType: 'row'
          }
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
                    onValuesChange={(values) => onChangeByKey('value', item, values['value'])}
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
      <FilterCheck value={initFilter} onChange={onSelectChecked} />
      {renderCondition()}
    </div>
  )
}

export default React.forwardRef((props: any, ref) => <ConditionListSet {...props} iref={ref} />)
