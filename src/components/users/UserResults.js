import { useState, useEffect } from 'react'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [isloading, setIsLoading] = useState(true)

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
    setLoading(false)
  }

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
        <h3>{user.login}</h3>
      ))}
    </div>
  )
}

export default UserResults