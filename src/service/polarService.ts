import axios from "axios";
import { config } from "../config";

const BASE_URL = config.baseURL;
const token = localStorage.token;

async function getProfile(id: string | undefined) {
  const res = await axios.get(BASE_URL + `/polar/profile`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: id,
    },
  });

  console.log("Inside get profile");
  console.log(res.data);

  return res.data;
}

export { getProfile };
