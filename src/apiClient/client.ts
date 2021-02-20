import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Speciality, Practitioner } from "./types";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
});

const ENDPOINTS = {
  SPECIALITIES: "specialities",
  AVAILABLE_TIMESLOTS: "available-timeslot",
};

export const getSpecialities = (): Promise<AxiosResponse<Speciality[]>> =>
  apiClient.get(ENDPOINTS.SPECIALITIES);

export const postAvailableTimeSlot = (): Promise<
  AxiosResponse<Practitioner[]>
> => apiClient.post(ENDPOINTS.AVAILABLE_TIMESLOTS);
