import styled from "styled-components";

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

const Modal: React.FC<IModalProps> = ({ onClick, isShow }) => {
    return (
      <>
        {isShow && (
          <>
            <ModalMask onClick={onClick}/>
            <StyledModal>
                
            </StyledModal>
          </>
        )}
      </>
    );
  };

export default Modal;