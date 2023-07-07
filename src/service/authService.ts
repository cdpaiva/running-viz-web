import axios from "axios";
import { config } from "../config";

const BASE_URL = config.baseURL;
const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";

type LoginResponse = {
  user: {
    name: string;
    userId: string;
  };
  token: string;
};

export async function login(email: string, password: string) {
  return axios.post<LoginResponse>(
    BASE_URL + LOGIN_URL,
    JSON.stringify({ email, password }),
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}

export async function register(name: string, email: string, password: string) {
  return axios.post<LoginResponse>(
    BASE_URL + REGISTER_URL,
    JSON.stringify({ name, email, password }),
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}
