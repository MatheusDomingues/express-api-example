import { CommonResponse } from '@/domain/common/common-response'
import { CreatedUserResponse } from '@/domain/responses/users/created-user-response'
import { GetAllUsersResponse } from '@/domain/responses/users/get-all-users-response'
import { GetUserResponse } from '@/domain/responses/users/get-user-response'
import { UpdatedUserResponse } from '@/domain/responses/users/updated-user-response'
import { UsersService } from '@/services/users-service'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

async function getAll(_: Request, res: Response) {
  try {
    const result = await UsersService.getAllAsync()

    const data: CommonResponse<GetAllUsersResponse[]> = {
      ...result,
      statusCode: undefined
    }

    return res.status(result.statusCode).json(data)
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      data: null,
      success: false,
      message: error?.message || 'Houve um erro interno'
    } satisfies CommonResponse<null>)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const result = await UsersService.getByIdAsync(id)

    const data: CommonResponse<GetUserResponse> = {
      ...result,
      statusCode: undefined
    }

    return res.status(result.statusCode).json(data)
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      data: null,
      success: false,
      message: error?.message || 'Houve um erro interno'
    } satisfies CommonResponse<null>)
  }
}

async function create(req: Request, res: Response) {
  try {
    const createScheme = z.object({
      name: z
        .string({ required_error: 'Nome é obrigatório' })
        .min(1)
        .max(50, { message: 'Nome deve conter até 50 caracteres' }),
      email: z
        .string({ required_error: 'Email é obrigatório' })
        .min(1)
        .max(50, { message: 'Email deve conter até 50 caracteres' })
    })

    const request = createScheme.parse(req.body)

    const result = await UsersService.createAsync({
      email: request.email.trim(),
      name: request.name.trim()
    })

    const data: CommonResponse<CreatedUserResponse> = {
      ...result,
      statusCode: undefined
    }

    return res.status(result.statusCode).json(data)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        data: null,
        success: false,
        message: error.errors[0].message
      } satisfies CommonResponse<null>)
    }

    return res.status(error?.statusCode || 500).json({
      data: null,
      success: false,
      message: error?.message || 'Houve um erro interno'
    } satisfies CommonResponse<null>)
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params
    const createScheme = z.object({
      name: z.string().optional(),
      email: z.string().optional()
    })

    const request = createScheme.parse(req.body)

    const result = await UsersService.updateAsync(id, {
      email: request?.email?.trim(),
      name: request?.name?.trim()
    })

    const data: CommonResponse<UpdatedUserResponse> = {
      ...result,
      statusCode: undefined
    }

    return res.status(result.statusCode).json(data)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        data: null,
        success: false,
        message: error.errors[0].message
      } satisfies CommonResponse<null>)
    }

    return res.status(error?.statusCode || 500).json({
      data: null,
      success: false,
      message: error?.message || 'Houve um erro interno'
    } satisfies CommonResponse<null>)
  }
}

async function deleteById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const result = await UsersService.deleteByIdAsync(id)

    const data: CommonResponse<null> = {
      ...result,
      statusCode: undefined
    }

    return res.status(result.statusCode).json(data)
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      data: null,
      success: false,
      message: error?.message || 'Houve um erro interno'
    } satisfies CommonResponse<null>)
  }
}

export const UsersController = {
  getAll,
  getById,
  create,
  update,
  deleteById
}
