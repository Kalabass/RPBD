import styled from "styled-components";
import ModalProfile from "./ModalProfile";
import ModalRights from "./ModalRights";

const StyledModal = styled.div`
    position: absolute;
    background-color: rgb(42, 42, 42);
    width: 80%;
    margin-left: 5%;
    height: 70%;
    margin-top: 2%;
    border: 2px solid #40868c;
    border-radius: 7px;
    z-index: 999;
    display: flex;
    flex-direction: column;
`

const StyledModalUpperContainer = styled.div`
  border-bottom: 1px solid #40868c;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  height: 90%;
  display: flex;
  flex-direction: row;
`


const StyledModalLowerContainer = styled.div`
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-top: 1px solid #40868c;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButtonUpd = styled.button`
  background-color: #40868c;
  height: 90%;
  width: 20%;
  border-radius: 7px;
  font-size: 25px;
`

const ModalMask = styled.div`
    width: 1000%;
    height: 1000%;
    background-color: black;
    position: fixed;
    margin-top: -50%;
    margin-left: -50%;
    z-index: 997;
    opacity: 0.8;
`

interface IModalProps{
    onClick: () => void;
    isShow: boolean;
}

const Modal: React.FC<IModalProps> = ({ onClick, isShow}) => {
    return (
      <>
        {isShow && (
          <>
            <ModalMask onClick={onClick}/>
            <StyledModal>
                <StyledModalUpperContainer>
                  <ModalProfile/>
                  <ModalRights/>
                </StyledModalUpperContainer>
                <StyledModalLowerContainer>
                  <StyledButtonUpd>Обновить</StyledButtonUpd>
                </StyledModalLowerContainer>
            </StyledModal>
          </>
        )}
      </>
    );
  };

export default Modal;