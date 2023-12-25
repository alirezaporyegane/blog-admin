import { useSearchParams } from 'react-router-dom'

type SearchQuery = {
  [key: string]: unknown
}

const useSetSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQuery = (query: SearchQuery) => {
    const map = new Map()
    if (query && Object.keys(query).length) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          searchParams.delete(key)
          map.set(key, value)
        } else if (value === '') map.delete(key)
        else if (value === false) {
          searchParams.delete(key)
          map.set(key, value)
        }
      })
    }

    for (const [key, value] of searchParams.entries()) {
      if (!!map.get(key) && map.get(key) !== '') map.set(key, value)
    }

    setSearchParams({ ...searchParams, ...Object.fromEntries(map.entries()) })
  }

  return [searchParams, setQuery] as const
}

export default useSetSearchQuery
