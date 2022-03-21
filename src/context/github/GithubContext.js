import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // DELETED TO NOW USE REDUCER
  // const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  const initialState = {
    users: [],
    user: {},
    isLoading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const URL = `${GITHUB_URL}`

  // Get initial users (Testing purposes - Not in use)
  const fetchUsers = async () => {
    setLoading() //Set loading to true

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
    // setUsers(data)  Originally from context
    // setIsLoading(false)
  }

  // Serach Users
  const searchUsers = async (query) => {
    setLoading()
    // Check URLSearchParams for the query value
    const params = new URLSearchParams({
      q: query,
    })

    const response = await fetch(`${URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Get a single User
  const getUser = async (login) => {
    setLoading()
    const response = await fetch(`${URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  //Sets loading to true
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users: state.users, // added the state.users part with the reducers
        isLoading: state.isLoading,
        user: state.user,
        // fetchUsers, No longer in use
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
