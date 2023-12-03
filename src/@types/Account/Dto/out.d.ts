export interface IAccountLoginDtoOut {
  phoneNumber: string
  password: string
  uniqueId: string
}

export interface IAccountRegisterDtoOut {
  phoneNumber: string
  password: string
  uniqueId: string
  firstName: string
  lastName: string
  userName: string
  confirmPassword: string
  email: string
}

export interface IAccountDtoOut {
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

