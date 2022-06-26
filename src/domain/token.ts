import { sign, verify } from 'jsonwebtoken'

import { Account } from './account'

export type JwtSecret = string
export type JwtToken = string

export type JwtTokenPayload = {
  account: {
    id: Account['id']
  }
}

const jwtOptions = {
  expiresIn: '5d',
  issuer: 'foxy-api',
  audience: 'foxy',
}

export const createToken = (secret: JwtSecret) => (payload: JwtTokenPayload) =>
  sign(payload, secret, jwtOptions)

export const verifyToken =
  (secret: JwtSecret) =>
  (token: JwtToken): Promise<JwtTokenPayload | null> =>
    new Promise(res =>
      verify(token, secret, jwtOptions, (err, result) => {
        if (err) {
          return res(null)
        }

        return res({
          account: (result as JwtTokenPayload)?.account,
        })
      }),
    )
