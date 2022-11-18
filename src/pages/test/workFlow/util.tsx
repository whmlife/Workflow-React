import React from 'react'
import { AllUserType, ShowFilterLabel } from '@/helpers/enum'
import { v4 as uuidv4 } from 'uuid'
import { Xrender } from '@/components'

import styles from './index.less'

const { FmFormRender } = Xrender

// 找到父级节点（无论是条件还是childNodeP）
export function loopParentNode(data, key) {
  if (!data) {
    return
  }
  if (data?.childNodeP?.nodeId === key) {
    return data
  }
  for (const cNode of data?.conditionNodes || []) {
    if (cNode?.nodeId === key) {
      return data
    }
  }
  const parentChildNodeP = loopParentNode(data.childNodeP, key)

  if (parentChildNodeP) {
    return parentChildNodeP
  }

  for (const cNode of data?.conditionNodes || []) {
    const cNodeChildNodeP = loopParentNode(cNode, key)
    if (cNodeChildNodeP) {
      return cNodeChildNodeP
    }
  }
}

// 校验审批、抄送节点/条件节点是否填写
export function loopValidateNode(data) {
  if (!data) {
    return false
  }
  if (data?.error) {
    return true
  }

  if (data?.childNodeP?.error) {
    return true
  }
  for (const cNode of data?.conditionNodes || []) {
    if (cNode?.error) {
      return true
    }
  }
  const validateNode = loopValidateNode(data.childNodeP)
  if (validateNode) {
    return true
  }
  for (const cNode of data?.conditionNodes || []) {
    const cNodeValidate = loopValidateNode(cNode)
    if (cNodeValidate) {
      return true
    }
  }
}

// 校验审批节点、抄送节点，选择人员类型且是发起人指定，返回true
export function loopEmployeeType(data) {
  if (!data) {
    return false
  }
  if (data?.setting) {
    const setting = data.setting
    // 存在发起人指定但是未添加人员
    const isHave = setting?.nodeUserList?.some(
      (v) => v?.userSet?.type === AllUserType.sponsorAssign && !v?.userSet?.employees?.length
    )
    if (isHave) {
      return true
    }
  }

  if (data?.childNodeP?.setting) {
    const setting = data.childNodeP.setting
    // 存在发起人指定但是未添加人员
    const isHave = setting?.nodeUserList?.some(
      (v) => v?.userSet?.type === AllUserType.sponsorAssign && !v?.userSet?.employees?.length
    )
    if (isHave) {
      return true
    }
  }

  for (const cNode of data?.conditionNodes || []) {
    const cNodeValidate = loopEmployeeType(cNode)
    if (cNodeValidate) {
      return true
    }
  }
  const validateNode = loopEmployeeType(data.childNodeP)
  if (validateNode) {
    return true
  }
  return false
}

