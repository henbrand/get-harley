import { FunctionComponent } from "react";
import styled from "styled-components";

import logo from "../logo.png";
import { FormTabs } from "../components/FormTabs";

const Logo = styled.img`
  margin: 10px;
  width: 35%;
`;

export const Home: FunctionComponent = () => {
  return (
    <div>
      <Logo src={logo} className="get-harley-logo" alt="logo" />
      <FormTabs />
    </div>
  );
};
