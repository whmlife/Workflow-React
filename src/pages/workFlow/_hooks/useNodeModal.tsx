// import { useCallback } from 'react'
import { FormModal, Form } from 'famc'
import useNodeItems from './useNodeItems'

function useNodeModal({ currentNode }) {
  const { show, hide, visible } = FormModal.useModal()

  const [form] = Form.useForm()

  // const onSelect = useCallback(
  //   (v) => {
  //     form.setFieldsValue({ totalPrice: v?.totalPrice ? Number(v.totalPrice) : undefined })
  //   },
  //   [form]
  // )

  const items = useNodeItems({ currentNode })

  return {
    hide,
    show,
    modalProps: {
      title: '节点编辑',
      items,
      visible,
      onCancel: hide,
      initialValues: { ...currentNode.setting, nodeName: currentNode.nodeName },
      width: 680,
      form,
      formProps: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      }
    }
  }
}

export default useNodeModal
