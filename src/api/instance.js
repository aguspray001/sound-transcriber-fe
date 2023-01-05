import axios from "axios";
import { API_PORT, API_URL } from "../constant/uri";


export const instance = axios.create({ baseURL: API_URL+":"+API_PORT })