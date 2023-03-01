import axios from 'axios';

const BASE_URL = "http://localhost:3000";

/** API function to get all Users */
async function getUser() {
  const res = await axios.get(`${BASE_URL}/user`)
  return res
}

export { getUser };