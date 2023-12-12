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
