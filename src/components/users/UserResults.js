import { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    // console.log('running....')
    const URL = `${process.env.REACT_APP_GITHUB_URL}/users`

    const response = await fetch(URL, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    setUsers(data)
    setIsLoading(false)
  }

  if (!isLoading) {
    return (
      <div
        className='grid 
          grid-cols-1 
          gap-8 
          xl:grid-cols-4 
          lg:grid-cols-3
          md:grid-cols-2'
      >
        {users.map((user) => (
          <UserItem key={user.id}  user={user}   />
          // <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
