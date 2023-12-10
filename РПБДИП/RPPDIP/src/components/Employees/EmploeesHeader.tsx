import styled from "styled-components";

const LogListHeaderWrapper = styled.div`
    background-color: #40868c;
    display: flex;
    flex-direction: row;
    height: 40px;
`
const LogListHeaderPart = styled.div`
    border: 1px solid white;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const EmploeesHeader:React.FC = () => {
    return (
        <LogListHeaderWrapper>
            <LogListHeaderPart>id</LogListHeaderPart>
            <LogListHeaderPart>Имя Рабочего</LogListHeaderPart>
            <LogListHeaderPart>Роль</LogListHeaderPart>
            <LogListHeaderPart>Электронная почта</LogListHeaderPart>
            <LogListHeaderPart></LogListHeaderPart>
        </LogListHeaderWrapper>
    );
};

export default EmploeesHeader;