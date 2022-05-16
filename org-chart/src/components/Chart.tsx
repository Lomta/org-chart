import { useContext } from "react";
import { AvatarContext } from "../contexts/AvatarContext";
import { Team } from "./Team";

export function Chart(){
    const context = useContext(AvatarContext)

    return(
        <div>
            {
                Array.from(context.visibleTeams).map(teamName => {
                    return(
                        <div id={teamName} style={{alignItems: 'center', justifyContent:'center', display:'flex'}} key={teamName}>
                            <Team teamName={teamName}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
