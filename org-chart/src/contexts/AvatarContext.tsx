import {createContext, Dispatch, SetStateAction, useState} from "react";

type TeamType = {
    [index: string]: Member[]
}

type Member = { 
    name: string, 
    skill: string,
    nextAvatarTeam?: string,
    imgSrc: string,
    id: string
}

const STARTING_TEAM_NAME = 'team_kyoshi'

const TEAMS : TeamType = {
    'team_aang': [
        { id:"4", name: 'Katara', skill: 'Water Bender', imgSrc: 'https://hips.hearstapps.com/hmg-prod/images/katara-avatar-the-last-airbender-1590006359.png'}, 
        { id:"5", name: 'Toph', skill: 'Earth Bender', imgSrc: 'https://i.redd.it/xg6615s6t4m51.png'},
        { id:"6", name: 'Aang', skill: 'Air Bender', nextAvatarTeam: 'team_korra', imgSrc:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSikALgnoT7K3g5b2fNSddNHfyg5xX86Xrwf7RLRpQV_r6n44zIcAbxGNY16Z4Q_T2wrtg&usqp=CAU'},
        { id:"7", name: 'Sokka', skill: 'Boomerang Guy', imgSrc: 'https://hips.hearstapps.com/hmg-prod/images/sokka-avatar-the-last-airbender-1590006889.png?resize=480:*'},
        { id:"8", name: 'Zuko', skill: 'Fire Bender', imgSrc:'https://imgix.bustle.com/uploads/image/2020/6/15/bc21500f-713f-47c3-911e-0c29d148e2f3-zuko.jpg?w=350&h=298&fit=crop&crop=faces&auto=format%2Ccompress'},
    ],
    'team_roku': [
        { id:"2", name: 'Sozin', skill: 'Fire Bender', imgSrc: 'https://i.pinimg.com/originals/6c/d7/c6/6cd7c6b4aa5372a4ec1d94b165ce2278.jpg'}, 
        { id:"3", name: 'Roku', skill: 'Fire Bender', nextAvatarTeam: 'team_aang', imgSrc: 'https://64.media.tumblr.com/9d674dc3a36a79b714dfc17e20cda3a4/tumblr_inline_p7n8gqq2ru1spg4o9_500.jpg'},
    ],
    'team_korra': [
        { id:"9", name: 'Asami', skill: 'JUST BADASS', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Asami-neutral-book1.png/220px-Asami-neutral-book1.png'}, 
        { id:"10", name: 'Korra', skill: 'Water Bender', imgSrc: 'https://decider.com/wp-content/uploads/2020/08/the-legend-of-korra.jpg?quality=75&strip=all'},
        { id:"11", name: 'Bolin', skill: 'Earth Bender', imgSrc: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bolin-The.Legend.of.Korra.webp'},
        { id:"12", name: 'Mako', skill: 'Fire Bender', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/3/35/Mako_%28The_Legend_of_Korra%29.jpg'}
    ],
    'team_kyoshi': [
        { id:"1", name: 'Kyoshi', skill: 'Earth Bender', nextAvatarTeam: 'team_roku', imgSrc: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-08/13/6/asset/f0d82f7856c0/sub-buzz-3521-1597299837-1.png'},
    ],
}

const AVATAR_SEQUENCE = ["team_kyoshi", "team_roku", "team_aang", "team_korra"]


type AvatarContextType = {
    getAvatarTeam: (teamName: string) => Member[],
    visibleTeams: Set<string>,
    setVisibleTeams: Dispatch<SetStateAction<Set<string>>>,
    isTheLastAvatar: (name: string) => boolean,
    updateVisibleTeams: (name: string) => void
}

export const AvatarContext = createContext<AvatarContextType>({
    getAvatarTeam: (teamName: string) => TEAMS[STARTING_TEAM_NAME],
    visibleTeams: new Set(),
    setVisibleTeams: (prevState: SetStateAction<Set<string>>) => prevState,
    isTheLastAvatar: (name: string) => false,
    updateVisibleTeams: (name: string) => undefined
})


export function AvatarProvider({children}: any) {
    const [visibleTeams, setVisibleTeams] = useState<Set<string>>(new Set([STARTING_TEAM_NAME])) 

    function getAvatarTeam(teamName: string): Member[] {
        return TEAMS[teamName]
    }

    function isTheLastAvatar(name: string): boolean {
        const teamName = "team_" + name.toLowerCase()
        return ( Array.from(visibleTeams).pop()  === teamName)
    }

    function updateVisibleTeams(teamName: string){
          // find the teams that are in the visible teams but are not supposed to be since they are 
            // after the last actually visible team
            let teamIndex = AVATAR_SEQUENCE.length + 1
            let updatedTeams = new Set(visibleTeams)
            for (let i = 0; i < AVATAR_SEQUENCE.length; i++) {
                if (AVATAR_SEQUENCE[i] === teamName) {
                    teamIndex = i;
                }
                if (i > teamIndex) {
                    updatedTeams.delete(AVATAR_SEQUENCE[i])
                }
            }
            if (updatedTeams !== visibleTeams) {
               setVisibleTeams(updatedTeams)
            }
    }


    const defaultValue = {
        getAvatarTeam: getAvatarTeam,
        visibleTeams: visibleTeams,
        setVisibleTeams: setVisibleTeams,
        isTheLastAvatar: isTheLastAvatar,
        updateVisibleTeams: updateVisibleTeams
    }

    return (
        <AvatarContext.Provider value={defaultValue}>
                {children}
        </AvatarContext.Provider>
    )

}
