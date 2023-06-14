import { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider'

const useAppContext = () => {
  const appContext = useContext(AppContext)

  if (!appContext) {
    throw new Error('Cannot use appContext outside of an AppContextProvider')
  }

  return appContext
}

export default useAppContext
