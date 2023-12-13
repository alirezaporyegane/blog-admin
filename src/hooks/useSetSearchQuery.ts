import { useSearchParams } from 'react-router-dom'

type SearchQuery = {
  [key: string]: unknown
}

const useSetSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQuery = (query: SearchQuery) => {
    const params: SearchQuery = {}
    if (query && Object.keys(query).length) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          searchParams.delete(key)
          params[key] = value
        }
      })
    }

    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }

    setSearchParams({ ...searchParams, ...params })
  }

  return [searchParams, setQuery] as const
}

export default useSetSearchQuery
