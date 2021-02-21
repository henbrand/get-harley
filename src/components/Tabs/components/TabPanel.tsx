import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "../../atoms/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title: string;
  onTabButtonClick: () => void;
  buttonText: string;
}

const TabPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
  height: 100%;
`;

const Title = styled(Typography)`
  && {
    margin: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 15px;
  justify-content: flex-end;
`;

export const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index, title, buttonText, onTabButtonClick } = props;

  return (
    <>
      {value === index && (
        <>
          <Title variant="h1">{title}</Title>
          <TabPanelContainer role="tabpanel" hidden={value !== index}>
            {children}
            <ButtonContainer>
              <Button buttonText={buttonText} onClick={onTabButtonClick} />
              {/* add disabled prop */}
            </ButtonContainer>
          </TabPanelContainer>
        </>
      )}
    </>
  );
};
