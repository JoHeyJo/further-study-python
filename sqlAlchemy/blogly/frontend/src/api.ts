import axios from 'axios';
import { IUser } from './interface'

const BASE_URL = "http://localhost:5000";
// try {
//   return (await axios({ url, method, data, params, headers })).data;
// } catch (err) {
//   console.error("API Error:", err.response);
//   let message = err.response.data.error.message;
//   throw Array.isArray(message) ? message : [message];
// }

/**Returns first and last of all users */
async function userGetAll() {
  try {
      const res = await axios.get(`${BASE_URL}/`);
      return res.data;
  } catch (error: any) {
    console.error("API Error:" + error.response);
  }
}

/**Routes new user data to /user */
async function userAdd(data: IUser) {
  try {
      const res = await axios.post(`${BASE_URL}/users`, data)
      return res.data
  } catch (error: any) {
    console.error("API Error:" + error.response);
  }
}

/**returns user with matching ID */
async function userGet(id: number | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`)
    return res.data

  } catch (error: any){
    console.error("API Error:" + error.message)
  }
}

/**Updates user information with matching id */
async function userUpdate(id: number, data: IUser) {
  try{
    const res = await axios.patch(`${BASE_URL}/users/${id}/edit`, data)
    return res.data;
  } catch(error: any){
    console.error("API Error:"+ error.message)
  }
}


export { userGet, userGetAll, userAdd, userUpdate };

