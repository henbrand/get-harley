import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

import { Button } from "../../atoms/Button";
import { Speciality } from "../../../apiClient/types";
import { useSpecialities } from "../../../hooks/useSpecialities";

export const Specialities: FunctionComponent = () => {
  const [chosenSpeciality, setChosenSpeciality] = useState<Speciality>();
  const { specialities } = useSpecialities();

  return (
    <>
      <Typography variant="h2">What is your main concern?</Typography>
      {specialities?.map((speciality) => {
        return (
          <Button
            key={speciality.specialityId}
            selected={
              chosenSpeciality?.specialityId === speciality.specialityId
            }
            buttonText={speciality.name}
            onClick={() => setChosenSpeciality(speciality)}
            square
          />
        );
      })}
    </>
  );
};
