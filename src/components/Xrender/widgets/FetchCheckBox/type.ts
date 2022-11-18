export interface RadioLabelValue {
  label: string
  value: string
  disabled?: boolean
  name?: string
  id?: string
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
export interface FetchCheckBoxProps {
  onChange: (e: any) => {}
  value: string[]
  disabled: boolean
  readOnly: boolean
  schema: schemaType
}
