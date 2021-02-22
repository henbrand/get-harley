import { FunctionComponent } from "react";
import { Modal as MUIModal, Backdrop, Fade } from "@material-ui/core";
import styled from "styled-components";
import { Form } from "../utils/formTypes";
import { DateTime } from "luxon";
import { Colors } from "../styles/colors";

const Modal = styled(MUIModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  background-color: ${Colors.lightPink};
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
`;

export const ConfirmModal: FunctionComponent<{
  details: Form;
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ details, open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ContentContainer>
          <h1>Thank you!</h1>
          <p>{`Your appointment is scheduled on ${details.selectedDateTime.toLocaleString(
            DateTime.DATETIME_SHORT
          )} with ${details.selectedPractitioner.firstName}`}</p>
        </ContentContainer>
      </Fade>
    </Modal>
  );
};
