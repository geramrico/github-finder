import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

const UserSearch = () => {
  const [text, setText] = useState('')

  const { users, searchUsers, clearUsers } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)
  //Sets state from the form text-value
  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Please enter something','error')
      // alert('Please enter something.')
    } else {
      // @todo - search users
      searchUsers(text)
      setText('')
    }
  }

  return (
    <div
      className='
      grid 
      grid-cols-1 
      xl:grid-cols-2 
      lg:grid-cols-3 
      md:grid-cols-2 
      mb-8 
      gap-8'
    >
      {/* L2 Div1 */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input type='text' className='w-full pr-40 bg-gray-200 input input-lg text-black' placeholder='Search' value={text} onChange={handleChange} />
              <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' type='submit'>
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* L2 Div1 - Renders if there are users only */}
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
