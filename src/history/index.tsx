/**
 * 导出umi的路由，并增加额外的跳转业务
 */
import { history } from 'umi'
import type {
  LocationState,
  LocationDescriptorObject,
  Path,
  TransitionPromptHook,
  LocationListener,
  UnregisterCallback
} from 'history-with-query'

export function push(path: Path | LocationDescriptorObject<any>, state?: LocationState) {
  return history.push(path as any, state)
}

export function replace(path: Path | LocationDescriptorObject<any>, state?: LocationState) {
  return history.replace(path as any, state)
}

export function go(n: number) {
  return history.go(n)
}

export function goBack() {
  return history.goBack()
}
export function goForward() {
  return history.goForward()
}
export function block(prompt?: boolean | string | TransitionPromptHook<LocationState>): UnregisterCallback {
  return history.block(prompt)
}
export function listen(listener: LocationListener<LocationState>): UnregisterCallback {
  return history.listen(listener)
}
export { history as default } from 'umi'
