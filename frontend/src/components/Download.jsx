import React, {useState, useEffect} from 'react'
import useLogout from '../hooks/useLogout'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Download = () => {
  const [user, setUser] = useState()
  const logout = useLogout()
  const navigate = useNavigate()
  const axiosPrivateInstance = useAxiosPrivate()
  async function onLogout() {
    await logout()
    // navigate('/')
  }

  useEffect(() => {
    async function getUser() {
        const { data } = await axiosPrivateInstance.get('user/')
        console.log(data.username)
        setUser(data)
    }

    getUser()
}, [])

  return (
    <div>
      Download App
      <h3>User{user?.username}</h3>
      <h4>{user?.email}</h4>
      <button  type='button' onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Download
