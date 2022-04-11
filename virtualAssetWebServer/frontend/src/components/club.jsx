import "./club.css";

export default function Club(props) {
    if (props.auth !== undefined && props.auth.code === 100) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <ClubChannels></ClubChannels>
            <ClubChat hideClubPage={props.hideClubPage}></ClubChat>
            <ClubInfos></ClubInfos>
        </div>)
    }

    if (props.auth === undefined || props.auth.code !== 100) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <ClubIntrduce hideClubPage={props.hideClubPage} showSigninPage={props.showSigninPage}></ClubIntrduce>
        </div>)
    }
    return (<div className={"clubPage" + props.clubPage.viewClass}>
        <ClubIntrduce hideClubPage={props.hideClubPage} showSigninPage={props.showSigninPage}></ClubIntrduce>
    </div>)
}

function ClubIntrduce(props) {
    return (<div className="clubIntroduce">
        <h1 className="clubInfoTopSpace">클럽이름</h1>
        <div className="infoWrapper">
            <ul className="noneStyleList">
                <li></li>
                <li></li>
                <br />
                <li className="clubInfoTopSpace">클럽 소개글 --------------------------------------------------------------------------</li>
                <li className="clubInfoTopSpace">클럽 개설일 : 2021.01.12</li>
                <li>클럽 맴버수 : 111</li>
                <li>클럽 거래건 : 111</li>
                <li className="clubInfoTopSpace">
                    <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span>
                </li>
                <li className="clubInfoTopSpace"><h3>클럽 대표</h3> <span className="rightCmt">가입일</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.01.12</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.01.17</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.03.09</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.07.25</span></li>
                <li className="clubInfoTopSpace"><h3>최근 거래 목록</h3> <span className="rightCmt">거래일</span></li>
                <li>[품목] 이름<span className="rightCmt">2022.01.22</span></li>
                <li>[품목] 이름<span className="rightCmt">2021.08.30</span></li>
                <li>[품목] 이름<span className="rightCmt">2021.06.01</span></li>
                <li>[품목] 이름<span className="rightCmt">2021.03.13</span></li>
            </ul>
        </div>
        <span className="backBtn" onClick={props.hideClubPage}><i className="fa fa-arrow-left"></i></span>
        <div className="joinClubBtn">클럽 가입</div>

    </div>)
}

function ClubChat(props) {
    return (<div>

        <span className="backBtn" onClick={props.hideClubPage}><i className="fa fa-arrow-left"></i></span>
    </div>)
}

function ClubChannels(props) {
    return (<div>

    </div>)
}

function ClubInfos(props) {
    return (<div>

    </div>)
}