import axios from 'axios';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { config } from '../config'

interface User {
  name: string;
}
export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const getUsers = async () => {
    const url = `${config.backendUrl}/public/users`;
    const res = await axios.get(url, {
      headers: {
        'content-type': 'application/json'
      }
    });
    setUsers(res.data);
  }
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className='p-8'>
      <h1 className="text-2xl text-black-600">
        Users
      </h1>
      <ul>

        {users.map(user => {
          return <li key={user.name} className="">
            {user.name}
          </li>
        })}
      </ul>

    </div>
  )
}
