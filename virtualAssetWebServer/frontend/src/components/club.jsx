import { useEffect, useState } from "react";
import "./club.css";

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
                if (Math.abs(deltaX) > Math.abs(deltaY) * 2) {
                    setTouchState('true');
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
                <ClubChannels clubView={clubView}></ClubChannels>
                <ClubInfos clubView={clubView}></ClubInfos>
                <ClubChat clubView={clubView}></ClubChat>
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
    const [chatFocused, setHideBtn] = useState(false);
    const [textareaRows, setTextareaRows] = useState(1);
    const autoSizing = (e) => {
        while (true) {
            if (e.target.clientHeight == e.target.scrollHeight || e.target.rows > 4) break;
            e.target.rows = e.target.rows + 1;
        }
        while (true) {
            if (e.target.rows == 1) break;
            e.target.rows = e.target.rows - 1;
            if (e.target.clientHeight < e.target.scrollHeight) {
                e.target.rows = e.target.rows + 1;
                break;
            }
        }

        setTextareaRows(e.target.rows);
    }
    const chatChange = (e) => {
        setHideBtn(true);
        autoSizing(e);
    }
    const chatBlur = (e) => {
        setHideBtn(false);
        autoSizing(e);
    }
    return (<div className={"chatWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "channel" ? " channelView" : "") + (props.clubView.mode === "club" ? " clubView" : "")} style={props.clubView.magX !== 0 ? { left: 'calc(' + (props.clubView.mode === "club" ? '-70% + ' : (props.clubView.mode === "channel" ? "70% + " : '')) + props.clubView.magX + 'px)' } : {}}>
        <div className="chatNavBar">@채널 이름</div>
        <div className="chatWrapper" style={{ height: 'calc(100% - ' + (63 + textareaRows * 17) + 'px)' }}>채팅 내용aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div className="chatInputBar">
            <div className="circleBtn submit" style={chatFocused ? { position: 'absolute', left: 0, bottom: 45 } : { position: 'absolute', left: 0, bottom: 0 }}></div>
            <div className={"circleBtn" + (chatFocused ? ' hideBtn' : '')} style={{ position: 'absolute', left: 0 }}></div>
            <div className={"circleBtn" + (chatFocused ? ' hideBtn' : '')} style={{ position: 'absolute', left: 45 }}></div>
            <textarea
                className={"chatInput" + (chatFocused ? ' chatExtend' : '')}
                placeholder="메세지 입력"
                rows={1}
                onChange={chatChange}
                onBlur={chatBlur}
                onTransitionEnd={autoSizing}>
            </textarea>
            <div className="circleBtn submit" style={chatFocused ? { position: 'relative', left: 'calc(100% - 45px)' } : { position: 'relative', left: 'calc(100% - 5px)' }}></div>
        </div>
    </div>)
}

function ClubChannels(props) {
    return (<div className={"channelWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "club" ? " clubView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX > 0 ? 0 : props.clubView.magX } : {}}>
        channel
    </div>)
}

function ClubInfos(props) {
    return (<div className={"clubWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "channel" ? " channelView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX < 0 ? 0 : props.clubView.magX } : {}}>
        clubinfo
    </div>)
}