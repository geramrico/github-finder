import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        ...state, //spread operator to keep it clean and short
        dispatch, // To dispatch from the component
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
