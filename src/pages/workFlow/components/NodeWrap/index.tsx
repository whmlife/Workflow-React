import React, { useState, useCallback, useContext, useMemo } from 'react'
import { Button, FormModal } from 'famc'
import classnames from 'classnames'
import { PlusOutlined, CloseOutlined, ExclamationCircleOutlined, RightOutlined } from '@ant-design/icons'
import { AllUserType, FlowApprovalType } from '@/helpers/enum'
import AddNode from '../AddNode'
import { MainContext } from '../../context'
import { loopParentNode } from '../../util'
import { useNodeModal } from '../../_hooks'
import styles from './index.less'

//  0 发起人 ； 1 审批人（approvalType包含或签和会签）； 2 抄送人 ； 3 条件； 4 条件路由
function NodeWrap({ currentNode, disabled }) {
  const { data, isSave, updateNode } = useContext(MainContext)
  const { show, hide, modalProps } = useNodeModal({ currentNode })

  const [visible, setVisible] = useState(false)

  const deleteNode = useCallback(
    (e) => {
      e.stopPropagation()
      const parent = loopParentNode(data, currentNode.nodeId)
      // 找到当前节点的父节点
      console.log('node parent ============>>>>>', parent)
      console.log('删除节点 data ==========>>>>', data)
      parent.childNodeP = parent.childNodeP.childNodeP
      updateNode(data)
    },
    [data, currentNode, updateNode]
  )

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      // 已读也不能修改
      if (disabled) {
        return
      }
      // 发起人不能修改
      if (currentNode.type !== 0) {
        show()
      }
    },
    [currentNode, disabled, show]
  )

  const onFinish = useCallback(
    (values) => {
      console.log('values ===========>>>>>>>', values)
      const { nodeName, nodeType, ...otherValues } = values
      currentNode.nodeName = nodeName
      currentNode.setting = otherValues
      // 更新节点内容，更新error
      currentNode.error = false
      console.log('data ==========>>>>>', data)
      updateNode(data)
      hide()
    },
    [data, currentNode, hide, updateNode]
  )

  const isShowSponsor = useMemo(() => {
    // 是只读且是审批人且发起人指定
    const isSponsor = currentNode.type === 1 || currentNode.type === 2
    const isSponsorAssign = currentNode?.setting?.nodeUserList?.some(
      (v) => v?.userSet?.type === AllUserType.sponsorAssign
    )
    return disabled && isSponsor && isSponsorAssign
  }, [disabled, currentNode])

  const tableModalValue = useCallback(() => {
    const sponsorAssignValue = currentNode.setting?.nodeUserList?.find(
      (v) => v?.userSet?.type === AllUserType.sponsorAssign
    )
    return sponsorAssignValue?.employees || []
  }, [currentNode])

  const onOk = useCallback(
    (value) => {
      console.log('onOk =========>>>>>>>>', value)
      const newData = currentNode.setting?.nodeUserList?.map((v) => {
        if (v?.userSet?.type === AllUserType.sponsorAssign) {
          return {
            ...v,
            userSet: { type: AllUserType.sponsorAssign, employees: value }
          }
        }
        return v
      })
      currentNode.setting = { ...currentNode.setting, nodeUserList: newData }
      console.log('data ==========>>>>>', data)
      updateNode(data)
      setVisible(false)
    },
    [currentNode, data, updateNode]
  )

  return (
    <div>
      <div className={styles.nodeWrap}>
        <div
          className={classnames(styles.nodeWrapBox, {
            // 发起人不行，已读不行
            [styles.nodeWrapHoverBox]: currentNode?.type !== 0 && !disabled,
            [styles.error]: isSave && currentNode.error
          })}
        >
          <div
            className={classnames(styles.title, {
              [styles.approver]: currentNode?.type === 1,
              [styles.copy]: currentNode?.type === 2
            })}
          >
            <span>
              <span style={{ marginRight: 8 }}>{currentNode.name}</span>
              {currentNode?.setting?.approvalType && (
                <span>{`${
                  currentNode.setting.approvalType === FlowApprovalType.AllApproval ? '(会签)' : '(或签)'
                }`}</span>
              )}
            </span>
            {!!currentNode.type && (
              <span className={classnames({ [styles.none]: disabled })}>
                {/* {<EditOutlined className={styles.close} />} */}
                {<CloseOutlined className={styles.close} style={{ marginLeft: 10 }} onClick={(e) => deleteNode(e)} />}
              </span>
            )}
          </div>
          <div className={styles.content} onClick={(e) => handleClick(e)}>
            <div className={styles.text}>
              <span className={classnames({ [styles.nodeName]: !currentNode.nodeName })}>
                {currentNode.nodeName || `请选择${currentNode.name}`}
              </span>
              {currentNode?.type !== 0 && (
                <RightOutlined className={classnames(styles.icon, { [styles.none]: disabled })} />
              )}
            </div>
          </div>
          {/* 条件框 - 错误提示 */}
          {isSave && currentNode.error && (
            <div className={styles.errorTip}>
              <ExclamationCircleOutlined />
            </div>
          )}
          {/* 是只读且是审批人且发起人指定 */}
          <div className={classnames(styles.addMember, { [styles.none]: !isShowSponsor })}>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              className={styles.btn}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        <AddNode currentNode={currentNode} disabled={disabled} />
      </div>
      <FormModal onFinish={onFinish} {...modalProps} />
    </div>
  )
}

export default NodeWrap
