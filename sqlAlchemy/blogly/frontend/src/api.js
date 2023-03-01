import axios from 'axios';

const BASE_URL = "http://localhost:5000";

/** API function to get all Users */
async function getUser() {
  const res = await axios.get(`${BASE_URL}/user` )
  return res.data
}

/** API to add User */
async function addUser(data){
  const res = await axios.post(`${BASE_URL}/user`,data)
  return res
}

export { getUser, addUser };