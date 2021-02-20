import { FunctionComponent } from "react";
import styled, { css } from "styled-components";

import { Colors } from "../../styles/colors";

interface Props {
  buttonText: string;
  onClick: () => void;
  selected?: boolean | undefined;
  square?: boolean;
}

const StyledButton = styled.button<{
  square?: boolean;
  selected: boolean | undefined;
}>`
  background: ${Colors.primary};
  border: 1px solid ${Colors.primary};
  width: 100px;
  height: 50px;
  margin: 5px;
  border-radius: 3px;
  ${(p) =>
    p.square &&
    css`
      border-radius: 10px;
      height: 100px;
    `};
  ${(p) =>
    p.selected &&
    css`
      background: ${Colors.lightPink};
      border: 2px solid ${Colors.primary};
      outline: none;
    `};
`;

export const Button: FunctionComponent<Props> = ({
  buttonText,
  onClick,
  selected,
  square,
}) => {
  console.log(selected);
  return (
    <StyledButton square={square} selected={selected} onClick={onClick}>
      {buttonText}
    </StyledButton>
  );
};
