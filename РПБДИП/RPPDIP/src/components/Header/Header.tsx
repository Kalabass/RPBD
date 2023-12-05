import { useNavigate } from "react-router-dom"
import styled from "styled-components"

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

const Header:React.FC = () => {
    const navigate = useNavigate();
    return (
        <StyledHeader>
            <StyledHeaderUpper onClick={() => navigate('/main')}>
                <div>ZAVOD</div>
            </StyledHeaderUpper>
            <StyledHeaderLower>
                <StyledButton onClick={() => navigate('/main')}>главная</StyledButton>
                <a>|</a>
                <StyledButton onClick={() => navigate('/logs')}> логи</StyledButton>
                <a>|</a>
                <StyledButton>инциденты</StyledButton>
                <a>|</a>
                <StyledButton  onClick={() => navigate('/users')}>рабочие</StyledButton>
            </StyledHeaderLower>
        </StyledHeader>
    );
};

export default Header;