// 设置条件展示
export function conditionStr(nodeConfig, index) {
  console.log('nodeConfig ============>>>>>>>', nodeConfig)
  const { conditionList } = nodeConfig.conditionNodes[index]
  if (conditionList.length == 0) {
    return index == nodeConfig.conditionNodes.length - 1 && nodeConfig.conditionNodes[0].conditionList.length != 0
      ? '其他条件进入此流程'
      : '请设置条件'
  } else {
    let str = ''

    // 筛选出不需要转换的数据
    const filterConditionList = conditionList.filter(
      (v) =>
        v.showName === '发起人所在部门' ||
        v.showName === '发起人所在工作组' ||
        v.showType === 'number' ||
        v.showType === 'boolean' ||
        v.showType === 'range'
    )
    // 还需要填写值
    const eleConditionList = conditionList.filter(
      (v) =>
        v.showName !== '发起人所在部门' &&
        v.showName !== '发起人所在工作组' &&
        v.showType !== 'number' &&
        v.showType !== 'boolean' &&
        v.showType !== 'range' &&
        (v.showType === 'array' ? v.value?.length : v.value)
    )
    console.log('conditionList ======>>>>', conditionList)
    console.log('filterConditionList ===>>>', filterConditionList)
    console.log('eleConditionList =======>>>>>', eleConditionList)

    for (let i = 0; i < filterConditionList.length; i++) {
      const { showName, optFilter, showType, value } = filterConditionList[i]

      if (showName === '发起人所在部门' || showName === '发起人所在工作组') {
        if (value?.length) {
          str += `${showName}：`
          str +=
            value
              .map((item) => {
                return item.name
              })
              .join('或') + ' 并且 '
        }
      }
      if (showType === 'number' && optFilter) {
        if (value) {
          str += `${showName} ${ShowFilterLabel[optFilter]} ${value} 并且 `
        }
      }
      if (showType === 'boolean') {
        if (conditionList[i]?.componentProps?.componentType === 'switch') {
          str += `${showName}：${value ? '打开' : '关闭'} 并且 `
        } else {
          str += `${showName}为${value ? '选中' : '未选中'} 并且 `
        }
      }
      // 时间范围
      if (showType === 'range') {
        str += `${showName}：`
        str += value.join(' ~ ') + ' 并且 '
      }

      // if (showType === 'string') {
      //   str += `${showName}：${value} 并且 `
      // }
      // if (showType === 'array') {
      //   str += `${showName}：`
      //   str += value.join('或') + ' 并且 '
      // }
    }
    console.log('str =======>>>>>', str, eleConditionList.length)
    return str || eleConditionList.length ? (
      eleConditionList.length ? (
        <React.Fragment>
          <span>{eleConditionList.length ? str : str.substring(0, str.length - 4)}</span>
          {eleConditionList?.map((item) => {
            const { uId, value, showName, componentProps } = item
            const schema = {
              type: 'object',
              properties: {
                [`${uId}`]: {
                  ...componentProps,
                  title: '',
                  labelWidth: '0%',
                  props: { value }
                }
              },
              labelWidth: 200,
              displayType: 'row'
            }
            const width = uId.includes('DebounceMultiSelect') && value?.length > 2 ? 202 : ''
            console.log('nnnnn =====<<<<', value, JSON.stringify(schema))
            return (
              <div style={{ display: 'flex', alignItems: 'center' }} key={uId}>
                <div style={{ width }}>
                  <label>{showName}</label>
                  <label style={{ padding: '0 10px 0 2px' }}>:</label>
                </div>
                <div className={styles.formBox}>
                  <FmFormRender schema={schema} readOnly={true} />
                </div>
              </div>
            )
          })}
        </React.Fragment>
      ) : (
        str.substring(0, str.length - 4)
      )
    ) : (
      '请设置条件'
    )

    // return str ? str.substring(0, str.length - 4) : '请设置条件'
  }
}

