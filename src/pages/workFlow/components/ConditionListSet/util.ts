export function handleResult(item: { showType: string }, value: any[]) {
  if (!item?.showType) {
    // [{id: xxx, name: xxx}]
    return value?.map((v: { id: any }) => v.id)
  }
  if (item.showType === 'boolean') {
    return [value]
  }
  if (item.showType === 'number' || item.showType === 'string') {
    return [value]
  }
  return value
}
