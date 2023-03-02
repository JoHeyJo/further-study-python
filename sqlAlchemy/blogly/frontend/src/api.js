import axios from 'axios';

const BASE_URL = "http://localhost:5000";

/**Returns first and last of all users */
async function getUsers() {
  const res = await axios.get(`${BASE_URL}/user` )
  return res.data
}

/**to add User */
async function addUser(data){
  const res = await axios.post(`${BASE_URL}/user`,data)
  return res
}

/**returns user with matching ID */
async function getUser(id){
  const res = await axios.get(`${BASE_URL}/user/${id}`)
  return res
}

/**Returns first and last of all users in object */


export { getUsers, addUser, getUsers };