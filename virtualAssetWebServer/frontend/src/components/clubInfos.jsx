
import IconSettings, { IconContract, IconSearch, IconBoard} from "./cssIcons";

function ClubInfos(props) {
    return (<div className={"clubWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "channel" ? " channelView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX < 0 ? 0 : props.clubView.magX } : {}}>
        <div className="memberListWrapper">
            <details open={true}>
                <summary>클럽매니저</summary>
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
            </details>
            <details open={true}>
                <summary>채팅매니저</summary>
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
            </details>
            <details open={true}>
                <summary>맴버</summary>
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
                <MemberList userId='유저 이름' />
            </details>
        </div>
        <div className="clubServiceWrapper" >
            <IconSearch size='11vw' margin='2vw' />
            <IconContract size='11vw' margin='2vw' onClick={()=>{props.setWriteContract(true)}}/>
            <IconBoard size='11vw' margin='2vw' />
            <IconSettings size='11vw' margin='2vw' onClick={()=>{props.setClubSettingView(true)}}/>
        </div>
    </div>)
}


function MemberList(props) {
    return (<div className="memberList">
        <div className="memberListProfilePic" style={{ backgroundImage: (props.userPic || "none") }}></div>{props.userId}
    </div>)
}



export default ClubInfos;