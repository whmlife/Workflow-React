/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useImperativeHandle } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MainContext } from './context'
import { message, Button } from 'famc'
import classnames from 'classnames'
import NodeWrap from './components/NodeWrap'
import BranchWrap from './components/BranchWrap'
import { loopValidateNode, loopEmployeeType } from './util'

import styles from './index.less'

//  0 发起人 ； 1 审批人（approvalType包含或签和会签）； 2 抄送人起人； 3 条件； 4 条件路由
/**
 * @enum
 * @property {number} type - 类型 - 0 发起人 ； 1 审批人（approvalType包含或签和会签）； 2 抄送人起人； 3 条件； 4 条件路由
 * @property {string} nodeName - 节点名称
 * @property {string} name - 节点title名称
 * @property {string} nodeId - 节点唯一key
 * @property {object} childNodeP - 子节点(结构和这个相同)
 * @property {boolean} error - 节点是否填写内容
 * @property {object} setting - 节点设置内容
 * @property {number} priorityLevel - 条件节点优先级
 * @property {array} conditionNodes - 条件节点
 * @property {array} conditionList - 条件节点设置条件
 */
const INIT_DATA = {
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
/**
 * @param {boolean} disabled 是否可读（true即不能操作只能读）
 * @returns
 */
function WorkFlowView(props) {
  const { disabled, iref } = props
  const [data, setData] = useState(INIT_DATA)
  // 是否有保存，保存的时候进行错误提示
  const [isSave, setSave] = useState(false)
  const [scaleRate, setScaleRate] = useState(100)

  /**
   * TODO：校验指定人员 --- 获取数据
   */
  useImperativeHandle(iref, () => ({
    getData: () => {
      /* 需要校验节点里是否填写内容 */
      const check = loopValidateNode(data)
      if (check) {
        message.warning('请填写节点内容')
        return
      }
      return data
    },
    getSponsorData: () => {
      /* 需要校验审批，抄送节点里选择发起人指定，是否添加了人员 */
      const check = loopEmployeeType(data)
      if (check) {
        message.warning('请添加发起人指定人员')
        return
      }
      return data
    }
  }))

  const updateNode = useCallback((node) => {
    const newNode = JSON.parse(JSON.stringify(node))
    console.log('newNode ----------->>>>', newNode)
    setData(newNode)
  }, [])

  const zoomSize = useCallback(
    (type) => {
      if (type === 1) {
        if (scaleRate === 50) {
          return
        }
        setScaleRate(scaleRate - 10)
      } else {
        if (scaleRate === 200) {
          return
        }
        setScaleRate(scaleRate + 10)
      }
    },
    [scaleRate]
  )

  const handleSave = useCallback(() => {
    setSave(true)
    console.log('json 字符串 =====================<<<<<<<<', JSON.stringify(data))
    console.log(data)
  }, [data])

  const loopNode = useCallback(
    (value: any) => {
      if (value?.type !== 4) {
        return (
          <div>
            <NodeWrap currentNode={value} disabled={disabled} />
            {value?.childNodeP && loopNode(value.childNodeP)}
          </div>
        )
      }
      return <BranchWrap value={value} loopNode={loopNode} disabled={disabled} />
    },
    [disabled]
  )

  return (
    <MainContext.Provider value={{ data, isSave, updateNode }}>
      <div className={styles.navContent}>
        <section className={styles.designFlow}>
          <Button type="primary" onClick={handleSave} className={styles.btn}>
            发布
          </Button>
          {/*  { [styles.hidden]: disabled } */}
          <div className={classnames(styles.zoom)}>
            <div className={styles.zoomOut} onClick={() => zoomSize(1)} />
            <span>{`${scaleRate}%`}</span>
            <div className={styles.zoomIn} onClick={() => zoomSize(2)} />
          </div>

          <div
            className={styles.boxScale}
            style={{ transform: `scale(${scaleRate / 100})`, transformOrigin: '50% 0 0' }}
          >
            {loopNode(data)}
            <div className={styles.endNode}>
              <div className={styles.endCirle} />
              <div className={styles.endText}>流程结束</div>
            </div>
          </div>
        </section>
      </div>
    </MainContext.Provider>
  )
}

export default React.forwardRef((props: any, ref) => <WorkFlowView {...props} iref={ref} />)
