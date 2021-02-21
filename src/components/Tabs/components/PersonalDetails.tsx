import { FunctionComponent } from "react";
import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";

import { FIELD_ID, RHFRegister, RHFError } from "../../../utils/formTypes";

const Break = styled.div`
  height: 35px;
`;

const Input = styled(TextField)`
  && {
    margin: 0 15px;
  }
`;

interface Props {
  register: RHFRegister;
  errors: RHFError;
}

export const PersonalDetails: FunctionComponent<Props> = ({
  errors,
  register,
}) => {
  const errorMessages = {
    firstName: errors[FIELD_ID.FIRST_NAME]?.type,
    lastName: errors[FIELD_ID.LAST_NAME]?.type,
    email: errors[FIELD_ID.EMAIL]?.type,
    contactNumber: errors[FIELD_ID.CONTACT_NUMBER]?.type,
  };

  return (
    <>
      <Break />
      <Typography variant="h2">Enter your details</Typography>
      <div>
        <Input
          required
          label="First Name"
          color="secondary"
          inputRef={register({ required: true })}
          name={FIELD_ID.FIRST_NAME}
          error={!!errorMessages.email}
        />

        <Input
          required
          label="Last Name"
          color="secondary"
          inputRef={register({ required: true })}
          name={FIELD_ID.LAST_NAME}
          error={!!errorMessages.lastName}
        />
      </div>
      <div>
        <Input
          required
          label="Email"
          color="secondary"
          type="email"
          inputRef={register({ required: true })}
          name={FIELD_ID.EMAIL}
          error={!!errorMessages.email}
        />
        <Input
          required
          label="Contact number"
          color="secondary"
          type="number"
          inputRef={register({ required: true })}
          name={FIELD_ID.CONTACT_NUMBER}
          error={!!errorMessages.contactNumber}
        />
      </div>
    </>
  );
};
