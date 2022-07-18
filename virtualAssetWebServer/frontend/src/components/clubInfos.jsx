
import Icon_Settings, { Icon_Contract, Icon_Search, Icon_Board} from "./cssIcons";

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
            <Icon_Search size='11vw' margin='2vw' />
            <Icon_Contract size='11vw' margin='2vw' />
            <Icon_Board size='11vw' margin='2vw' />
            <Icon_Settings size='11vw' margin='2vw' onClick={()=>{props.setClubSettingView(true)}}/>
        </div>
    </div>)
}


function MemberList(props) {
    return (<div className="memberList">
        <div className="memberListProfilePic" style={{ backgroundImage: (props.userPic || "none") }}></div>{props.userId}
    </div>)
}



export default ClubInfos;