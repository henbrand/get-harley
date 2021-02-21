import { useCallback, useState } from "react";

import { callAvailablePractitioners } from "../apiClient/client";

export const useAvailableTimeslot = () => {
  const [error, setError] = useState<string>();
  const sendSelectedTimeslot = useCallback(async (data: any) => {
    try {
      const response = await callAvailablePractitioners(data);
      return response;
    } catch (error) {
      setError(error?.message);
    }
  }, []);

  return { sendSelectedTimeslot, error };
};
