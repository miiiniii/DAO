import "./club.css";

export default function Club(props){
    if (props.auth !== undefined && props.auth.code === 100) {
    return (<div className="clubPage clubHide">
    </div>)
    }
    return(<div className="clubPage">
        <ClubIntrduce></ClubIntrduce>
    </div>)
}

function ClubIntrduce(props){
    return(<div className="clubIntroduce">
        <ul className="noneStyleList">
            <li><span className="backBtn"><i className="fa fa-arrow-left"></i></span></li>
            <li><h1>클럽 이름</h1></li>
            <br/>
            <br/>
            <li>클럽 소개글 --------------------------------------------------------------------------</li>
            <li>클럽 개설일 : 2021.01.12</li>
            <br/>
            <li>
                <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span>
            </li>
            <br/>
            <br/>
            <li style={{marginBottom: '10px'}}><h3>클럽 대표</h3> <span className="rightCmt">가입일</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.01.12</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.01.17</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.03.09</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.07.25</span></li>
            <br/>
            <li style={{marginBottom: '10px'}}><h3>최근 거래 목록</h3> <span className="rightCmt">거래일</span></li>
            <li>직책 - 이름<span className="rightCmt">2022.01.22</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.08.30</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.06.01</span></li>
            <li>직책 - 이름<span className="rightCmt">2021.03.13</span></li>
        </ul>
        <div className="joinClubBtn">클럽 가입</div>
    </div>)
}

function ClubChat(props){
    return(<div>

    </div>)
}

function ClubChannels(props){
    return(<div>

    </div>)
}

function ClubInfos(props){
    return(<div>

    </div>)
}