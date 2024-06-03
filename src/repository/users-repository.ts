import { prisma } from '@/database'
import { UserModel } from '@/domain/models/user-model'
import { CreateUserRequest } from '@/domain/requests/create-user-request'
import { UpdateUserRequest } from '@/domain/requests/update-user-request'

async function getAllAsync(): Promise<UserModel[]> {
  try {
    return await prisma.user.findMany({
      include: {
        bookings: true
      }
    })
  } catch (err) {
    throw err
  }
}

async function getByIdAsync(id: string): Promise<UserModel> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        bookings: true
      }
    })

    if (!user)
      throw new Error('Usuário não encontrado', {
        cause: 'invalid_request'
      })

    return user
  } catch (err) {
    if (err.cause === 'invalid_request') throw err
    throw null
  }
}

async function createAsync(request: CreateUserRequest): Promise<UserModel> {
  try {
    const hasEmail = await prisma.user.findUnique({
      where: { email: request.email }
    })

    if (!!hasEmail)
      throw new Error('Já existe um usuário com esse email cadastrado', {
        cause: 'invalid_request'
      })

    const response = await prisma.user.create({
      data: {
        name: request.name,
        email: request.email
      },
      include: {
        bookings: true
      }
    })

    return response
  } catch (err) {
    if (err.cause === 'invalid_request') throw err
    throw null
  }
}

async function updateAsync(
  id: string,
  request: UpdateUserRequest
): Promise<UserModel> {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user)
      throw new Error('Usuário não encontrado', {
        cause: 'invalid_request'
      })

    if (!!request.email) {
      const hasEmail = await prisma.user.findFirst({
        where: { id: { not: id }, email: request.email }
      })

      if (!!hasEmail)
        throw new Error('Email digitado já existe na base de dados', {
          cause: 'invalid_request'
        })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: request?.name,
        email: request?.email
      }
    })

    return updatedUser
  } catch (err) {
    if (err.cause === 'invalid_request') throw err
    throw null
  }
}

async function deleteByIdAsync(id: string): Promise<UserModel> {
  try {
    return await prisma.user.delete({ where: { id } })
  } catch (err) {
    throw null
  }
}

export const UsersRepository = {
  getAllAsync,
  getByIdAsync,
  createAsync,
  updateAsync,
  deleteByIdAsync
}
