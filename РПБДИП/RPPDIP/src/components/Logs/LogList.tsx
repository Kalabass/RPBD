import styled from "styled-components";
import { ILogComponent } from "../../interfaces/app.interfaces";
import { useLogs } from "../../hooks/useLogs";
import Log from "./Log";
import LogListHeader from "./LogListHeader";

const LogListWrapper = styled.div`
    width: 90%;
    margin-left: 5%;
`



const LogList:React.FC<ILogComponent> = () => {
    const {isLoading, data} = useLogs();
    return (
        <LogListWrapper>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : data?.length ? (
                    <>
                        <LogListHeader/>
                        {data.map((log) => (
                            <Log key={log.id} {...log}></Log>              
                        ))}
                    </>
                ) : (
                    <div> NotFound... </div>
                )
            }
        </LogListWrapper>
    );
};

export default LogList;