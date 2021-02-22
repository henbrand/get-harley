import { FunctionComponent } from "react";

import { Button } from "../atoms/Button";
import { Practitioner } from "../../apiClient/types";

// TODO: add other specialities - Also specialises in
export const PractitionerDetailsTab: FunctionComponent<{
  selectedPractitioner: Practitioner | undefined;
  practitioners: Practitioner[] | undefined;
  setSelectedPractitioner: (practitioner: Practitioner) => void;
}> = ({ selectedPractitioner, practitioners, setSelectedPractitioner }) => {
  return (
    <div>
      {practitioners?.length === 0 ? (
        <p>No practitioners available, please select another slot</p>
      ) : (
        practitioners?.map((practitioner) => (
          <Button
            key={practitioner.practitionerId}
            buttonText={`${practitioner.firstName} - ${practitioner.lastName}`}
            onClick={() => setSelectedPractitioner(practitioner)}
            selected={
              practitioner.practitionerId ===
              selectedPractitioner?.practitionerId
            }
          />
        ))
      )}
    </div>
  );
};
