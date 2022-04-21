import { useEffect, useState } from "react";
import "./club.css";
import Icon_Settings,{Icon_Contract, Icon_Search,Icon_Board} from "./cssIcons";

export default function Club(props) {
    const [touchStart, setTouchStart] = useState({ coord: null, timeStamp: null });
    const [touchState, setTouchState] = useState('none');
    const [touchEnd, setTouchEnd] = useState({ coord: null, timeStamp: null });
    const [clubView, setClubView] = useState({ magX: 0, mode: '' });

    function handleTouchStart(e) {
        setTouchStart({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
    }
    useEffect(() => {
        setClubView({ magX: 0, mode: '' });
    }, [props.clubPage.viewClass])
    function handleTouchMove(e) {
        if (touchState === 'none') {
            let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
            let deltaY = e.targetTouches[0].clientY - touchStart.coord.clientY;
            if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                    setTouchState('true');
                    document.querySelector('.chatInputBar textarea').blur();
                    setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
                    if (clubView.mode === 'channel') deltaX = deltaX > 0 ? 0 : deltaX;
                    if (clubView.mode === 'club') deltaX = deltaX < 0 ? 0 : deltaX;
                    setClubView({ magX: deltaX, mode: clubView.mode });
                }
                else {
                    setTouchState('discard');
                }
            }
        }
        if (touchState === 'true') {
            setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
            let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
            if (clubView.mode === 'channel') deltaX = deltaX > 0 ? 0 : deltaX;
            if (clubView.mode === 'club') deltaX = deltaX < 0 ? 0 : deltaX;
            deltaX = deltaX > (window.innerWidth * 0.7 + 5) ? (window.innerWidth * 0.7 + 5) : deltaX;
            deltaX = deltaX < -(window.innerWidth * 0.7 + 5) ? -(window.innerWidth * 0.7 + 5) : deltaX;
            setClubView({ magX: deltaX, mode: clubView.mode });
        }
    }

    function handleTouchEnd(e) {
        let mode = clubView.mode;
        if (touchEnd.timeStamp !== null && touchState !== 'discard') {
            if ((Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX) > window.innerWidth / 2.5)
                || (Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX)
                    > (touchEnd.timeStamp - touchStart.timeStamp) / 5)) {
                mode = (touchEnd.coord.clientX - touchStart.coord.clientX) > 0
                    ? (mode === 'club' ? '' : 'channel')
                    : (mode === 'channel' ? '' : 'club');
            }
        }
        setTouchState('none');
        setTouchEnd({ coord: null, timeStamp: null });
        setClubView({ magX: 0, mode: mode });
    }

    if (props.auth !== undefined && props.auth.code === 100) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <p className="clubNavBar"><span className="backBtn" onClick={props.hideClubPage}><i className="fa fa-arrow-left"></i></span><span className="clubName">클럽 이름</span></p>
            <div className="clubComponemtWarpper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <ClubChannels clubView={clubView} />
                <ClubInfos clubView={clubView} />
                <ClubChat clubView={clubView}
                    onClick={() => { setClubView({ magX: 0, mode: '' }) }} />
            </div>
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
        <h1 className="clubIntroTopSpace">클럽이름</h1>
        <div className="introWrapper">
            <ul className="noneStyleList">
                <li></li>
                <li></li>
                <br />
                <li className="clubIntroTopSpace">클럽 소개글 --------------------------------------------------------------------------</li>
                <li className="clubIntroTopSpace">클럽 개설일 : 2021.01.12</li>
                <li>클럽 맴버수 : 111</li>
                <li>클럽 거래건 : 111</li>
                <li className="clubIntroTopSpace">
                    <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span> <span className="link">#품목</span>
                </li>
                <li className="clubIntroTopSpace"><h3>클럽 대표</h3> <span className="rightCmt">가입일</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.01.12</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.01.17</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.03.09</span></li>
                <li>직책 - 이름<span className="rightCmt">2021.07.25</span></li>
                <li className="clubIntroTopSpace"><h3>최근 거래 목록</h3> <span className="rightCmt">거래일</span></li>
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
    const [isChatNull, setIsChatNull] = useState(true);
    const [textareaRows, setTextareaRows] = useState(1);
    const autoSizing = (e) => {
        let c = document.getElementsByClassName('chatInputBar')[0];
        while (true) {
            if (e.target.clientHeight === e.target.scrollHeight || e.target.rows > 4) break;
            e.target.rows = e.target.rows + 1;

        }
        while (true) {
            if (e.target.rows === 1) break;
            e.target.rows = e.target.rows - 1;
            if (e.target.clientHeight < e.target.scrollHeight) {
                e.target.rows = e.target.rows + 1;
                break;
            }
        }
        c.style.height = (30 + 17 * e.target.rows) + 'px';
        setTextareaRows(e.target.rows);
    }
    const chatChange = (e) => {
        autoSizing(e);
        setIsChatNull(document.getElementsByTagName('textarea')[0].value === '');
        console.log(document.getElementsByTagName('textarea')[0].value === '');
    }
    const chatBlur = (e) => {
        autoSizing(e);
    }
    return (
        <div className={"chatWindowWrapper"
            + (props.clubView.magX === 0 ? " transition" : "")
            + (props.clubView.mode === "channel" ? " channelView" : "")
            + (props.clubView.mode === "club" ? " clubView" : "")}
            style={props.clubView.magX !== 0 ? {
                left: 'calc('
                    + (props.clubView.mode === "club" ? '-70% + ' : (props.clubView.mode === "channel" ? "70% + " : ''))
                    + props.clubView.magX + 'px)'
            } : {}}
            onClick={props.onClick}>
            <div className="chatNavBar">@휴게실<div className="channel"></div><div className="info"></div></div>
            <div className="chatView" style={{ height: 'calc(100% - ' + (63 + textareaRows * 17) + 'px)' }}>
                <div className="chatWrapper">
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={false}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={true}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㄴ유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={true}
                        contents="채팅 내용" />
                    <Chat
                        userPic={null}
                        role="직책"
                        userName="유저 이름"
                        sendTime="4월 18일 오전 11:17"
                        isEditted={true}
                        contents="기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㄴ 채팅 내용" />
                </div>
            </div>
            <div className="chatInputBar">
                <textarea
                    className={"chatInput" + (!isChatNull ? ' chatExtend' : '')}
                    placeholder="메세지 입력"
                    rows={1}
                    onChange={chatChange}
                    onBlur={chatBlur}
                    onTransitionEnd={autoSizing}>
                </textarea>
                <div className="circleBtn submit" style={!isChatNull ? { position: 'relative', left: 'calc(100% - 45px)' } : { position: 'relative', left: 'calc(100% - 5px)' }}></div>
                <div className="circleBtn submit" style={!isChatNull ? { position: 'absolute', left: 0, bottom: 45 } : { position: 'absolute', left: 0, bottom: 0 }}></div>
            </div>
        </div>)
}