export const INIT_DATA = {
  type: 0,
  nodeName: '所有人',
  name: '发起人',
  nodeId: uuidv4(),
  conditionNodes: [],
  error: false,
  childNodeP: null,
  setting: null,
  priorityLevel: null,
  conditionList: []
}
export const workFlowData = {
  type: 0,
  nodeName: '所有人',
  name: '发起人',
  nodeId: '1754e1b6-e27d-4ef4-b75d-d264bd7ddb78',
  conditionNodes: [],
  error: false,
  childNodeP: {
    nodeName: '测试',
    error: false,
    type: 1,
    name: '39 *** 审批人',
    nodeId: 'd5881a70-fb8f-4884-b962-a91184857f4a',
    childNodeP: {
      nodeName: null,
      type: 4,
      name: '280 *** 路由',
      nodeId: 'bdc0e6b4-9bfd-4011-9176-1d845b89e92c',
      childNodeP: null,
      conditionNodes: [
        {
          nodeName: null,
          name: '条件1',
          error: false,
          type: 3,
          priorityLevel: 1,
          conditionList: [
            {
              type: 2,
              columnId: '42352e18-e71b-4e04-9d9f-0ae5c4c03eb2',
              showName: '金额',
              uId: 'number_OBGIeM',
              showType: 'number',
              optFilter: '1',
              componentProps: {
                componentType: 'number',
                props: {},
                title: '金额',
                type: 'number',
                width: '100%',
                labelWidth: '22%'
              },
              value: 100
            }
          ],
          nodeUserList: [],
          nodeId: '21c3623e-e0ce-448e-98f5-7be14f507f15',
          childNodeP: {
            nodeName: '条件1里的审批人',
            error: false,
            type: 1,
            name: '14 *** 审批人',
            nodeId: '1db21b88-0542-4b57-bab7-e61b6f41e72b',
            childNodeP: null,
            setting: {
              nodeUserList: [
                {
                  userType: '1',
                  userSet: { type: '1' },
                  type: '人员',
                  name: '发起人指定',
                  _uuid: '60f7ebe1-3cda-42dc-9978-178c316ac613'
                },
                {
                  userType: '1',
                  userSet: { type: '2', employees: [{ id: '4624292778233305175', name: '融合y1' }] },
                  type: '人员',
                  name: '融合y1',
                  _uuid: 'da3b950c-22f7-402a-b96c-2ab226fa0df0'
                }
              ],
              approvalType: 1,
              nodeSet: { type: '1' }
            }
          }
        },
        {
          nodeName: null,
          name: '条件2',
          type: 3,
          priorityLevel: 2,
          conditionList: [],
          nodeUserList: [],
          nodeId: '61913ad9-ee5f-4733-af8e-69579090fed2',
          childNodeP: {
            nodeName: '抄送人',
            error: false,
            type: 2,
            name: '134 *** 抄送人',
            nodeId: '737a6a21-48a0-41f9-8196-721f227c8db5',
            childNodeP: null,
            setting: {
              nodeUserList: [
                {
                  userType: '1',
                  userSet: { type: '1' },
                  type: '人员',
                  name: '发起人指定',
                  _uuid: 'd6bbc4a5-785b-4f59-ac32-5022742b0d14'
                },
                {
                  userType: '1',
                  userSet: {
                    type: '2',
                    employees: [
                      { id: '4624292778233305175', name: '融合y1' },
                      { id: '4624292812593037807', name: 'larissa' }
                    ]
                  },
                  type: '人员',
                  name: '融合y1;larissa',
                  _uuid: 'a722ff6c-d659-4182-b2fe-7e5c90d6e2e0'
                }
              ]
            }
          },
          error: true
        },
        {
          nodeName: null,
          name: '条件3',
          type: 3,
          nodeId: '07e18ccc-0e87-4bf5-91e9-b9ec974cffc2',
          priorityLevel: 3,
          conditionList: [],
          childNodeP: null,
          error: true
        },
        {
          nodeName: null,
          name: '条件4',
          type: 3,
          nodeId: 'd493d7da-a220-4b8b-af3f-03ce3c5539a5',
          priorityLevel: 4,
          conditionList: [],
          childNodeP: null,
          error: false
        }
      ]
    },
    setting: {
      nodeUserList: [
        {
          userType: '1',
          userSet: { type: '1' },
          type: '人员',
          name: '发起人指定',
          _uuid: '0f4224e4-5e1a-4196-8d44-be70fd72bcff'
        },
        {
          userType: '1',
          userSet: {
            type: '2',
            employees: [
              { id: '4624292778233305175', name: '融合y1' },
              { id: '4624292812593037807', name: 'larissa' },
              { id: '4624292812593037813', name: 'lalala2' },
              { id: '4648193412242080648', name: 'df-screen-libs' }
            ]
          },
          type: '人员',
          name: '融合y1;larissa;lalala2;df-screen-libs',
          _uuid: '7244df85-cfa4-4839-a6d8-bded8fd54af9'
        }
      ],
      approvalType: 1,
      nodeSet: { type: '1' }
    }
  },
  setting: null,
  priorityLevel: null,
  conditionList: []
}
