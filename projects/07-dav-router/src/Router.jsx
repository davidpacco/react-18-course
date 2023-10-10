import { useState, useEffect, Children } from "react"
import { EVENTS } from "../consts"
import { Page404 } from "./pages/404"
import { match } from "path-to-regexp"

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <Page404 /> }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let params = {}

  const routesFromChildren = Children.map(children, ({ type, props }) => {
    const isRoute = type.name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren)
  console.log(routesToUse.filter(Boolean))

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const urlMatch = match(path, { decode: decodeURIComponent })
    const matched = urlMatch(currentPath)
    if (!matched) return false

    params = matched.params
    return true
  })?.Component || DefaultComponent

  return <Page params={params} />
}