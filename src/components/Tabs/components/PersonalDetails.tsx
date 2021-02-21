import { FunctionComponent } from "react";
import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";

const Break = styled.div`
  height: 35px;
`;

const Input = styled(TextField)`
  && {
    margin: 0 15px;
  }
`;

export const PersonalDetails: FunctionComponent = () => {
  return (
    <>
      <Break />
      <Typography variant="h2">Enter your details</Typography>
      <div>
        <Input required label="First Name" color="secondary" />
        <Input required label="Last Name" color="secondary" />
      </div>
      <div>
        <Input required label="Email" color="secondary" type="email" />
        <Input
          required
          label="Contact number"
          color="secondary"
          type="number"
        />
      </div>
    </>
  );
};
