import { useCallback } from 'react'
import ConditionListSet from '../components/ConditionListSet'

function useConditionItems({ conditionsConfig }) {
  const getItems = useCallback(() => {
    console.log('conditionsConfig =====>>>>>', conditionsConfig)
    const priorityLevelOptions = conditionsConfig?.conditionNodes?.map((v, index) => ({
      label: `优先级${index + 1}`,
      value: index + 1
    }))

    return [
      [
        {
          label: '设置优先级',
          name: 'priorityLevel',
          type: 'select',
          componentProps: {
            options: priorityLevelOptions
          }
        },
        {
          label: '条件名称',
          name: 'name',
          required: true
        }
      ],

      {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        name: 'conditionList',
        render: <ConditionListSet /> // 每个人实现方式不同
      }
    ]
  }, [conditionsConfig])
  return { getItems }
}

export default useConditionItems
