import { useEffect, useCallback, useState } from 'react'
import { Spin, message } from 'famc'
import request from '@/request'
import { Select } from 'famc'
import ReadWidget from './readwidget'
import { config } from './config'
import { labelValue, DebounceSelectProps } from './type'
const { Option } = Select

function DebounceSelect(props: DebounceSelectProps) {
  const [dataSource, setDataSource] = useState<labelValue[]>([])
  const [fetching, setFetching] = useState<boolean>(false)
  const { value, onChange, allowClear, disabled, schema, readOnly, placeholder } = props
  const { enumNames, isOpenFetch, fetchUrl, fetchDataKey, lebalName, valueName } = schema || {}

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

  const getLocalDataSource = useCallback(() => {
    let enumData = enumNames.map((item, index) => {
      return { label: item, value: schema.enum[index] }
    })
    setDataSource(enumData)
  }, [onChange, enumNames])

  useEffect(() => {
    if (!isOpenFetch) {
      getLocalDataSource()
    }
  }, [isOpenFetch, enumNames])

  useEffect(() => {
    if (isOpenFetch) {
      getfetchData()
    }
  }, [isOpenFetch, fetchUrl, fetchDataKey, lebalName, valueName])

  if (readOnly) {
    return <ReadWidget {...props} />
  }
  return (
    <Select
      placeholder={placeholder}
      value={value}
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

DebounceSelect.config = config
DebounceSelect.ReadWidget = ReadWidget
export default DebounceSelect
