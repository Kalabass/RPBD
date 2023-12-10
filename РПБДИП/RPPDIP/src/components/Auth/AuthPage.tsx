import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import styled from "styled-components";

const AuthWrapper = styled.div`
    position: absolute;
    background-color: rgb(53, 53, 53);
    border-radius: 7px;
    border: 2px solid #40868c;
    height: 50%;
    width: 40%;
    margin-top: 8%;
    margin-left: 30%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center;

    color: white;
    font-size: 40px;
`

const AuthPage:React.FC = () => {
    const [isLoginShow, setIsLoginShow] = useState<boolean>(true);
    return (
        <AuthWrapper>
            <a>ZAVOD</a>
            {isLoginShow == true ? <Login onClick={() => setIsLoginShow(!isLoginShow)}/> : <Registration onClick={() => setIsLoginShow(!isLoginShow)}/>}
        </AuthWrapper>
    );
};

export default AuthPage;