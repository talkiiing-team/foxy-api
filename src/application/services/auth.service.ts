import { z } from 'zod'
import { AccountsRepository } from '@/application/interfaces/accounts.repository'
import { Account } from '@/domain/account'
import { InvalidInputError } from '@/common/errors/invalid-input.error'
import { verifyPassword } from '@/domain/password'
import { InvalidCredentialsError } from '@/common/errors/invalid-credentials.error'
import {
  createToken,
  JwtToken,
  JwtTokenPayload,
  verifyToken,
} from '@/domain/token'

const ByPasswordInput = Account.pick({
  email: true,
  password: true,
})

type ByPasswordInput = z.infer<typeof ByPasswordInput>

type AuthResult = {
  jwt: JwtToken
  payload: JwtTokenPayload
}

export type AuthServiceDeps = {
  accountsRepository: AccountsRepository
  jwtTokenSecret: string
}

export class AuthService {
  private accountsRepository: AccountsRepository
  private jwtTokenSecret: string

  constructor({ accountsRepository, jwtTokenSecret }: AuthServiceDeps) {
    this.accountsRepository = accountsRepository
    this.jwtTokenSecret = jwtTokenSecret
  }

  async byPassword(
    credentials: ByPasswordInput,
  ): Promise<InvalidInputError | InvalidCredentialsError | AuthResult> {
    const validated = await ByPasswordInput.safeParseAsync(credentials)

    if (!validated.success) {
      return InvalidInputError.ofZodError(validated.error)
    }

    const { data } = validated

    const realUser = await this.accountsRepository.getAccountByEmail({
      email: data.email,
    })

    if (!realUser) {
      return new InvalidCredentialsError()
    }

    const isValidPassword = await verifyPassword(realUser.password)(
      data.password,
    )

    if (!isValidPassword) {
      return new InvalidCredentialsError()
    }

    const payload: JwtTokenPayload = {
      account: {
        id: realUser.id,
      },
    }

    const token = await createToken(this.jwtTokenSecret)(payload)

    return {
      jwt: token,
      payload,
    }
  }

  async getCommonUserInfoByToken(token: JwtToken) {
    const verified = await verifyToken(this.jwtTokenSecret)(token)

    if (!verified) {
      return new InvalidCredentialsError()
    }

    return this.accountsRepository.getCommonUserInfo(verified.account)!
  }
}
