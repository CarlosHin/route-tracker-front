import axios from 'axios';
import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import LoginButton from '../components/LoginButton';
import RouteInfo from '../components/RouteInfo';
import { UserContext } from '../components/UserContext';
import { config } from '../config'

interface Route {
  _id: string;
  name: string;
  description?: string;
  start_point?: string;
  end_point?: string;
  image?: string;
  starting_elevation?: number;
  high_point?: number;
  difficulty?: number;
  created_at: Date;
  _user_id: string;
  distance: number
  aprox_time?: number;
}

interface User {
  name: string;
}
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const { user, setUser } = useContext(UserContext);

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

  const getRoutes = async () => {
    const url = `${config.backendUrl}/private/routes`;
    const res = await axios.get(url, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${user.token}`, // agregar el token JWT en el encabezado "Authorization"
      }
    });
    setRoutes(res.data);
  }

  useEffect(() => {
    user.token && getRoutes();
    // eslint-disable-next-line
  }, [user.token])

  return (
    <div className='p-8'>
      {user?.username !== "" ?
        <LoginButton />
        :
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setUser({})}
        >
          Log Out
        </button>
      }
      <h1 className="text-2xl text-black-600">
        Users
      </h1>
      <ul>

        {users.map(user => {
          return <li key={user.name} className="">
            {user.name}
          </li>
        })}
        {routes.map(route => {
          return <RouteInfo key={route._id} route={route} />
        })}
      </ul>

    </div >
  )
}
