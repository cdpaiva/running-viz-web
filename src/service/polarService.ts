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

  return res.data;
}

async function createProfile(userId: string | undefined) {
  const res = await axios.post(
    BASE_URL + `/polar/profile`,
    { userId },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log("Register user service");
  console.log(res.data);
  return res.data;
}

async function syncAccount(userId: string | undefined) {
  const res = await axios.post(
    BASE_URL + `/polar/sync`,
    { userId },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log("Sync user service");
  console.log(res.data);
  return res.data;
}

export { getProfile, createProfile, syncAccount };
