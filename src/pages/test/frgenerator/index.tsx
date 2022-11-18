import { useRef, useCallback } from 'react'
import { Xrender } from '@/components'
import { Button } from 'famc'
const { FmGenerator } = Xrender
const defaultValue = {}
const Demo = () => {
  const fRef: any = useRef()

  const onExport = useCallback(() => {
    console.log(fRef.current.getGeneratorScheam())
  }, [])
  return (
    <div>
      <Button type="primary" onClick={onExport}>
        导出
      </Button>
      <FmGenerator defaultValue={defaultValue} cRef={fRef} />
    </div>
  )
}

export default Demo
