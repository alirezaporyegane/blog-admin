import { ReactNode, createContext, useEffect, useState } from 'react'

export enum Role {
  WRITER = 'WRITER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum AccountKey {
  ACCOUNT_KEY = 'ACCOUNT'
}

interface IAccount {
  _id: string
  userName: string
  phoneNumber: string
  email: string
  role: Role[]
  firstName: string
  lastName: string
  token: string
  refreshToken: string
  ttl: number
  refreshTtl: number
}

interface IAccountProvider {
  children: ReactNode
}

interface IAccountContext {
  account: IAccount | undefined
  getAccount: () => IAccount
  setAccount: (body?: IAccount) => void
  clearAccount: () => void
  getAccountToken: () => string | undefined
}

export const AccountContext = createContext({
  account: {},
  getAccount: () => {},
  setAccount: () => {},
  clearAccount: () => {},
  getAccountToken: () => {}
} as IAccountContext)

const getLocaleStorage = (key: string): IAccount => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '')
    : ''
}

// eslint-disable-next-line react-refresh/only-export-components
export function AccountProvider({ children }: IAccountProvider) {
  const [account, setAccountState] = useState<IAccount>(() =>
    getLocaleStorage(AccountKey.ACCOUNT_KEY)
  )

  const setLocaleStorage = (key: string, value: IAccount | undefined) => {
    if (value) localStorage.setItem(key, JSON.stringify(value))
  }

  useEffect(() => setLocaleStorage(AccountKey.ACCOUNT_KEY, account), [account])

  function getAccount(): IAccount {
    return account ? account : {}
  }

  function setAccount(body: IAccount | undefined) {
    if (body) setAccountState(body)
  }

  function clearAccount() {
    setAccountState(undefined)
    localStorage.removeItem(AccountKey.ACCOUNT_KEY)
  }

  function getAccountToken() {
    return account?.token
  }

  const ContextValue: IAccountContext = {
    account,
    clearAccount,
    getAccount,
    setAccount,
    getAccountToken
  }

  return (
    <AccountContext.Provider value={ContextValue}>
      {children}
    </AccountContext.Provider>
  )
}
