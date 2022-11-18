export function handleResult(item, value) {
  if (!item?.showType) {
    // [{id: xxx, name: xxx}]
    return value?.map((v) => v.id)
  }
  if (item.showType === 'boolean') {
    return [value]
  }
  if (item.showType === 'number' || item.showType === 'string') {
    return [value]
  }
  return value
}
