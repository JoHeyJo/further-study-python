import axios from 'axios';

const BASE_URL = "http://localhost:3000";
const token = null;
const headers = { Authorization: `Bearer ${token}` };
/** API function to get all Users */
async function getUser() {
  const res = await axios.get(`http://localhost:5000/user`, headers )
  return res
}

export { getUser };