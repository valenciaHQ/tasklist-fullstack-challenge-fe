import axios from "axios";
import { TaskformInputs } from "../types";

export const getTasks = async () => {
  return await axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/tasklist`)
    .then((res) => res.data);
};

export const deleteTask = async (id: number) => {
  return await axios
    .delete(`${process.env.REACT_APP_BASE_API_URL}/tasklist/${id}`)
    .then((res) => res.data);
};

export const editTask = async (id: number, data: TaskformInputs) => {
  return await axios
    .put(`${process.env.REACT_APP_BASE_API_URL}/tasklist/${id}`, data)
    .then((res) => res.data);
};
export const addTask = async (data: TaskformInputs) => {
  return await axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/tasklist`, data)
    .then((res) => res.data);
};
