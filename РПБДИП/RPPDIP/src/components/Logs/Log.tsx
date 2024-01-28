import styled from "styled-components";
import { ILogComponent } from "../../interfaces/app.interfaces";
import moment from "moment-timezone";

const LogWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

interface ILogPartProps{
    width: string;
}

const LogPart = styled.div<ILogPartProps>`
    border: 1px solid #40868c;
    color: white;
    width: ${props => props.width};
    display: flex;
    align-items: center; 
    justify-content: center; 
    padding: 3px;
`

const Log:React.FC<ILogComponent> = ({id, user_id, room_id, exit_time, enter_time, room_name, user_name}) => {

    return (
        <LogWrapper>
            <LogPart width="30%">{id}</LogPart>
            <LogPart width="30%">{user_id}</LogPart>
            <LogPart width="100%">{user_name}</LogPart>
            <LogPart width="30%">{room_id}</LogPart>
            <LogPart width="100%">{room_name}</LogPart>
            <LogPart width="100%">{moment(enter_time).tz('Russia/Moscow').toLocaleString()}</LogPart>
            <LogPart width="100%">{moment(exit_time).tz('Russia/Moscow').toLocaleString()}</LogPart>
        </LogWrapper>
    );
};

export default Log;