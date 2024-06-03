import { Router } from 'express'
import UsersRoutes from './v1/users-routes'

export const routes = Router()

routes.use('/api/v1/users', UsersRoutes)
