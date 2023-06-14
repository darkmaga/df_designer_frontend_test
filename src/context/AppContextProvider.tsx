import { ReactNode, createContext, useState } from 'react'

type Context = {
  selectedGraph: number | string | null
  setSelectedGraph: (graph: number | string) => void
} | null

type Props = {
  children: ReactNode
}

export const AppContext = createContext<Context>(null)

const AppContextProvider = ({ children }: Props) => {
  const [selectedGraph, setSelectedGraph] = useState<number | string | null>(
    null
  )

  return (
    <AppContext.Provider value={{ selectedGraph, setSelectedGraph }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
