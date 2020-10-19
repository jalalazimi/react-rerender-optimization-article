import React from 'react'
import clsx from 'clsx'
import getUsers from '../services/users'

export default function UsersList () {
  console.count('RENDER')
  const [users, setUsers] = React.useState([])
  const [likedUsers, like] = React.useState(new Map())
  const [count, countUp] = React.useReducer((prev) => prev + 1, 0)

  const fetch = async () => {
    const res = await getUsers()
    setUsers(res)
  }

  const onLike = (user) => {
    like(prev => {
      if (likedUsers.has(user.id)) {
        const _state = new Map([...prev])
        _state.delete(user.id)
        return new Map(_state)
      }
      return new Map([...prev, [user.id, user.login]])
    })
  }

  React.useEffect(() => {
    fetch()
  }, [])

  const showStats = () => alert(`👀 You have visited ${count} profile(s) and liked ${likedUsers.size} profile(s)`)

  console.log('likedUsers', likedUsers)
  return (
    <>
      <header className="px-6 py-3  sticky top-0 bg-white shadow flex justify-between">
        <h1 className="text-4xl font-bold ">
          Github Users
        </h1>
        <button
          className="text-base px-6 bg-gray-100 rounded-full font-semibold"
          onClick={() => showStats()}>
          Stats
        </button>
      </header>
      {users.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-3 my-6 mx-2">
          {users.map((user, id) => (
            <div className="p-1" key={id}>
              <div
                className={clsx('bg-white px-6 py-8 rounded-md text-center hover:shadow-xl transition duration-150 ease-in-out', {
                  'shadow-lg': likedUsers.has(user.id),
                  'shadow': !likedUsers.has(user.id),
                })}>
                <div className="mb-3">
                  <img
                    className="w-32 h-32 mx-auto rounded-full"
                    src={user.avatar_url}
                    alt={user.login}
                  />
                </div>
                <h2 className="text-xl font-semibold capitalize text-gray-700 my-3">
                  {user.login}
                </h2>
                <div className="flex row no-wrap justify-center">
                  <a
                    rel="noopener noreferrer"
                    onClick={() => countUp()}
                    href={user.html_url}
                    target="_blank"
                    className="px-4 py-2 bg-blue-500 text-white rounded-full uppercase"
                  >
                    Profile
                  </a>
                  <button
                    type="button"
                    onClick={() => onLike(user)}
                    className={clsx('w-8 h-8 mx-2 rounded-full uppercase', {
                      'text-red-600 font-bold': likedUsers.has(user.id),
                      'text-gray-300 hover:bg-gray-100': !likedUsers.has(user.id)
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current inline" height="24"
                         viewBox="0 0 24 24" width="24">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="py-32 text-center text-xl font-bold">Loading...</h1>
      )}
    </>
  )
}

