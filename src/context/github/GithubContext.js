import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // DELETED TO NOW USE REDUCER
  // const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  // GET USERS - NOW IN 'ACTIONS'
  // GET SINGLE USER - NOW IN 'ACTIONS'
  // GET USER REPOS - NOW IN 'ACTIONS'
 

  // const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  //Sets loading to true - UNUSED WHEN MOVED TO ACTIONS
  // const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        ...state, //spread operator to keep it clean and short
        // users: state.users, // added the state.users part with the reducers
        // isLoading: state.isLoading,
        // user: state.user,
        // repos: state.repos,
        // fetchUsers, No longer in use
        dispatch, // To dispatch from the component
        // searchUsers,
        // getUser,
        // getUserRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
