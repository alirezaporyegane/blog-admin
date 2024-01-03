import { create } from 'zustand'

export enum Role {
  WRITER = 'WRITER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum AccountKey {
  ACCOUNT_KEY = 'ACCOUNT'
}

export type IAccount = {
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

type AuthStore = {
  account: IAccount | null
  setAccount: (value: IAccount) => void
  clearAccount: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  account: localStorage.getItem(AccountKey.ACCOUNT_KEY) ? JSON.parse(localStorage.getItem(AccountKey.ACCOUNT_KEY) || '') : null,
  setAccount: (value) => {
    set({ account: value })
    setLocaleStorage(AccountKey.ACCOUNT_KEY, value)
  },
  clearAccount: () => {
    set({ account: null })
    removeLocaleStorage(AccountKey.ACCOUNT_KEY)
  }
}))

function setLocaleStorage(key: string, value: IAccount) {
  if (value) localStorage.setItem(key, JSON.stringify(value))
}

function removeLocaleStorage(key: string) {
  localStorage.removeItem(key)
}
