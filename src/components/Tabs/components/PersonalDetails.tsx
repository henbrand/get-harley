import { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";
import { Typography, TextField } from "@material-ui/core";
import { FIELD_ID, Form, SetValue } from "../../../utils/formTypes";

const Break = styled.div`
  height: 35px;
`;

const Input = styled(TextField)`
  && {
    margin: 0 15px;
  }
`;

interface Props {
  values: Form;
  setValue: SetValue;
}

export const PersonalDetails: FunctionComponent<Props> = ({
  values,
  setValue,
}) => {
  return (
    <>
      <Break />
      <Typography variant="h2">Enter your details</Typography>
      <div>
        <Input
          required
          label="First Name"
          color="secondary"
          value={values.firstName}
          onChange={(event: ChangeEvent<{ value: string }>) =>
            setValue(FIELD_ID.FIRST_NAME, event.target.value)
          }
        />
        <Input
          required
          label="Last Name"
          color="secondary"
          value={values.lastName}
          onChange={(event: ChangeEvent<{ value: string }>) =>
            setValue(FIELD_ID.LAST_NAME, event.target.value)
          }
        />
      </div>
      <div>
        <Input
          required
          label="Email"
          color="secondary"
          type="email"
          value={values.email}
          onChange={(event: ChangeEvent<{ value: string }>) =>
            setValue(FIELD_ID.EMAIL, event.target.value)
          }
        />
        <Input
          required
          label="Contact number"
          color="secondary"
          type="number"
          value={values.contactNumber}
          onChange={(event: ChangeEvent<{ value: string }>) =>
            setValue(FIELD_ID.CONTACT_NUMBER, event.target.value)
          }
        />
      </div>
    </>
  );
};
