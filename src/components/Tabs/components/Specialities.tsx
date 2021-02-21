import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";

import { Button } from "../../atoms/Button";
import { Speciality } from "../../../apiClient/types";
import { useSpecialities } from "../../../hooks/useSpecialities";

interface Props {
  value: Speciality | undefined;
  setSpeciality: (value: Speciality) => void;
}

export const Specialities: FunctionComponent<Props> = ({
  value,
  setSpeciality,
}) => {
  const { specialities } = useSpecialities();

  return (
    <>
      <Typography variant="h2">What is your main concern?</Typography>
      {specialities?.map((speciality) => {
        return (
          <Button
            key={speciality.specialityId}
            selected={value?.specialityId === speciality.specialityId}
            buttonText={speciality.name}
            onClick={() => setSpeciality(speciality)}
            square
          />
        );
      })}
    </>
  );
};
