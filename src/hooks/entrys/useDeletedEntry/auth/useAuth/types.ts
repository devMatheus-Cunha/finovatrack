export type TypeAccount = 'hybrid' | 'oneCurrency' | ''

export interface UserData {
  id: string
  expirationTimeToken?: string
  token?: string
  email?: string
  name?: string
  typeAccount: TypeAccount
  primary_currency: string
  secondary_currency: string
  admin: boolean
}
