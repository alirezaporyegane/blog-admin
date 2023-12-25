import { Role, useAuthStore } from '@/store/authStore'

type Params = {
  [key: string]: unknown
}

export function createQueryParams(url: string) {
  const params: Params = {}
  const searchParams = new URL(url).searchParams
  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }

  return params
}

export function createQueryParamsForGetCount(url: string) {
  const params: Params = {}
  const searchParams = new URL(url).searchParams
  const queries = ['page', 'size', 'sortType', 'sortColumn']
  for (const [key, value] of searchParams.entries()) {
    if (!queries.includes(key)) params[key] = value
  }

  return params
}

export function isValidRole(roles: Role[]) {
  return roles.find((role) =>
    useAuthStore.getState().account?.role.includes(role)
  )
}
