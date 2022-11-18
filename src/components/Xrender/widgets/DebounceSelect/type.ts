export interface labelValue {
  label?: string
  value: string
  key?: string
}

export interface schemaType {
  width: string
  enum: string[]
  enumNames: string[]
  isOpenFetch: boolean // 是否开启远程加载
  fetchUrl: string // 加载地址
  fetchDataKey: string // 数据源的key
  lebalName: string
  valueName: string
}

export interface DebounceSelectProps {
  value: string
  onChange: (e: any) => {}
  allowClear: boolean
  disabled: boolean
  readOnly: boolean
  schema: schemaType
  placeholder: string
}
