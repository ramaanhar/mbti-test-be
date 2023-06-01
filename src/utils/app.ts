import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import logger from 'morgan'
import routes from '../routes'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(logger('dev'))

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'Hello World' })
})

export default app
