import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// Search Users
export const searchUsers = async (query) => {
  // setLoading()   GONNA CALL IT FROM THE COMPONENT
  // Check URLSearchParams for the query value
  const params = new URLSearchParams({
    q: query,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items

  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //   headers: {
  //     Authorization: `token ${GITHUB_TOKEN}`,
  //   },
  // })
  // const { items } = await response.json()

  // CHANGE DISPATCH FROM THE COMPONENT
  // dispatch({
  //   type: 'GET_USERS',
  //   payload: items,
  // })
  // return items
}


// Get user and repos
// MULTIPLE FETCH WITH Promise.all([array of requests])
// NICE TO HAVE

// export const getUserAndRepos = async (login) => {
//   const [user, repos] = await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos`)])

//   return { user: user.data, repos: repos.data }
// }


// Get a single User
export const getUser = async (login) => {
  // setLoading()
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  if (response.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await response.json()
    return data
    // dispatch({
    //   type: 'GET_USER',
    //   payload: data,
    // })
  }
}

// //Get user's repo
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  if (response.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await response.json()
    return data
  }
}

