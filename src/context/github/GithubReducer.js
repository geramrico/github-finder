const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state, //Bring the current state, and change the following:
        users: action.payload,
        isLoading: false,
      }
    case 'GET_USER':
      return {
        ...state, //Bring the current state, and change the following:
        user: action.payload,
        isLoading: false,
      }
    case 'GET_REPOS':
      return {
        ...state, //Bring the current state, and change the following:
        repos: action.payload,
        isLoading: false,
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        // isLoading: false,
      }
    default:
      return state // If no action, just return the current state
  }
}

export default githubReducer
