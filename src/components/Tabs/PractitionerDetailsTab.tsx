import { FunctionComponent } from "react";

import { Button } from "../atoms/Button";
import { Practitioner } from "../../apiClient/types";

// TODO: add other specialities - Also specialises in
export const PractitionerDetailsTab: FunctionComponent<{
  practitioners: Practitioner[] | undefined;
  setSelectedPractitioner: (practitioner: Practitioner) => void;
}> = ({ practitioners, setSelectedPractitioner }) => {
  return (
    <>
      {practitioners?.map((practitioner) => (
        <Button
          buttonText={`${practitioner.firstName} - ${practitioner.lastName}`}
          onClick={() => setSelectedPractitioner(practitioner)}
        />
      ))}
      {practitioners?.length === 0 && (
        <p>No practitioners available, please select another slot</p>
      )}
    </>
  );
};
