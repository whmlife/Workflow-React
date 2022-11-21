import React, { useState, useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Popover, Button } from 'famc'
import classnames from 'classnames'
import { PlusOutlined, UserOutlined, DingdingOutlined, GoldOutlined } from '@ant-design/icons'
import { MainContext } from '../../context'
import styles from './index.less'

export function getCode(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function AddNode({ currentNode, disabled }) {
  const [visible, setVisible] = useState(false)

  const { data, updateNode } = useContext(MainContext)

  const addType = useCallback(
    (type) => {
      setVisible(false)
      console.log('addType currentNode ==========>>>>>>>>', currentNode)
      // debugger
      // 用链表新增新Node
      // currentNode是父指针，下一个子指针currentNode.childNodeP，要在父指针和子指针之间加一个数据
      // 即 currentNode => newNode => currentNode.childNodeP
      if (type != 4) {
        // type为1 审批人；type为2 抄送人
        const initData = {
          nodeId: uuidv4(), // 节点唯一标识符ID
          nodeName: null, // 节点名称
          error: true,
          type: type,
          name: `${getCode(1, 100)} *** ${type === 1 ? '审批人' : '抄送人'}`,
          childNodeP: currentNode.childNodeP // newNode.childNodeP => currentNode.childNodeP
        }
        const newNode = Object.assign({}, initData)
        currentNode.childNodeP = newNode
        updateNode(data)
      } else {
        const initData = {
          nodeName: null,
          type: 4,
          name: `${getCode(201, 300)} *** 路由`,
          nodeId: uuidv4(),
          childNodeP: null,
          conditionNodes: [
            {
              nodeName: null,
              name: '条件1',
              error: true,
              type: 3,
              priorityLevel: 1,
              conditionList: [],
              nodeUserList: [],
              nodeId: uuidv4(),
              childNodeP: currentNode.childNodeP
            },
            {
              nodeName: null,
              name: '条件2',
              type: 3,
              priorityLevel: 2,
              conditionList: [],
              nodeUserList: [],
              nodeId: uuidv4(),
              childNodeP: null
            }
          ]
        }
        const newNode = Object.assign({}, initData)
        currentNode.childNodeP = newNode
        updateNode(data)
      }
    },
    [data, updateNode, currentNode]
  )

  const addNodeBtnContent = useCallback(() => {
    // 后续用svg来代替，暂时这样
    return (
      <div className={styles.popverBody}>
        <div className={classnames(styles.popverItem, styles.approver)}>
          <Button
            shape="circle"
            icon={<UserOutlined className={styles.popverIcon} />}
            className={styles.itemBtn}
            onClick={() => addType(1)}
          />
          <p>审批人</p>
        </div>
        <div className={classnames(styles.popverItem, styles.copyer)}>
          <Button
            shape="circle"
            icon={<DingdingOutlined className={styles.copyerIcon} />}
            className={styles.itemBtn}
            onClick={() => addType(2)}
          />
          <p>抄送人</p>
        </div>
        <div className={classnames(styles.popverItem, styles.condition)}>
          <Button
            shape="circle"
            icon={<GoldOutlined className={styles.conditionIcon} />}
            className={styles.itemBtn}
            onClick={() => addType(4)}
          />
          <p>条件分支</p>
        </div>
      </div>
    )
  }, [addType])

  const handleVisibleChange = useCallback((v) => setVisible(v), [])

  return (
    <div className={styles.addNodeBtnBox}>
      <div className={classnames(styles.addNodeBtn, { [styles.hidden]: disabled })}>
        <Popover
          content={addNodeBtnContent}
          placement="rightTop"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button type="primary" shape="circle" icon={<PlusOutlined />} className={styles.btn} />
        </Popover>
      </div>
    </div>
  )
}

export default AddNode
