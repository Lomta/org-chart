import {useContext, useState} from "react";
import { Card } from "./Card";
import { AvatarContext } from "../contexts/AvatarContext";

const DEFAULT_BORDER_WIDTH = '1px';
const SELECTED_BORDER_WIDTH = '2px';
const DEFAULT_BORDER_COLOR = 'grey';
const SELECTED_BORDER_COLOR = 'green';

const DEFAULT_UNSELECTED_BORDER_DETAIS = {borderWidth: DEFAULT_BORDER_WIDTH, borderColor: DEFAULT_BORDER_COLOR, opacity: 0.3}
const SELECTED_BORDER_DETAIS = {borderWidth: SELECTED_BORDER_WIDTH, borderColor: SELECTED_BORDER_COLOR}
const DEFAULT_BORDER_DETAIS = {borderWidth: DEFAULT_BORDER_WIDTH, borderColor: DEFAULT_BORDER_COLOR, opacity: 1}


const AVATAR_SEQUENCE = ["team_kyoshi", "team_roku", "team_aang", "team_korra"]

type TeamProps = {
    teamName: string
}

type Member =  {
    name: string, 
    skill: string,
    nextAvatarTeam?: string,
    imgSrc: string,
    id: string
}

export function Team(
    {
        teamName
    }:TeamProps
){
    const [selectedCardId, setSelectedCardId] = useState<string>("")
    const {getAvatarTeam, setVisibleTeams, updateVisibleTeams} = useContext(AvatarContext)
    const team = getAvatarTeam(teamName)

    function handleClick(member: Member, teamName: string){
        setSelectedCardId(member.id)
        const nextAvatarTeam = member?.nextAvatarTeam ?? ""
        if (nextAvatarTeam) {
            setVisibleTeams((prev) => new Set(prev.add(nextAvatarTeam)))
        }  else {
            updateVisibleTeams(teamName)
        }
    }
    
    function getBorderDetails(cardId: string){
        if (selectedCardId === "")  return DEFAULT_BORDER_DETAIS

        return (cardId === selectedCardId) ? SELECTED_BORDER_DETAIS : DEFAULT_UNSELECTED_BORDER_DETAIS
    }

    const horizontalLine = teamName !== AVATAR_SEQUENCE[0] ? 
                        (        
                            <div style={{paddingRight:"150px", paddingLeft:"150px"}}>
                                <hr style={{display: "block", marginBottom:"0", marginTop:"0"}}/>
                            </div>
                        ) : ""

    return (
        <div>
            {horizontalLine}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {
                    team.map((member)=> {
                        return (
                            <Card onClick={() => handleClick(member, teamName)} borderDetails={getBorderDetails(member.id)} key={member.id} member={member}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
