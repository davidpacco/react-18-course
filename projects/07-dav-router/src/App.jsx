import { Suspense, lazy } from "react"
import Search from "./pages/Search"
import { Router } from "./Router"
import { Route } from "./Route"

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

const routes = [
  {
    path: '/:lang/about',
    Component: About
  },
  {
    path: '/search/:query',
    Component: Search
  }
]

export function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Router routes={routes}>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Router>
      </Suspense>
    </>
  )
}