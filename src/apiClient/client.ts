import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Speciality } from "./types";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
});

const ENDPOINTS = { SPECIALITIES: "specialities" };

export const getSpecialities = (): Promise<AxiosResponse<Speciality[]>> =>
  apiClient.get(ENDPOINTS.SPECIALITIES);
