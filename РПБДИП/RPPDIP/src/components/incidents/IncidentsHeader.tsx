import styled from "styled-components";

const IncidentsHeaderWrapper = styled.div`
    background-color: #40868c;
    display: flex;
    flex-direction: row;
    height: 40px;
`
interface LogListHeaderPartProps{
    width: string;
}

const IncidentsrPart = styled.div<LogListHeaderPartProps>`
    border: 1px solid white;
    color: white;
    width: ${props => props.width};
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: 40px;
`


const IncidentstHeader:React.FC = () => {
    return (
        <IncidentsHeaderWrapper>
            <IncidentsrPart width="30%">id</IncidentsrPart>
            <IncidentsrPart width="30%">id Рабочего</IncidentsrPart>
            <IncidentsrPart width="30%">id комнаты</IncidentsrPart>
            <IncidentsrPart width="100%">Дата и время</IncidentsrPart>
            <IncidentsrPart width="100%">Инцидент решён</IncidentsrPart>
            <IncidentsrPart width="100%"></IncidentsrPart>
        </IncidentsHeaderWrapper>
    );
};

export default IncidentstHeader;