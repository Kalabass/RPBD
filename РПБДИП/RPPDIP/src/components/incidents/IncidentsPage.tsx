import styled from "styled-components";
import { useIncidents } from "../../hooks/useIncidents";
import Incident from "./Incident";
import IncidentstHeader from "./IncidentsHeader";
import Header from "../Header/Header";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
`

const IncidentsPage:React.FC = () => {

    const {data} = useIncidents();

    return (
        <>
            <Header/>
            <StyledWrapper>
                <IncidentstHeader/>
                {data?.map((incident) => (
                    <Incident key = {incident.id} {...incident}></Incident>
                ))}
            </StyledWrapper>
        </>
    );
};

export default IncidentsPage;