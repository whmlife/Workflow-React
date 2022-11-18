import { useMemo } from 'react'
import FilterCheck from '../components/FilterCheck'

function useFilterItems() {
  return useMemo(() => {
    return [
      {
        name: 'filter',
        render: <FilterCheck />
      }
    ]
  }, [])
}

export default useFilterItems
