import React, { FunctionComponent, useState, useEffect } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";

import { Colors } from "../styles/colors";
import { TimeSlotTab } from "./Tabs/TimeSlotTab";
import { TabPanel } from "./Tabs/components/TabPanel";
import { PersonalDetailsTab } from "./Tabs/PersonalDetailsTab";
import { useIsMobile } from "../styles/media";

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

enum FIELD_ID {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  CONTACT_NUMBER = "contactNumber",
  SELECTED_DATE_TIME = "selectedDateTime",
}

type Form = {
  [FIELD_ID.FIRST_NAME]: string;
  [FIELD_ID.LAST_NAME]: string;
  [FIELD_ID.EMAIL]: string;
  [FIELD_ID.CONTACT_NUMBER]: string;
  [FIELD_ID.SELECTED_DATE_TIME]: DateTime;
};

export const FormTabs: FunctionComponent = () => {
  const { register, handleSubmit, watch, setValue } = useForm<Form>();
  const [tabValue, setTabValue] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();
  const { isMobile } = useIsMobile();

  useEffect(() => {
    register({ name: FIELD_ID.FIRST_NAME }, { required: true });
    register({ name: FIELD_ID.LAST_NAME }, { required: true });
    register({ name: FIELD_ID.EMAIL }, { required: true });
    register({ name: FIELD_ID.CONTACT_NUMBER }, { required: true });
    register({ name: FIELD_ID.SELECTED_DATE_TIME }, { required: true });
  }, [register]);

  const values = watch();
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  const onSubmit = (data: Form) => {
    setTabValue(2);
  };
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
        <Tab label={TAB_LABELS.USER_DETAILS} /> {/* TODO: add disabled prop */}
        <Tab label={TAB_LABELS.SELECT_PRACTITIONER} />
      </Tabs>
      <TabPanel
        buttonText="Next"
        onTabButtonClick={() => setTabValue(1)}
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
      >
        <PersonalDetailsTab />
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
