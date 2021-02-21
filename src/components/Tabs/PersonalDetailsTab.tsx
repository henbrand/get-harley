import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { Specialities } from "./components/Specialities";
import { PersonalDetails } from "./components/PersonalDetails";

export const PersonalDetailsTab: FunctionComponent<{}> = () => {
  return (
    <div>
      <Specialities />
      <PersonalDetails />
    </div>
  );
};
