import { FunctionComponent, useEffect, useState } from "react";

import { Button } from "../components/atoms/Button";
import { getSpecialities } from "../apiClient/client";
import { Speciality } from "../apiClient/types";
import { DateTimeSlotPicker } from "../components/DateTimeSlotPicker";

export const Home: FunctionComponent = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>();
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
      <h1>Get Harley</h1>
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
      <DateTimeSlotPicker />
    </div>
  );
};
