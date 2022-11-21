import { useCallback, useEffect } from 'react'
import { FormModal, Form } from 'famc'
import useConditionItems from './useConditionItems'

function useConditionModal({ value: conditionsConfig, selectIndex: index, setIndex }) {
  const { show, hide, visible } = FormModal.useModal()

  const [form] = Form.useForm()

  useEffect(() => {
    const selectCondition = conditionsConfig.conditionNodes[index]
    const priority = selectCondition?.priorityLevel
    if (priority) {
      form.setFieldsValue({ priorityLevel: priority, name: selectCondition?.name })
    }
  }, [form, conditionsConfig, index])

  const { getItems } = useConditionItems({ conditionsConfig })
  const items = getItems()

  const onCancel = useCallback(() => {
    form.resetFields()
    hide()
    setIndex()
  }, [form, hide, setIndex])

  return {
    hide,
    show,
    modalProps: {
      title: '条件设置',
      items,
      visible,
      onCancel,
      initialValues: conditionsConfig?.conditionNodes?.[index],
      width: 680,
      form,
      formProps: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      }
    }
  }
}

export default useConditionModal
