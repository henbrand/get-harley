import React, { FunctionComponent, useState, useEffect } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Colors } from "../styles/colors";
import { TimeSlotTab } from "./Tabs/TimeSlotTab";
import { TabPanel } from "./Tabs/components/TabPanel";
import { PersonalDetailsTab } from "./Tabs/PersonalDetailsTab";
import { useIsMobile } from "../styles/media";
import { FIELD_ID, Form } from "../utils/formTypes";

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
  const { register, handleSubmit, watch, setValue, errors } = useForm<Form>();
  const [tabValue, setTabValue] = useState(0);
  const [availablePractitioners, setPractitioners] = useState<Practitioner[]>();
  const { isMobile } = useIsMobile();
  const { sendSelectedTimeslot } = useAvailableTimeslot();

  useEffect(() => {
    register({ name: FIELD_ID.SELECTED_DATE_TIME }, { required: true });
    register({ name: FIELD_ID.SPECIALITY }, { required: true });
  }, [register]);

  const values = watch();
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = useCallback(
    async (data: Form) => {
      const practitionerAvailabilty = await sendSelectedTimeslot({
        specialityId: data[FIELD_ID.SPECIALITY].specialityId,
        selectedDate: {
          date: data[FIELD_ID.SELECTED_DATE_TIME]?.startOf("day"),
          dateTime: data[FIELD_ID.SELECTED_DATE_TIME],
          dateString: data[FIELD_ID.SELECTED_DATE_TIME]?.toISODate(),
        },
      });

      setPractitioners(practitionerAvailabilty);
      setTabValue(2);
    },
    [sendSelectedTimeslot]
  );
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
        showButton
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
        onTabButtonClick={() => {}} //TODO: confirm practitioner
        value={tabValue}
        index={2}
        title="Select your practitioner"
      >
        Item Three
        {/* TODO: <PractitionerDetailsTab /> */}
      </TabPanel>
    </TabContainer>
  );
};
