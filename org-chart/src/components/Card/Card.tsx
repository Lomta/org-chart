import { useContext } from "react";
import './Card.css';
import { AvatarContext } from "../../contexts/AvatarContext";
import { IoPeople } from 'react-icons/io5';

type Border = {
    borderWidth: string,
    borderColor: string,    
}

type Member =  {
    name: string, 
    skill: string,
    nextAvatarTeam?: string,
    imgSrc: string,
    id: string
}

type CardProps = {
    borderDetails: Border,
    onClick: () => void,
    member: Member
}

function Card({
    borderDetails, 
    onClick,
    member
}:CardProps)
{
    const context = useContext(AvatarContext)
    const seeMore = member?.nextAvatarTeam ? <IoPeople/> : ""

    const connectionLinesBottomPart = member.id != "1" ? (           
         <div >
            <div style={{width: "0%", margin: "0 auto"}}>
                <div className="VerticalLine"/>
             </div>   
        </div>) : ""

    const newVerticalLine = member?.nextAvatarTeam && (!context.isTheLastAvatar(member.name)) ? 
    ( 
    
    <div>
        <div style={{width: "0%", margin: "0 auto", marginBottom: "0"}}>
                <div className="VerticalLine"/>
        </div> 
    </div>
    
    
    ): ""

    return (
        <div>
            {connectionLinesBottomPart}
            <div className="Card" style={borderDetails} onClick={onClick}>
                <img src={member.imgSrc} alt="avatar"/>
                <h3>{member.name}</h3>
                <label>{member.skill}</label>   
                <br/>
                {seeMore}
            </div>
            {newVerticalLine}
            </div>
   
    )
}

export default Card
