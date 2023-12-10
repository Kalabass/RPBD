import styled from "styled-components";
import Header from "../Header/Header";
import { useAccessRequests } from "../../hooks/useAccessRequests";
import AcessRequest from "./AcessRequest";
import AcessRequestHeader from "./AccessRequestHeader";

const AccessRequestsWrapper = styled.div`
    
`

const AccessRequestsPage:React.FC = () => {

    const {data} = useAccessRequests();

    return (
        <>
            <Header/>
            <AccessRequestsWrapper>
                <AcessRequestHeader/>
                {data?.map((request) => (
                    <AcessRequest key = {request.id} {...request}></AcessRequest>
                ))}
            </AccessRequestsWrapper>
        </>
    );
};

export default AccessRequestsPage;