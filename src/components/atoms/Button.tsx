import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { Button as MUIButton } from "@material-ui/core/";

import { Colors } from "../../styles/colors";

interface Props {
  buttonText: string;
  onClick: () => void;
  selected?: boolean | undefined;
  square?: boolean;
}

const StyledButton = styled(MUIButton)<{
  square?: boolean;
  selected: boolean | undefined;
}>`
  && {
    background: ${Colors.lightPink};
    border: 1px solid ${Colors.secondary};
    width: 200px;
    height: 50px;
    margin: 5px;
    border-radius: 3px;
    color: ${Colors.secondary};
    ${(p) =>
      p.square &&
      css`
        border-radius: 10px;
        width: 120px;
        height: 120px;
      `};
    ${(p) =>
      p.selected &&
      css`
        background: ${Colors.primary};
        border: 2px solid ${Colors.primary};
        outline: none;
        color: ${Colors.grey};
      `};
  }
`;

export const Button: FunctionComponent<Props> = ({
  buttonText,
  onClick,
  selected,
  square,
}) => {
  return (
    <StyledButton
      color="secondary"
      square={square}
      selected={selected}
      onClick={onClick}
    >
      {buttonText}
    </StyledButton>
  );
};
