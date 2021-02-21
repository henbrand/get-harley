import { FunctionComponent } from "react";

import { Specialities } from "./components/Specialities";
import { PersonalDetails } from "./components/PersonalDetails";
import { FIELD_ID, Form, SetValue } from "../../utils/formTypes";

interface Props {
  values: Form;
  setValue: SetValue;
}

export const PersonalDetailsTab: FunctionComponent<Props> = ({
  values,
  setValue,
}) => {
  return (
    <div>
      <Specialities
        value={values.speciality}
        setSpeciality={(value) => setValue(FIELD_ID.SPECIALITY, value)}
      />
      <PersonalDetails />
    </div>
  );
};
