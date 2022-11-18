import { useImperativeHandle } from 'react'
import FormRender, { useForm } from 'form-render'
import { DebounceMultiSelect, DebounceSelect, FetchCheckBox, FetchRadio } from '../widgets'
import { formateFormData } from './utils'

import styles from './index.less'
interface FmFormRenderProps {
  schema: any
  cRef?: any
  readOnly?: boolean // 是否是只读模式
  onValuesChange?: (params: any) => void
  onSubmit?: (params: any) => void
}
function FmFormRender(props: FmFormRenderProps) {
  const { schema, cRef, readOnly = false, onValuesChange, onSubmit } = props
  const form = useForm()

  const handleSubmit = (formData: any, errors: any) => {
    if (Array.isArray(errors) && errors.length) return
    onSubmit && onSubmit({ formData, apiData: formateFormData(formData) })
    return { formData, apiData: formateFormData(formData) }
  }

  useImperativeHandle(cRef, () => ({
    submit: () => {
      return form.submit()
    },
    getValues: () => {
      return form.getValues()
    },
    setValues: (formData: any) => {
      return form.setValues(formData)
    }
  }))
  // const onValuesChange = useCallback((changedValues, allvalues) => {
  //   console.log(changedValues, allvalues)
  // }, [])
  return (
    <>
      <FormRender
        readOnly={readOnly}
        // watch={}
        className={styles.FormRenderStyle}
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
        form={form}
        onFinish={handleSubmit}
        onValuesChange={onValuesChange}
        schema={schema}
      />
    </>
  )
}
FmFormRender.formateFormData = formateFormData
export default FmFormRender
