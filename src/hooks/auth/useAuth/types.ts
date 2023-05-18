export type TypeAccount = 'real' | 'euro' | 'hybrid'

export interface UserData {
  id: string,
  expirationTimeToken?: string,
  token?: string,
  email?: string,
  name?: string
  typeAccount: TypeAccount
}
