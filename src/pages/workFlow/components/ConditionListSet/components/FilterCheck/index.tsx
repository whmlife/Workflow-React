import React, { useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Checkbox } from 'famc'
import { FilterStatus } from '@/helpers/enum'
import styles from './index.less'


/**
 * 条件选择数据
 * @enum
 * @property {number} type 类型 - 默认条件为1，后端返回数据是2
 * @property {string} showName 名称
 * @property {string} columnId 条件唯一key
 */
export const checkData = [
  {
    type: 2,
    columnId: uuidv4(),
    showName: '金额',
    uId: 'number_OBGIeM',
    showType: 'number',
    optFilter: FilterStatus.less,
    componentProps: {
      componentType: 'number',
      props: {},
      title: '金额',
      type: 'number',
      width: '100%',
      labelWidth: '22%'
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '开关选择',
    title: '开关选择',
    showType: 'boolean',
    uId: 'switch_t8vEsK',
    componentProps: {
      title: '是否选择',
      componentType: 'switch',
      type: 'boolean',
      widget: 'switch',
      width: '100%'
    }
  },
  // showType就是componentProps type类型
  {
    type: 2,
    columnId: uuidv4(),
    showName: '日期选择',
    title: '日期选择',
    showType: 'string',
    uId: 'date_hR9ZA_',
    componentProps: {
      title: '日期选择',
      type: 'string',
      format: 'date',
      width: '100%',
      labelWidth: '25%'
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '单选',
    title: '单选',
    showType: 'string',
    uId: 'DebounceSelect_QIRQkI',
    componentProps: {
      title: '单选',
      componentType: 'DebounceSelect',
      type: 'string',
      enum: ['1', '2', '3'],
      enumNames: ['早', '中', '晚'],
      widget: 'DebounceSelect',
      readOnlyWidget: 'DebounceSelectRead',
      width: '100%',
      labelWidth: '25%',
      placeholder: '请选择',
      props: {},
      isOpenFetch: false,
      fetchUrl: '/fm/employee?pageNumber=1&pageSize=99',
      fetchDataKey: 'content',
      lebalName: 'name',
      valueName: 'id'
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '下拉多选',
    title: '下拉多选',
    showType: 'array',
    uId: 'DebounceMultiSelect_6cH61r',
    componentProps: {
      title: '下拉多选',
      componentType: 'DebounceMultiSelect',
      type: 'array',
      enum: ['0', '1', '2'],
      enumNames: ['早', '中', '晚'],
      widget: 'DebounceMultiSelect',
      width: '100%',
      labelWidth: '25%',
      props: {},
      readOnlyWidget: 'DebounceMultiSelectRead',
      fetchUrl: '/fm/employee?pageNumber=1&pageSize=99',
      fetchDataKey: 'content',
      lebalName: 'name',
      valueName: 'id',
      isOpenFetch: false
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '是否选择',
    title: '是否选择',
    showType: 'boolean',
    uId: 'checkbox_cz2Iss',
    componentProps: {
      title: '是否选择',
      type: 'boolean',
      componentType: 'checkbox',
      widget: 'checkbox',
      width: '100%',
      labelWidth: '25%'
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '单选radio',
    title: '单选radio',
    showType: 'string',
    uId: 'FetchRadio_sWK1Th',
    componentProps: {
      title: '单选radio',
      componentType: 'FetchRadio',
      type: 'string',
      enum: ['1', '2', '3'],
      enumNames: ['早', '中', '晚'],
      widget: 'FetchRadio',
      readOnlyWidget: 'FetchRadioRead',
      width: '100%',
      labelWidth: '25%',
      fetchUrl: '/fm/energy/meter/record?pageNumber=1&pageSize=10',
      fetchDataKey: 'content',
      lebalName: 'name'
    }
  },
  {
    type: 2,
    columnId: uuidv4(),
    showName: '多选复选框',
    title: '多选复选框"',
    showType: 'array',
    uId: 'FetchCheckBox_KPyoxN',
    componentProps: {
      title: '多选复选框',
      componentType: 'FetchCheckBox',
      type: 'array',
      enum: ['1', '2', '3'],
      enumNames: ['早', '中', '晚'],
      widget: 'FetchCheckBox',
      readOnlyWidget: 'FetchCheckBoxRead',
      width: '100%',
      labelWidth: '25%',
      fetchUrl: '/fm/energy/meter/record?pageNumber=1&pageSize=10',
      fetchDataKey: 'content',
      lebalName: 'name'
    }
  },
  {
    columnId: uuidv4(),
    showName: '日期范围',
    title: '日期范围',
    type: 'dateRange_dateTime',
    uId: 'dateRange_75V8tv',
    showType: 'range',
    componentProps: {
      title: '日期范围',
      type: 'range',
      componentType: 'dateRange',
      format: 'dateTime',
      props: {
        placeholder: ['开始时间', '结束时间']
      },
      width: '100%',
      labelWidth: '25%',
      isCondition: true
    }
  }
]

export function formatChangeFilter(value) {
  return value?.map?.((v) => ({ ...v, label: v.showName, value: v.columnId }))
}
export function formatValueFilter(value) {
  return value?.map?.((v) => v.columnId)
}
function FilterCheck(props) {
  const { value, onChange } = props
  const [data, setCheckData] = useState(checkData)

  const onChangeFilter = useCallback(
    (keys) => {
      const selectedData = data.filter((v) => {
        if (keys.includes(v.columnId)) {
          return v
        }
      })
      console.log('selectedData =======>>>>>>', selectedData)
      onChange?.(selectedData)
    },
    [data, onChange]
  )
  // 自定义表单 通过fr-generator封装实现，具体可以看/test/frgenerator
  return (
    <div className={styles.setNode}>
      <span className={styles.nodeSpan}>请选择用来区分审批流程的条件字段</span>
      <Checkbox.Group
        options={formatChangeFilter(data)}
        value={formatValueFilter(value)}
        onChange={(checkedValue) => onChangeFilter(checkedValue)}
      />
    </div>
  )
}

export default FilterCheck
