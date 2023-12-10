import styled from "styled-components";
import { IUser } from "../../../interfaces/app.interfaces";
import { useCurrentUserStore } from "../../../stores/CurrentUserStore";
import { useCurrentRoomStore } from "../../../stores/current.room.store";

interface IEmployeeWrapperProps {
    bgColor: string
}

interface IUserComponentProps extends IUser{
    bgColor: string
}

const EmployeeWrapper = styled.div<IEmployeeWrapperProps>`
    background-color: ${props => props.bgColor};
    border-radius: 8px;
    padding-inline: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 97%;    
    margin-bottom: 5px;
    cursor: pointer;
`

interface IEmployeePartProps {
    width: string;
}

const EmployeePart = styled.div<IEmployeePartProps>`
    width: ${props => props.width};
    align-items: center;
    text-align: center;
`;

const Employee:React.FC<IUserComponentProps> = ({id, is_active, name, role_name, role_id, bgColor}) => {

    const {userChange} = useCurrentUserStore();
    const {currentRoom} = useCurrentRoomStore();

    const OnClickHandler = () => {
        if(currentRoom?.id != undefined){
            alert('сначала выйдите из комнаты!')
            return;
        }
        
        userChange({id, is_active, name, role_name, role_id})
    }

    return (
        <EmployeeWrapper bgColor={bgColor} onClick={OnClickHandler}>
            <EmployeePart width="30px" >{id}</EmployeePart>
            <a>|</a>
            <EmployeePart width = "150px">{name} </EmployeePart>
            <a>|</a>
            <EmployeePart width = "150px">{role_name} </EmployeePart>
        </EmployeeWrapper>
    );
};

export default Employee;