import { DebounceSelect, FetchRadio, DebounceMultiSelect, FetchCheckBox } from '../widgets'

import { defaultBaseConfig, defaultSeniorConfig, defaultLayoutConfig } from '../widgets/defaultConfig'

const { baseInput, baseTextArea, baseDate, baseumber, baseCheckbox, baseSwitch } = defaultBaseConfig //基础组件

const { seniorDateRange } = defaultSeniorConfig

const { layoutObject } = defaultLayoutConfig

function useSettings() {
  const configSettings = [
    {
      title: '基础组件',
      widgets: [
        baseInput,
        baseTextArea,
        baseDate,
        baseumber,
        baseCheckbox,
        baseSwitch,
        DebounceSelect.config,
        FetchRadio.config,
        DebounceMultiSelect.config,
        FetchCheckBox.config
      ]
    },
    {
      title: '高级组件',
      widgets: [seniorDateRange]
    },
    {
      title: '布局组件',
      widgets: [layoutObject]
    }
  ]
  return {
    configSettings
  }
}

export default useSettings
