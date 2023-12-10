import styled from "styled-components";
import { IAccess } from "../../interfaces/app.interfaces";

interface IModalRightsListWrapperProps{
    height: string;
    color: string;
    bgcolor: string; 
}

const ModalRightsListWrapper = styled.div<IModalRightsListWrapperProps>`
    background-color: ${props => props.bgcolor};
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-left: 5%;
    height:  ${props => props.height};
    color:  ${props => props.color};
`

interface IModalRightsPartProps{
    borderline?:string
}

const ModalRightsPart = styled.div<IModalRightsPartProps>`
    border: 1px solid ${(props) => (props.borderline ? props.borderline : 'white')};
    background-color: #40868c;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: white;
    border: 1px solid white;
`

const AcessRequestHeader:React.FC<IAccess> = () => {
    return (
    <ModalRightsListWrapper bgcolor="" color="black" height="70px">
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            id Пользователя
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            Название комнаты
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            Тип доступа
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            С
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
            По
        </ModalRightsPart>
        <ModalRightsPart borderline="rgb(42, 42, 42)">
           
        </ModalRightsPart>
    </ModalRightsListWrapper> 
    );
};

export default AcessRequestHeader;