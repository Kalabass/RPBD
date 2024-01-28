import styled from "styled-components";

const LogListHeaderWrapper = styled.div`
    background-color: #40868c;
    display: flex;
    flex-direction: row;
    height: 40px;
`
interface LogListHeaderPartProps{
    width: string;
}

const LogListHeaderPart = styled.div<LogListHeaderPartProps>`
    border: 1px solid white;
    color: white;
    width: ${props => props.width};
    display: flex;
    align-items: center; 
    justify-content: center; 
    padding: 3px;
    color: black;
`


const LogListHeader:React.FC = () => {
    return (
        <LogListHeaderWrapper>
            <LogListHeaderPart width="30%">id</LogListHeaderPart>
            <LogListHeaderPart width="30%">id Рабочего</LogListHeaderPart>
            <LogListHeaderPart width="100%">Имя Рабочего</LogListHeaderPart>
            <LogListHeaderPart width="30%">id Комнаты</LogListHeaderPart>
            <LogListHeaderPart width="100%">Название помещения</LogListHeaderPart>
            <LogListHeaderPart width="100%">Дата и время входа</LogListHeaderPart>
            <LogListHeaderPart width="100%">Дата и время выхода</LogListHeaderPart>
        </LogListHeaderWrapper>
    );
};

export default LogListHeader;