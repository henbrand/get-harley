import { FunctionComponent, useState, useEffect, useCallback } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Colors } from "../styles/colors";
import { TimeSlotTab } from "./Tabs/TimeSlotTab";
import { TabPanel } from "./Tabs/components/TabPanel";
import { PersonalDetailsTab } from "./Tabs/PersonalDetailsTab";
import { PractitionerDetailsTab } from "./Tabs/PractitionerDetailsTab";
import { useIsMobile } from "../styles/media";
import { FIELD_ID, Form } from "../utils/formTypes";
import { useAvailableTimeslot } from "../hooks/useAvailableTimeslot";
import { Practitioner } from "../apiClient/types";
import { ConfirmModal } from "./ConfirmModal";

const TAB_LABELS = {
  TIME_SLOT: "Pick a time that works for you",
  USER_DETAILS: "Tell us about yourself",
  SELECT_PRACTITIONER: "Select your practitioner",
};

const TabContainer = styled.div`
  margin: 30px;
  background-color: ${Colors.lightPink};
  border-radius: 5px;
  padding: 5px;
  height: 35pc;
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
`;

export const FormTabs: FunctionComponent = () => {
  const { isMobile } = useIsMobile();
  const [tabValue, setTabValue] = useState(0);

  const { register, handleSubmit, watch, setValue, errors } = useForm<Form>();

  const [availablePractitioners, setPractitioners] = useState<Practitioner[]>();
  const { sendSelectedTimeslot } = useAvailableTimeslot();

  const [confirmedValues, setConfirmedValues] = useState<Form>();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register({ name: FIELD_ID.SELECTED_DATE_TIME }, { required: true });
    register({ name: FIELD_ID.SPECIALITY }, { required: true });
    register({ name: FIELD_ID.SELECTED_PRACTITIONER });
  }, [register]);

  const values = watch();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = useCallback(
    async (data: Form) => {
      setIsLoading(true);
      const practitionerAvailabilty = await sendSelectedTimeslot({
        specialityId: data[FIELD_ID.SPECIALITY].specialityId,
        selectedDate: {
          date: data[FIELD_ID.SELECTED_DATE_TIME]?.startOf("day"),
          dateTime: data[FIELD_ID.SELECTED_DATE_TIME],
          dateString: data[FIELD_ID.SELECTED_DATE_TIME]?.toISODate(),
        },
      });

      setPractitioners(practitionerAvailabilty);
      setIsLoading(false);
      setTabValue(2);
    },
    [sendSelectedTimeslot]
  );

  // TODO: Create an endpoint to send this data to
  const onConfirmSubmit = useCallback(async (data: Form) => {
    setConfirmedValues(data);
    setOpen(true);
  }, []);

  return (
    <TabContainer>
      <Tabs
        value={tabValue}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="on"
      >
        <Tab label={TAB_LABELS.TIME_SLOT} />
        <Tab
          label={TAB_LABELS.USER_DETAILS}
          disabled={!values[FIELD_ID.SELECTED_DATE_TIME]}
        />
        <Tab label={TAB_LABELS.SELECT_PRACTITIONER} disabled={tabValue !== 2} />
      </Tabs>
      <TabPanel
        buttonText="Next"
        onTabButtonClick={() => setTabValue(1)}
        showButton={!!values[FIELD_ID.SELECTED_DATE_TIME]}
        value={tabValue}
        index={0}
        title="Select a time slot"
      >
        <TimeSlotTab
          selectedDateTime={values[FIELD_ID.SELECTED_DATE_TIME]}
          setSelectedDateTime={(value) =>
            setValue(FIELD_ID.SELECTED_DATE_TIME, value)
          }
        />
      </TabPanel>
      <TabPanel
        buttonText="Next"
        onTabButtonClick={handleSubmit(onSubmit)}
        value={tabValue}
        index={1}
        title="Tell us about yourself"
        showButton={!isLoading}
      >
        <PersonalDetailsTab
          values={values}
          setValue={setValue}
          errors={errors}
          register={register}
        />
      </TabPanel>
      <TabPanel
        buttonText="Confirm"
        onTabButtonClick={handleSubmit(onConfirmSubmit)}
        value={tabValue}
        index={2}
        title="Select your practitioner"
        showButton
      >
        <PractitionerDetailsTab
          selectedPractitioner={values[FIELD_ID.SELECTED_PRACTITIONER]}
          practitioners={availablePractitioners}
          setSelectedPractitioner={(value) =>
            setValue(FIELD_ID.SELECTED_PRACTITIONER, value)
          }
        />
      </TabPanel>
      {confirmedValues && (
        <ConfirmModal details={confirmedValues} open={open} setOpen={setOpen} />
      )}
    </TabContainer>
  );
};
