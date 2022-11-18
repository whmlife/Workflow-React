import { useState, useEffect, useCallback } from 'react'
import { Radio, message } from 'famc'
import { config } from './config'
import ReadWidget from './readwidget'
import request from '@/request'
import { RadioLabelValue, FetchRadioProps } from './type'

function FetchRadio(props: FetchRadioProps) {
  const [options, setOptions] = useState<RadioLabelValue[]>([])
  const { onChange, value, schema, disabled, readOnly } = props
  const { enumNames, isOpenFetch, fetchUrl, fetchDataKey, lebalName, valueName } = schema || {}

  const getfetchData = useCallback(async () => {
    await request
      .get(`${fetchUrl}`, {})
      .then((res) => {
        const {
          data: { data }
        } = res
        let fetchData = data[`${fetchDataKey}`] || data
        if (Array.isArray(fetchData)) {
          fetchData.map(<T extends RadioLabelValue>(item: T) => {
            item.label = item[`${lebalName}`] || item.name || ' '
            item.value = item[`${valueName}`] || item.id || ' '
            return item
          })
        }
        setOptions(fetchData)
      })
      .catch(() => {
        message.error('请正确填写加载地址')
        setOptions([])
      })
  }, [fetchUrl, fetchDataKey, lebalName])

  const getLocalDataSource = useCallback(() => {
    let enumData: RadioLabelValue[] = []
    enumNames.forEach((item: string, index: any) => {
      enumData.push({ value: schema.enum[index], label: item })
    })
    setOptions(enumData)
  }, [enumNames])

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
  return <Radio.Group value={value} disabled={disabled} options={options} onChange={onChange} />
}

FetchRadio.config = config
FetchRadio.ReadWidget = ReadWidget
export default FetchRadio
