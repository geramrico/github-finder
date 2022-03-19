import { createContext, useReducer } from 'react'
import githubReducer from '../GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // DELETED TO NOW USE REDUCER
  // const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  const initialState = {
    users: [],
    isLoading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    const URL = `${GITHUB_URL}/users`

    const response = await fetch(URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    //added with the reducer
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
    // setUsers(data)
    // setIsLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users, // added the state.users part with the reducers
        isLoading: state.isLoading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
