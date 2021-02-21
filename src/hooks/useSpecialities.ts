import { useEffect, useState } from "react";

import { getSpecialities } from "../apiClient/client";
import { Speciality } from "../apiClient/types";

export const useSpecialities = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>();

  const [error, setError] = useState();

  useEffect(() => {
    const retrieveSpecialities = async () => {
      try {
        const response = await getSpecialities();
        setSpecialities(response.data);
      } catch (error) {
        setError(error.message); // Add an error hook/toaster for all API errors - useHandleError
      }
    };

    retrieveSpecialities();
  }, []);

  return { specialities, error };
};
