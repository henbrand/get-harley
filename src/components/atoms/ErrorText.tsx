import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";

export const ErrorText: FunctionComponent<{
  text: string;
}> = ({ text }) => (
  <Typography variant="h3" color="error">
    {text}
  </Typography>
);
