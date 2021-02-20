import { FunctionComponent, useEffect, useState } from "react";
import { getSpecialities } from "../apiClient/client";
import { Speciality } from "../apiClient/types";

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
      <h1>Select a reason for booking:</h1>
      {specialities?.map((speciality) => (
        <button>{speciality.name}</button>
      ))}
    </div>
  );
};
