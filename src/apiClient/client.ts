import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Speciality, Practitioner, ChosenData } from "./types";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
});

const ENDPOINTS = {
  SPECIALITIES: "specialities",
  AVAILABLE_TIMESLOTS: "available-practitioner",
};

export const getSpecialities = (): Promise<AxiosResponse<Speciality[]>> =>
  apiClient.get(ENDPOINTS.SPECIALITIES);

export const callAvailablePractitioners = (
  data: ChosenData
): Promise<AxiosResponse<Practitioner[]>> =>
  apiClient.post(ENDPOINTS.AVAILABLE_TIMESLOTS, data);