function ClubChannels(props) {
    return (<div className={"channelWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "club" ? " clubView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX > 0 ? 0 : props.clubView.magX } : {}}>
        <details open={true}>
            <summary >공지사항</summary>
            <ul>
                <ChannelList channelName='클럽 규칙' />
                <ChannelList channelName='거래 소식' />
                <ChannelList channelName='공지사항' />
            </ul>
        </details>
        <details open={true}>
            <summary>공개채널</summary>
            <ul>
                <ChannelList channelName='휴게실' isSelected={true} />
                <ChannelList channelName='정보' />
                <ChannelList channelName='유머' />
                <ChannelList channelName='거래 제안' />
            </ul>
        </details>
        <details open={true}>
            <summary>거래 전용</summary>
            <ul>
                <ChannelList channelName='상품 이름1' members='23' tag='품목' />
                <ChannelList channelName='상품 이름2' members='55' tag='품목' />
                <ChannelList channelName='상품 이름3' privateMent='계약 완료' />
            </ul>
        </details>
    </div>)
}

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
        <div className="clubSettingWrapper" >
            <Icon_Search size='5vh' margin='1vh' />
            <Icon_Contract size='5vh' margin='1vh' />
            <Icon_Board size='5vh' margin='1vh' />
            <Icon_Settings size='5vh' margin='1vh' />
        </div>
    </div>)
}



function Chat(props) {
    return (
        <div className="chat">
            <div>
                <div className="chatUserPic" style={{ backgroundImage: props.userPic || "none" }}>{props.userPic || 'DAO'}</div>
                <div className="chatContents">
                    <div className="chatSenderRole">[{props.role}]&nbsp;</div><p className="chatSender">{props.userName}</p><p className={"sendTime" + (props.isEditted ? ' editted' : '')}>{props.sendTime}</p>
                    <pre>{props.contents}</pre>
                </div>
            </div>
        </div>
    )
}

function ChannelList(props) {
    return (
        <li className={(props.isSelected || false ? 'currChannel ' : '') + 'channelBanner'} style={(props.privateMent != null) ? { opacity: '0.5' } : {}}>{(props.icon != null) ? (<img src={props.icon} />) : ''}{props.channelName}{props.privateMent != null ? (<span style={{ fontSize: 'small' }}>&nbsp;[{props.privateMent}]</span>) : ''}{props.tag != null ? (<span style={{ fontSize: 'small' }}>&nbsp;#{props.tag}</span>) : ''}{props.members != null ? (<span style={{ float: 'right', fontSize: '0.8em' }}>{props.members}<div className="userIcon"><div></div><div></div></div></span>) : ''}</li>
    )
}

function MemberList(props) {
    return (<div className="memberList">
        <div className="memberListProfilePic" style={{ backgroundImage: (props.userPic || "none")}}></div>{props.userId}
    </div>)
}



