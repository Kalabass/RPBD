import styled from "styled-components"

const StyledHeader = styled.div`
    background-color: black;
    margin: 0px;
    color: white;
    height: 40px;
    text-align: center;
    font-size: 40px;
`

const Header:React.FC = () => {
    return (
        <StyledHeader>
            ZAVOD
        </StyledHeader>
    );
};

export default Header;