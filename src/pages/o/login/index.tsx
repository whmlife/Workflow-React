import React, { useEffect } from 'react'
import { Tabs } from 'antd'

import { useModel, Redirect, useIntl } from 'umi'

import LangSwitch from '@/components/buttons/LangSwitch'
import Title from './components/Title'
import AccountPane from './components/AccountPane'

import { isString, isNotEmpty, pick } from '@/helpers/object'

import styles from './index.less'

function Login() {
  const { initialState } = useModel('@@initialState')
  const { initBackground } = useModel('useLoginModel', m => pick(m, 'initBackground'))
  const { formatMessage } = useIntl()

  useEffect(() => {
    initBackground()
  }, [initBackground])

  if (isNotEmpty(initialState) && !isString(initialState)) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div id="bg-animate" className={styles.bgContainer}></div>
      <div className={styles.loginContainer}>
        <Title />
        <Tabs defaultActiveKey="accountway" className={styles.signinContainer}>
          <Tabs.TabPane
            tab={formatMessage({ id: 'LOGIN_TAB_ACCOUNT' })}
            key="accountway"
            className={styles.signinInnerContainer}
          >
            <AccountPane />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <LangSwitch className={styles.lang} />
    </>
  )
}

export default Login
