import axios from 'axios';

const BASE_URL = "http://localhost:5000";

/** API function to get all Users */
async function getUsers() {
  const res = await axios.get(`${BASE_URL}/user` )
  return res.data
}

/** API to add User */
async function addUser(data){
  const res = await axios.post(`${BASE_URL}/user`,data)
  return res
}

/** API returns user with matching ID */
async function getUser(id){
  const res = await axios.get(`${BASE_URL}/user/${id}`)
  return res
}

export { getUsers, addUser, getUser };