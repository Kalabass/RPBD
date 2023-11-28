import styled from "styled-components";

const LogListHeaderWrapper = styled.div`
    background-color: #40868c;
    display: flex;
    flex-direction: row;
`
const LogListHeaderPart = styled.div`
    border: 1px solid white;
    color: white;
    width: 100%;
    justify-content: center;
    text-align: center;
`

const EmploeesHeader:React.FC = () => {
    return (
        <LogListHeaderWrapper>
            <LogListHeaderPart>id</LogListHeaderPart>
            <LogListHeaderPart>Имя Рабочего</LogListHeaderPart>
            <LogListHeaderPart>Должность</LogListHeaderPart>
            <LogListHeaderPart>???</LogListHeaderPart>
            <LogListHeaderPart></LogListHeaderPart>
        </LogListHeaderWrapper>
    );
};

export default EmploeesHeader;