import { FunctionComponent, useEffect, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

import logo from "../logo.png";
import { Button } from "../components/atoms/Button";
import { getSpecialities } from "../apiClient/client";
import { Speciality } from "../apiClient/types";
import { DateTimeSlotPicker } from "../components/DateTimeSlotPicker";

const Logo = styled.img`
  height: 100%;
  width: 50%;
`;

export const Home: FunctionComponent = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>();
  const [chosenSpeciality, setChosenSpeciality] = useState<Speciality>();
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();

  const [error, setError] = useState();

  useEffect(() => {
    const retrieveSpecialities = async () => {
      try {
        const response = await getSpecialities();
        setSpecialities(response.data);
      } catch (error) {
        setError(error);
      }
    };

    retrieveSpecialities();
  }, []);
  return (
    <div>
      <Logo src={logo} className="get-harley-logo" alt="logo" />
      <h1>Select a reason for booking:</h1>
      {specialities?.map((speciality) => {
        return (
          <Button
            selected={
              chosenSpeciality?.specialityId === speciality.specialityId
            }
            buttonText={speciality.name}
            onClick={() => setChosenSpeciality(speciality)}
            square
          />
        );
      })}
      {chosenSpeciality && (
        <DateTimeSlotPicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
        />
      )}
      {chosenSpeciality && selectedDateTime && (
        <Button buttonText="Confirm" onClick={() => {}} />
      )}
    </div>
  );
};
