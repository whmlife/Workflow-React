import { useEffect, useState, useCallback } from 'react'
import { Select, Spin, message } from 'famc'
import request from '@/request'
import { config } from './config'
import { labelValue, DebounceMultiSelectProps } from './type'
import ReadWidget from './readwidget'

const { Option } = Select

function DebounceMultiSelect(props: DebounceMultiSelectProps) {
  const [dataSource, setDataSource] = useState<labelValue[]>([])
  const [fetching, setFetching] = useState<boolean>(false)
  const { value, onChange, allowClear, disabled, schema, placeholder, readOnly } = props
  const { isOpenFetch, fetchUrl, fetchDataKey, lebalName, valueName, enumNames } = schema || {}

  const getLocalDataSource = useCallback(() => {
    let enumData = enumNames.map((item, index) => {
      return { value: schema.enum[index], label: item }
    })
    setDataSource(enumData)
  }, [enumNames])

  const getfetchData = useCallback(() => {
    setFetching(true)
    setDataSource([])
    request
      .get(`${fetchUrl}`, {})
      .then((res) => {
        const {
          data: { data }
        } = res
        let fetchData = data[`${fetchDataKey}`] || data
        if (Array.isArray(fetchData)) {
          let mapData: any[] = []
          fetchData.map((item) => {
            mapData.push({
              label: item[`${lebalName}`] ?? (item.name || ' '),
              value: item[`${valueName}`] ?? (item.id || ' ')
            })
            return item
          })
          setDataSource(mapData)
        }
        setFetching(false)
      })
      .catch(() => {
        message.error('请正确填写加载地址')
        return
      })
  }, [fetchUrl, fetchDataKey, lebalName])

  useEffect(() => {
    if (!isOpenFetch) {
      getLocalDataSource()
    }
  }, [isOpenFetch, enumNames])

  useEffect(() => {
    if (isOpenFetch) {
      getfetchData()
    }
  }, [isOpenFetch, fetchUrl, fetchDataKey, lebalName])

  if (readOnly) {
    return <ReadWidget {...props} />
  }

  return (
    <Select
      placeholder={placeholder}
      value={value}
      mode="multiple"
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      style={{ width: schema.width ?? '100%' }}
    >
      {dataSource.map((d) => (
        <Option key={d.value}>{d.label}</Option>
      ))}
    </Select>
  )
}
DebounceMultiSelect.ReadWidget = ReadWidget
DebounceMultiSelect.config = config
export default DebounceMultiSelect
