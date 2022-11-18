/* eslint-disable react/no-array-index-key */
import { useState, useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, FormModal } from 'famc'
import classnames from 'classnames'
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import AddNode from '../AddNode'
import { MainContext } from '../../context'
import { loopParentNode, conditionStr } from '../../util'
import { useConditionModal } from '../../_hooks'
import styles from './index.less'

function BranchWrap({ value, loopNode, disabled }) {
  const { data, isSave, updateNode } = useContext(MainContext)
  const [selectIndex, setIndex] = useState<any>()
  const { show, hide, modalProps } = useConditionModal({ value, selectIndex, setIndex })

  /* ================ 添加条件 ================ */
  const handleAddBranch = useCallback(
    (e) => {
      e.stopPropagation()
      const len = value.conditionNodes.length + 1
      value.conditionNodes.push({
        nodeName: null,
        name: '条件' + len,
        type: 3,
        nodeId: uuidv4(),
        priorityLevel: len,
        conditionList: [],
        childNodeP: null
      })
      for (let i = 0; i < value.conditionNodes.length; i++) {
        // 如果没有条件且不是最后一个条件节点都为true
        value.conditionNodes[i].error = conditionStr(value, i) == '请设置条件' && i != value.conditionNodes.length - 1
      }
      console.log('data =========>>>>>', data, JSON.stringify(data))
      updateNode(data)
    },
    [value, data, updateNode]
  )

  /* ================ 删除条件（具体某一个） ================ */
  const deleteCondition = useCallback(
    (e, index) => {
      e.stopPropagation()
      console.log('index ========>>>>>', index)

      value.conditionNodes.splice(index, 1)
      value.conditionNodes.map((item, i) => {
        item.priorityLevel = i + 1
        item.name = `条件${i + 1}`
      })

      for (let i = 0; i < value.conditionNodes.length; i++) {
        value.conditionNodes[i].error = conditionStr(value, i) == '请设置条件' && i != value.conditionNodes.length - 1
      }
      updateNode(data)

      // 当条件只剩一个时候，判断条件父级节点是否有子节点
      // 父级节点没有子节点，直接父级节点的子节点为条件的子节点
      // 父节点有子节点就需要再继续查看条件是否有子节点，
      // 条件若没有子节点，则条件的子节点为父节点的子节点；如果有则交换条件的子节点与父节点的子节点（即reData递归交换）
      console.log('value.conditionNodes =========>>>>>>', value.conditionNodes)
      if (value.conditionNodes.length)
        if (value.conditionNodes.length == 1) {
          if (value.childNodeP) {
            if (value.conditionNodes[0].childNodeP) {
              reData(value.conditionNodes[0].childNodeP, value.childNodeP)
            } else {
              value.conditionNodes[0].childNodeP = value.childNodeP
            }
          }
          // value的childNodeP为空，找到父级节点，将父级节点的childNodeP变为value.conditionNodes[0].childNodeP
          const parent = loopParentNode(data, value.nodeId)
          console.log('conditionNodes parent =========>>>>>', parent)
          parent.childNodeP = value.conditionNodes[0].childNodeP

          console.log('删除条件到最后只有一个时候 data ==========>>>>', data)
          updateNode(data)
        }
    },
    [value, data, updateNode]
  )

  /* ================ 交换条件 ================= */
  const transferCondition = useCallback(
    (e, index, type = 1) => {
      e.stopPropagation()
      //向左-1,向右1
      value.conditionNodes[index] = value.conditionNodes.splice(index + type, 1, value.conditionNodes[index])[0]
      value.conditionNodes.map((item, i) => {
        item.priorityLevel = i + 1
      })
      for (let v = 0; v < value.conditionNodes.length; v++) {
        value.conditionNodes[v].error = conditionStr(value, v) == '请设置条件' && v != value.conditionNodes.length - 1
      }
      console.log('value.conditionNodes ==========>>>>>', value.conditionNodes)
      updateNode(data)
    },
    [value, data, updateNode]
  )

  // 设置条件
  const onFinish = useCallback(
    (values) => {
      const { name, priorityLevel, conditionList = [] } = values
      console.log('values ===========>>>>>>>', values)
      console.log('selectIndex ====>>>', selectIndex)
      console.log('value =======>>>>>', value)
      const selectedCondition = value.conditionNodes[selectIndex]
      value.conditionNodes[selectIndex] = { ...selectedCondition, name, conditionList }
      // 将选择优先级的下一个条件，截取出来
      const staging = value.conditionNodes.splice(priorityLevel - 1, 1)
      // 再将截取后的条件放进之前选中修改条件的里面去，截取旧下标
      value.conditionNodes.splice(selectedCondition.priorityLevel - 1, 0, staging[0])
      // 添加新下标
      value.conditionNodes.map((item, i) => {
        item.priorityLevel = i + 1
      })
      for (let v = 0; v < value.conditionNodes.length; v++) {
        value.conditionNodes[v].error = conditionStr(value, v) == '请设置条件' && v != value.conditionNodes.length - 1
      }
      console.log('onFinish.conditionNodes 得到的 ==========>>>>>', value.conditionNodes)
      updateNode(data)
      hide()
    },
    [value, data, selectIndex, updateNode, hide]
  )

  // 点击条件框
  const handleClick = useCallback(
    (e, index) => {
      e.stopPropagation()
      // 只读时候不能编辑条件
      if (!disabled) {
        show()
        setIndex(index)
      }
    },
    [disabled, show]
  )

  return (
    <div className={styles.branchWrap}>
      <div className={styles.branchBoxWrap}>
        <div className={classnames(styles.branchBox, { [styles.disabledBranchBox]: disabled })}>
          <Button type="primary" ghost className={styles.btn} onClick={(e) => handleAddBranch(e)}>
            添加条件
          </Button>
          {value.conditionNodes.map((item, index) => {
            const length = value.conditionNodes?.length

            return (
              <div className={styles.itemColBox} key={index}>
                {/* 条件框 */}
                <div className={styles.conditionNode}>
                  <div className={styles.conditionNodeBox}>
                    <div
                      className={classnames(styles.autoJudge, styles.active, {
                        [styles.error]: isSave && item.error,
                        [styles.disabledAutoJudge]: !disabled
                      })}
                      onClick={(e) => handleClick(e, index)}
                    >
                      {/* 后退按钮 */}
                      {index !== 0 && (
                        <div
                          className={classnames(styles.sortLeft, { [styles.none]: disabled })}
                          onClick={(e) => transferCondition(e, index, -1)}
                        >
                          &lt;
                        </div>
                      )}
                      <div className={styles.titleWrapper}>
                        {/* 条件框 - 条件名，优先级，关闭 */}
                        <span className={styles.filterOperate}>
                          <span className={styles.filterName}>{item.name}</span>
                          <span className={styles.levelClose}>
                            <span className={styles.priorityTitle}>{`优先级${item.priorityLevel}`}</span>
                            <CloseOutlined
                              className={classnames(styles.close, { [styles.none]: disabled })}
                              onClick={(e) => deleteCondition(e, index)}
                            />
                          </span>
                        </span>
                        {/* 当没有设置条件时，即conditionList为空 */}
                        <div className={styles.content}>{conditionStr(value, index)}</div>
                      </div>
                      {/* 前进按钮 */}
                      {index !== length - 1 && (
                        <div
                          className={classnames(styles.sortRight, { [styles.none]: disabled })}
                          onClick={(e) => transferCondition(e, index)}
                        >
                          &gt;
                        </div>
                      )}
                      {/* 条件框 - 错误提示 */}
                      {isSave && item.error && (
                        <div className={styles.errorTip}>
                          <ExclamationCircleOutlined />
                        </div>
                      )}
                    </div>
                    <AddNode currentNode={item} disabled={disabled} />
                  </div>
                </div>
                {/* 下面的子节点渲染 */}
                {item?.childNodeP ? loopNode(item.childNodeP) : null}
                {/* 各种左右下线 */}
                {index === 0 && <div className={styles.topLeftLine} />}
                {index === 0 && <div className={styles.bottomLeftLine} />}
                {index === length - 1 && <div className={styles.topRightLine} />}
                {index === length - 1 && <div className={styles.bottomRightLine} />}
              </div>
            )
          })}
        </div>
        <FormModal onFinish={onFinish} {...modalProps} />
        <AddNode currentNode={value} disabled={disabled} />
        {value?.childNodeP ? loopNode(value.childNodeP) : null}
      </div>
    </div>
  )
}
export default BranchWrap

function reData(data, addData) {
  if (!data.childNodeP) {
    data.childNodeP = addData
  } else {
    reData(data.childNodeP, addData)
  }
}
