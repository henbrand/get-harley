import { FunctionComponent, useEffect, useState } from "react";

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
      {specialities?.map((speciality) => (
        <div key={speciality.specialityId}>
          <button>{speciality.name}</button>
        </div>
      ))}
      <DateTimeSlotPicker />
    </div>
  );
};
