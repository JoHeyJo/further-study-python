import axios from 'axios';
import { IUser } from './interface'

const BASE_URL = "http://localhost:5000";

/**Returns first and last of all users */
async function getUsers() {
  const res = await axios.get(`${BASE_URL}/`)
  return res.data
}

/**Routes new user data to /user */
async function addUser(data: IUser) {
  const res = await axios.post(`${BASE_URL}/user`, data)
  return res.data
}

/**returns user with matching ID */
async function getUser(id: number | undefined) {
  const res = await axios.get(`${BASE_URL}/user/${id}`)
  return res.data
}

/**Updates user information with matching id */
async function updateUser(id: number, data: IUser){
  const res = await axios.post(`${BASE_URL}/user/id`, data)
  return res.data;
}


export { getUser, getUsers, addUser };