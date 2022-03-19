const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      }
    default:
      return state // If no action, just return the current state
  }
}

export default githubReducer
