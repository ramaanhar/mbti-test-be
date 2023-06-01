import { Application, Router } from 'express'
import AuthRouter from './auth.route'

const _routes: Array<[string, Router]> = [['/api/auth', AuthRouter]]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
