import { useMemo, useState, useCallback, useEffect } from 'react'
import { FetchCheckBoxProps } from './type'
import request from '@/request'

interface FetchCheckBoxPropsReadWidgetProps extends FetchCheckBoxProps {}

function ReadWidget(props: FetchCheckBoxPropsReadWidgetProps) {
  const [data, setData] = useState<any[]>([])
  const { value = [], schema } = props
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
    text = value.reduce((total, valueItem) => {
      let flag = data.some((item) => {
        if (valueItem === item[`${valueName}`]) {
          total = `${total}${total === '' ? '' : ','}${item[`${lebalName}`]}`
          return true
        }
        return false
      })
      if (!flag) {
        total = `${total}${total === '' ? '' : ','}${valueItem}`
      }
      return total
    }, '')
    return text
  }, [data, value])

  const renderValue = useMemo(() => {
    let text = ''
    if (!isOpenFetch) {
      text = value.reduce((total, valueItem) => {
        schema.enum.some((item, index) => {
          if (valueItem === item) {
            total = `${total}${total === '' ? '' : ','}${enumNames[index]}`
            return true
          }
          return false
        })
        return total
      }, '')
    } else {
      text = fetchRenderValue
    }
    return text
  }, [isOpenFetch, value, data])

  return <div>{renderValue}</div>
}

export default ReadWidget
