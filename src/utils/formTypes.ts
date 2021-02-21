import { DateTime } from "luxon";
import { Speciality } from "../apiClient/types";

export enum FIELD_ID {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  CONTACT_NUMBER = "contactNumber",
  SELECTED_DATE_TIME = "selectedDateTime",
  SPECIALITY = "speciality",
}

export type Form = {
  [FIELD_ID.FIRST_NAME]: string;
  [FIELD_ID.LAST_NAME]: string;
  [FIELD_ID.EMAIL]: string;
  [FIELD_ID.CONTACT_NUMBER]: string;
  [FIELD_ID.SELECTED_DATE_TIME]: DateTime;
  [FIELD_ID.SPECIALITY]: Speciality;
};

export type SetValue = (
  name: string,
  value: unknown,
  config?:
    | Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
      }>
    | undefined
) => void;
