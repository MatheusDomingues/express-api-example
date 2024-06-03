import { CommonResponse } from '@/domain/common/common-response'
import { CreateUserRequest } from '@/domain/requests/create-user-request'
import { CreatedUserResponse } from '@/domain/responses/users/created-user-response'
import { GetAllUsersResponse } from '@/domain/responses/users/get-all-users-response'
import { GetUserResponse } from '@/domain/responses/users/get-user-response'
import { UpdatedUserResponse } from '@/domain/responses/users/updated-user-response'
import { UsersRepository } from '@/repository/users-repository'

async function getAllAsync(): Promise<CommonResponse<GetAllUsersResponse[]>> {
  try {
    const result = await UsersRepository.getAllAsync()

    const usersDto: GetAllUsersResponse[] = result.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }))

    return {
      data: usersDto,
      success: true,
      message: 'Usuários encontrados com sucesso',
      statusCode: 200
    } satisfies CommonResponse<GetAllUsersResponse[]>
  } catch (err) {
    throw {
      message: err?.message || 'Houve um erro interno',
      statusCode: !!err?.message ? 400 : 500
    }
  }
}

async function getByIdAsync(
  id: string
): Promise<CommonResponse<GetUserResponse>> {
  try {
    const result = await UsersRepository.getByIdAsync(id)

    const userDto: GetUserResponse = {
      id: result.id,
      name: result.name,
      email: result.email
    }

    return {
      data: userDto,
      success: true,
      message: 'Usuário encontrado com sucesso',
      statusCode: 200
    } satisfies CommonResponse<GetUserResponse>
  } catch (err) {
    throw {
      message: err?.message || 'Houve um erro interno',
      statusCode: !!err?.message ? 400 : 500
    }
  }
}

async function createAsync(
  request: CreateUserRequest
): Promise<CommonResponse<CreatedUserResponse>> {
  try {
    const result = await UsersRepository.createAsync(request)

    const userDto: CreatedUserResponse = {
      id: result.id,
      name: result.name,
      email: result.email
    }

    return {
      data: userDto,
      success: true,
      message: 'Usuário criado com sucesso',
      statusCode: 201
    } satisfies CommonResponse<CreatedUserResponse>
  } catch (err) {
    throw {
      message: err?.message || 'Houve um erro interno',
      statusCode: !!err?.message ? 400 : 500
    }
  }
}

async function updateAsync(
  id: string,
  request: CreateUserRequest
): Promise<CommonResponse<UpdatedUserResponse>> {
  try {
    const result = await UsersRepository.updateAsync(id, request)

    const userDto: UpdatedUserResponse = {
      id: result.id,
      name: result.name,
      email: result.email
    }

    return {
      data: userDto,
      success: true,
      message: 'Usuário atualizado com sucesso',
      statusCode: 201
    } satisfies CommonResponse<UpdatedUserResponse>
  } catch (err) {
    throw {
      message: err?.message || 'Houve um erro interno',
      statusCode: !!err?.message ? 400 : 500
    }
  }
}

async function deleteByIdAsync(id: string): Promise<CommonResponse<null>> {
  try {
    await UsersRepository.deleteByIdAsync(id)

    return {
      data: null,
      success: true,
      message: 'Usuário deletado com sucesso',
      statusCode: 200
    } satisfies CommonResponse<null>
  } catch (err) {
    throw {
      message: err?.message || 'Houve um erro interno',
      statusCode: !!err?.message ? 400 : 500
    }
  }
}

export const UsersService = {
  getAllAsync,
  getByIdAsync,
  createAsync,
  updateAsync,
  deleteByIdAsync
}
