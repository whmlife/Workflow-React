import { useCallback } from 'react'
import { FormModal, Form } from 'famc'
import useFilterItems from './useFilterItems'

function useFilterModal({ initFilter }) {
  const { show, hide, visible } = FormModal.useModal()

  const [form] = Form.useForm()

  const items = useFilterItems()

  const onCancel = useCallback(() => {
    form.resetFields()
    hide()
    // setInitFilter()
  }, [form, hide])

  return {
    hide: onCancel,
    show,
    modalProps: {
      title: '选择条件',
      items,
      visible,
      onCancel,
      initialValues: initFilter || undefined,
      width: 680,
      form,
      formProps: {
        wrapperCol: { span: 24 }
      }
    }
  }
}

export default useFilterModal
