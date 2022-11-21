import React from 'react'

interface ContextProps {
  data: any
  isSave: boolean
  updateNode: (node: any) => void
}

export const MainContext = React.createContext<ContextProps>({
  data: {},
  isSave: false,
  updateNode: () => {}
})
