import BlankResolver from './Blank'
import ProLayoutResolver from './ProLayout'
import { ILayoutProps, ILayoutResolver } from '@/types'
import { isNotEmpty } from '@/helpers/object'

const OPEN_LAYOUTS = [BlankResolver]
const AUTH_REQUIRED_LAYOUTS = [ProLayoutResolver, BlankResolver]

export function resolveOpenPage({ routes, children, route, canAccess }: ILayoutProps) {
  route.layout = 'BLANK'
  const resolver = OPEN_LAYOUTS.find(r => r.is(route))
  if (isNotEmpty<ILayoutResolver>(resolver)) {
    return resolver.get({ routes: routes!, children, route, canAccess })
  }
  throw new Error(`no proper layout found for ${route!.path}, please check your code`)
}

export function resolveAuthRequiredPage({ routes, children, route, canAccess }: ILayoutProps) {
  route.layout = 'BLANK'
  const resolver = AUTH_REQUIRED_LAYOUTS.find(r => r.is(route))
  if (isNotEmpty<ILayoutResolver>(resolver)) {
    return resolver.get({ routes: routes!, children, route, canAccess })
  }
  throw new Error(`no proper layout found for ${route!.path}, please check your code`)
}
