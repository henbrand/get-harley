import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { DateTime } from "luxon";

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

export const FormTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();
  const { isMobile } = useIsMobile();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <TabContainer>
      <Tabs
        value={tabValue}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleTabChange}
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
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
        />
      </TabPanel>
      <TabPanel
        buttonText="Next"
        onTabButtonClick={() => setTabValue(2)}
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
