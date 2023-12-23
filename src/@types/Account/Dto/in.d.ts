import { Role } from '@/store/authStore'

export interface ILoginIn {
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

export interface IAccountIn {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  legality: 0 | 1
  image: string
  confirmEmail: boolean
  confirmPhoneNumber: boolean
  confirmedProfile: boolean
  birthDate: string
  job: string
  nationalId: string
}
