import styled from "styled-components";
import { IIncident } from "../../interfaces/app.interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import incidentsService from "../../services/incidents.service";

const IncidentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 3px solid #40868c;
`

const IncidentUpperWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const IncidentLowerWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

interface ILogPartProps{
    width: string;
}

const IncidentPart = styled.div<ILogPartProps>`
    border: 1px solid #40868c;
    color: white;
    width: ${props => props.width};
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: 40px;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    margin: 0px;
    background-color: rgb(53, 53, 53);
    color: white;
    font-size: 15px;
    resize: none;
`

interface IStyledButtonProps{
    bgcolor: string;
}

const StyledButton = styled.button<IStyledButtonProps>`
    background-color: ${props => props.bgcolor};
    width: 40%;
    height: 80%;
    border: 0px;
    border-radius: 7px;
    cursor: pointer;
    margin-inline: 5px;
    text-align: center;
`

const Incident:React.FC<IIncident> = ({is_resolved, timestamp, comment , room_id, user_id, id}) => {

    const [isChecked, setIsChecked] = useState<boolean>(is_resolved);
    const [textAreaValue, setTextAreaValue] = useState<string>(comment);

    const queryClient = useQueryClient();

    const UpdateMutation = useMutation({
        mutationFn: () => incidentsService.UpdateIncident(id, {is_resolved: isChecked, comment: textAreaValue}),
        mutationKey: ['incident', 'update'],
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['incidents']})
    })

    const DeleteMutation = useMutation({
        mutationFn: () => incidentsService.DeleteIncident(id),
        mutationKey: ['incident', 'delete'],
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['incidents']})
    })

    return (
        <IncidentWrapper>
            <IncidentUpperWrapper>
                <IncidentPart width="30%">{id}</IncidentPart>
                <IncidentPart width="30%">{user_id}</IncidentPart>
                <IncidentPart width="30%">{room_id}</IncidentPart>
                <IncidentPart width="100%">{timestamp.toString()}</IncidentPart>
                <IncidentPart width="100%"><input type="checkbox" checked = {isChecked} onChange={() => setIsChecked(!isChecked)}></input></IncidentPart>
                <IncidentPart width="100%">
                    <StyledButton bgcolor = '#40868c' onClick={() => {UpdateMutation.mutate()}}>
                        обновить
                    </StyledButton>
                    <StyledButton bgcolor = '#a0203a' onClick={() => {DeleteMutation.mutate()}}>
                        Удалить
                    </StyledButton>
                </IncidentPart>
            </IncidentUpperWrapper>
            <IncidentLowerWrapper>
                <IncidentPart width="30%">Коммент:</IncidentPart>
                <IncidentPart width="100%"><StyledTextArea value={textAreaValue} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(e.target.value)}></StyledTextArea></IncidentPart>
            </IncidentLowerWrapper>
        </IncidentWrapper>
    );
};

export default Incident;