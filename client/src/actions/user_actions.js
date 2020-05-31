import axios from "axios";

import { LOGIN_USER, REGISTER_USER } from "./types";

export const loginUser = async (data) => {
  const request = await axios
    .post("/api/users/login", data)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = async (data) => {
  const request = await axios
    .post("/api/users/register", data)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};
