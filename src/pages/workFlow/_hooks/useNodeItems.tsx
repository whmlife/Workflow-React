import React, { useMemo } from 'react'
import {
  FlowApprovalType,
  nodeTypeStatus,
  nodeTypeStatusLabel,
  FlowApprovalTypeOptions,
  nodeApprovalSetStatus
} from '@/helpers/enum'
import NodeSet from '../components/NodeSet'

function useNodeItems({ currentNode }) {
  console.log('currentNode =====>>>>', currentNode)
  const isApproval = currentNode.type === nodeTypeStatus.approval
  return useMemo(() => {
    const items = [
      {
        label: '节点类型',
        name: 'nodeType',
        type: 'render',
        render: () => (
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{nodeTypeStatusLabel[currentNode.type]}</div>
        )
      },
      {
        label: '节点名称',
        name: 'nodeName',
        required: true
      },
      // {
      //   label: '节点人员',
      //   name: 'nodeUserList',
      //   // sorter控制是否出现人员类型排序，默认排序
      //   render: <NodeUserList />
      // },
      isApproval
        ? {
            label: '审批方式',
            name: 'approvalType',
            required: true,
            type: 'radioGroup',
            initialValue: FlowApprovalType.AllApproval,
            componentProps: { options: FlowApprovalTypeOptions }
          }
        : null,
      isApproval
        ? {
            label: '节点描述',
            name: 'remark',
            type: 'textarea',
            componentProps: {
              maxLength: 300
            }
          }
        : null,
      isApproval
        ? {
            label: '节点设置',
            name: 'nodeSet',
            render: <NodeSet />,
            rules: [
              { required: true, message: '请选择节点设置' },
              {
                validator: (rule, value) => {
                  if (!value) {
                    return Promise.resolve()
                  }
                  if (!value?.type) {
                    return Promise.reject(new Error('请选择节点设置'))
                  }
                  if (value?.type?.includes(nodeApprovalSetStatus.assign) && !value?.employees?.length) {
                    return Promise.reject(new Error('请选择成员'))
                  }
                  return Promise.resolve()
                }
              }
            ]
          }
        : null
    ]
    return items.filter((v) => v)
  }, [currentNode, isApproval])
}

export default useNodeItems
