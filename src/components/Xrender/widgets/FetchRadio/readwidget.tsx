import { useMemo, useCallback, useState, useEffect } from 'react'
import request from '@/request'
import { FetchRadioProps } from './type'

interface ReadWidgetProps extends FetchRadioProps {}
function ReadWidget(props: ReadWidgetProps) {
  const [data, setData] = useState<any[]>([])
  const { value, schema } = props
  const { enumNames, isOpenFetch, fetchUrl, fetchDataKey, lebalName, valueName } = schema

  const getfetchData = useCallback(() => {
    let text = ''

    request.get(`${fetchUrl}`, {}).then((res) => {
      const {
        data: { data }
      } = res
      let fetchData = data[`${fetchDataKey}`] || data
      if (Array.isArray(fetchData)) {
        setData(fetchData)
      }
    })
    return text
  }, [fetchUrl, fetchDataKey, lebalName, valueName])

  useEffect(() => {
    if (isOpenFetch) {
      getfetchData()
    }
  }, [isOpenFetch])

  const fetchRenderValue = useMemo(() => {
    let text = ''
    let flag = data.some((item) => {
      if (value === item[`${valueName}`]) {
        text = item[`${lebalName}`]
        return true
      }
      return false
    })
    if (!flag) {
      return value
    }
    return text
  }, [data, value])

  const renderValue = useMemo(() => {
    let text = ''
    if (!isOpenFetch) {
      schema.enum.some((item, index) => {
        if (value === item) {
          text = enumNames[index]
          return true
        }
        return false
      })
    } else {
      text = fetchRenderValue
    }
    return text
  }, [isOpenFetch, value, data])

  return <div>{renderValue}</div>
}

export default ReadWidget
