import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuthUser } from "../../hooks/useAuthorizedUser"

const StyledHeaderUpper = styled.div`
    text-align: center;
    font-size: 40px;
    height: 20%;
    cursor: pointer;
`

const StyledHeaderLower = styled.div`
    text-align: center;
    font-size: 20px;
    height: 20%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`

const StyledHeader = styled.div`
    background-color: black;
    color: white;
`

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border: 0px;
    cursor: pointer;
`

const StyledExitButton = styled.button`
    position: absolute;
    margin-left: 95%;
    margin-top: 20px;
    font-size: 20px;
    background-color: black;
    border: none;
    color: white;
    cursor: pointer;
`

const Header:React.FC = () => {
    const navigate = useNavigate();

    const {data} = useAuthUser();

    return (
        <StyledHeader>
            <StyledExitButton onClick={() => navigate('/auth')}>выйти</StyledExitButton>
            <StyledHeaderUpper onClick={() => navigate('/main')}>
                <div>ZAVOD</div>
            </StyledHeaderUpper>

            {data?.role_id == 1 && <StyledHeaderLower>
                <StyledButton onClick={() => navigate('/main')}>главная</StyledButton>
                <a>|</a>
                <StyledButton onClick={() => navigate('/logs')}> логи</StyledButton>
                <a>|</a>
                <StyledButton onClick={() => navigate('/incidents')}>инциденты</StyledButton>
                <a>|</a>
                <StyledButton  onClick={() => navigate('/users')}>рабочие</StyledButton>
                <a>|</a>
                <StyledButton  onClick={() => navigate('/requests')}> Запросы</StyledButton>
            </StyledHeaderLower>}
        </StyledHeader>
    );
};

export default Header;