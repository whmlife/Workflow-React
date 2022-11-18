import { useRef, useCallback, useImperativeHandle } from 'react'
import Generator, { defaultSettings, defaultGlobalSettings, defaultCommonSettings } from 'fr-generator'
import { DebounceMultiSelect, DebounceSelect, FetchCheckBox, FetchRadio } from '../widgets'
import useSettings from '../hooks/useSettings'
import { formateScheam } from './utils'

import styles from './index.less'

// console.log(defaultSettings, 'defaultSettings')
// console.log(defaultGlobalSettings, 'defaultGlobalSettings')
// console.log(defaultCommonSettings, 'defaultCommonSettings')

import { commonSettings } from '../widgets/defaultConfig'

interface FmGeneratorProps {
  defaultValue: any
  cRef?: any
}

const FmGenerator = (props: FmGeneratorProps) => {
  const { defaultValue, cRef } = props
  const { configSettings } = useSettings()
  const generatorRef: any = useRef()

  const getScheam = useCallback(() => {
    let scheam = generatorRef.current.getValue()
    return {
      formateScheam: formateScheam(scheam),
      scheam
    }
  }, [])

  useImperativeHandle(cRef, () => ({
    getGeneratorScheam: () => {
      return getScheam()
    }
  }))
  return (
    <div className={styles.gengratorContent}>
      <Generator
        extraButtons={[true, true, false, false]}
        defaultValue={defaultValue}
        ref={generatorRef}
        commonSettings={commonSettings}
        widgets={{
          DebounceSelect,
          DebounceSelectRead: DebounceSelect.ReadWidget,
          FetchRadio,
          FetchRadioRead: FetchRadio.ReadWidget,
          DebounceMultiSelect,
          DebounceMultiSelectRead: DebounceMultiSelect.ReadWidget,
          FetchCheckBox,
          FetchCheckBoxRead: FetchCheckBox.ReadWidget
        }}
        settings={configSettings}
      />
    </div>
  )
}

export default FmGenerator
