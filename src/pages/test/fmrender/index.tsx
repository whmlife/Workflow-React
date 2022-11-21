import React, { useCallback, useRef } from 'react'
import { Button } from 'famc'
import { Xrender } from '@/components'
const { FmFormRender } = Xrender

const value = {
  type: 'object',
  properties: {
    DebounceMultiSelect_6cH61r: {
      title: '测试密密麻麻',
      componentType: 'DebounceMultiSelect',
      type: 'array',
      enum: ['0', '1', '2'],
      enumNames: ['早', '中', '晚'],
      widget: 'DebounceMultiSelect',
      width: '100%',
      labelWidth: '25%',
      props: { value: ['4624292778233305175'] },
      fetchUrl: '/fm/employee?pageNumber=1&pageSize=99',
      fetchDataKey: 'content',
      lebalName: 'name',
      valueName: 'id',
      isOpenFetch: true,
      readOnly: true,
      readOnlyWidget: 'DebounceMultiSelectRead'
    }
  },
  labelWidth: 200,
  displayType: 'row'
}

const Demo = () => {
  let cRef: any = useRef()
  const handelClick = useCallback(() => {
    console.log(cRef.current.submit())
  }, [])
  return (
    <div style={{ height: '80vh' }}>
      <FmFormRender schema={value} cRef={cRef} readOnly={true} />
      <Button onClick={handelClick}>提交</Button>
    </div>
  )
}

export default Demo
