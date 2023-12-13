import { ReactNode, createContext, useState } from 'react'

interface IHeaderName {
  name: string
  setName: (name: string) => void
  getName: () => string
}

export const HeaderNameContext = createContext({
  name: '',
  setName: () => {},
  getName: () => ''
} as IHeaderName)

interface IHeaderNameProvider {
  children: ReactNode
}

export function HeaderNameProvider({ children }: IHeaderNameProvider) {
  const [name, setNameState] = useState<string>('')

  const setName = (name: string) => setNameState(name)

  const getName = () => name

  const ContextValue: IHeaderName = {
    name,
    setName,
    getName
  }

  return (
    <HeaderNameContext.Provider value={ContextValue}>
      {children}
    </HeaderNameContext.Provider>
  )
}
