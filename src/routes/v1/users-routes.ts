import { Router } from 'express'
import { UsersController } from '@/controllers/v1/users-controller'

const UsersRoutes = Router()

const { getAll, getById, create, update, deleteById } = UsersController

UsersRoutes.get('/', getAll)
UsersRoutes.get('/:id', getById)
UsersRoutes.post('/', create)
UsersRoutes.put('/:id', update)
UsersRoutes.delete('/:id', deleteById)

export default UsersRoutes
