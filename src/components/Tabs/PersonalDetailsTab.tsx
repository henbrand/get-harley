import { FunctionComponent } from "react";

import { Specialities } from "./components/Specialities";
import { PersonalDetails } from "./components/PersonalDetails";
import {
  FIELD_ID,
  Form,
  RHFSetValue,
  RHFRegister,
  RHFError,
} from "../../utils/formTypes";

interface Props {
  values: Form;
  setValue: RHFSetValue;
  register: RHFRegister;
  errors: RHFError;
}

export const PersonalDetailsTab: FunctionComponent<Props> = ({
  values,
  setValue,
  register,
  errors,
}) => {
  return (
    <div>
      <Specialities
        value={values.speciality}
        setSpeciality={(value) => setValue(FIELD_ID.SPECIALITY, value)}
        error={!!errors[FIELD_ID.SPECIALITY]}
      />
      <PersonalDetails register={register} errors={errors} />
    </div>
  );
};
