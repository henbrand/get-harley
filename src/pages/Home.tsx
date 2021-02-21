import { FunctionComponent, useCallback, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

import logo from "../logo.png";
import { Button } from "../components/atoms/Button";
import { Speciality } from "../apiClient/types";
import { DateTimeSlotPicker } from "../components/DateTimeSlotPicker";
import { useSpecialities } from "../hooks/useSpecialities";
import { useAvailableTimeslot } from "../hooks/useAvailableTimeslot";

const Logo = styled.img`
  height: 100%;
  width: 50%;
`;

export const Home: FunctionComponent = () => {
  const [chosenSpeciality, setChosenSpeciality] = useState<Speciality>();
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();
  const { specialities, error } = useSpecialities();
  const { sendSelectedTimeslot } = useAvailableTimeslot();
  const [practitioners, setPractitioners] = useState<Practitioner[]>();

  const handleConfirm = useCallback(async () => {
    const practitionerAvailabilty = await sendSelectedTimeslot({
      specialityId: chosenSpeciality?.specialityId,
      selectedDate: {
        date: selectedDateTime?.startOf("day"),
        dateTime: selectedDateTime,
        dateString: selectedDateTime?.toISODate(),
      },
    });

    setPractitioners(practitionerAvailabilty);
  }, [chosenSpeciality?.specialityId, sendSelectedTimeslot, selectedDateTime]);

  return (
    <div>
      <Logo src={logo} className="get-harley-logo" alt="logo" />
      <h1>Select a reason for booking:</h1>
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
      {error && <p>{error}</p>}
      {chosenSpeciality && (
        <DateTimeSlotPicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
        />
      )}
      {chosenSpeciality && selectedDateTime && (
        <Button buttonText="Confirm" onClick={handleConfirm} />
      )}
    </div>
  );
};
