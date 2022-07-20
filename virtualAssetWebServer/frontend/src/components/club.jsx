import { useEffect, useState } from "react";
import "./club.css";
import ClubChannels from "./clubChannels";
import ClubChat from "./clubChats";
import ClubInfos from "./clubInfos";
import ContractForm from "./contractForm"

export default function Club(props) {
    const [touchStart, setTouchStart] = useState({ coord: null, timeStamp: null });
    const [touchState, setTouchState] = useState('none');
    const [touchEnd, setTouchEnd] = useState({ coord: null, timeStamp: null });
    const [clubView, setClubView] = useState({ magX: 0, mode: '' });
    const [clubSettingView, setClubSettingView]= useState(false);
    const [writeContract,setWriteContract]=useState(false);
    const [contractType,setContractType]=useState();
    function handleTouchStart(e) {
        setTouchStart({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
    }
    useEffect(() => {
        setClubView({ magX: 0, mode: '' });
    }, [props.clubPage.viewClass])

    function clubBackClick(){
        if(clubSettingView){
            setClubSettingView(false);
            return;
        }
        else if(writeContract){
            setWriteContract(false);
            return;
        }
        props.hideClubPage();
    }

    useEffect(()=>{
    // 디비에서 해당 클럽의 타입 받아와서 setContractType 으로 세팅
    // 아래 코드는 임시로 set 하는 코드
    // setContractType('art') // 예술품
    setContractType('rEstate') //부동산
    })

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

    if (props.auth !== undefined && props.auth.code === 1000) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <p className="clubNavBar"><span className="backBtn" onClick={clubBackClick}><i className="fa fa-arrow-left"></i></span><span className="clubName">클럽 이름</span></p>
            <div className="clubComponemtWarpper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <ClubChannels clubView={clubView} />
                <ClubInfos clubView={clubView} setClubSettingView={setClubSettingView} setWriteContract={setWriteContract}/>
                <ClubChat clubView={clubView} clubPage={props.clubPage} auth={props.auth}
                    onClick={() => { setClubView({ magX: 0, mode: '' }) }} />
            </div>
            {clubSettingView?(
                            <div className="clubSettingPage">
                            <h1>클럽 설정</h1>
                            <div className="settingGroup">
                                <h3>사용자 설정</h3>
                                <hr />
                                <p className="settingGroupElement">클럽 내부 닉네임</p>
                                <p className="settingGroupElement">알림 설정</p>
                                <p className="settingGroupElement settingCaution">클럽 나가기</p>
                            </div>
                            <div className="settingGroup">
                                <h3>클럽 관리</h3>
                                <hr />
                                <p className="settingGroupElement">멤버 관리</p>
                                <p className="settingGroupElement">채널 관리</p>
                                <p className="settingGroupElement">직책 관리</p>
                                <p className="settingGroupElement settingCaution">클럽 해산</p>
                            </div>
                        </div>
            ):(
                <></>
            ) }
            {writeContract?(
                <div className="clubSettingPage">
                     <div>
                         <ContractForm hideWriteContract={clubBackClick} type={contractType}/>
                     </div>
                </div>
            ):(
                <></>
            )}
        </div>)
    }

    if (props.auth === undefined || props.auth.code !== 100) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <ClubIntrduce hideClubPage={clubBackClick} showSigninPage={props.showSigninPage}></ClubIntrduce>
        </div>)
    }
    return (<div className={"clubPage" + props.clubPage.viewClass}>
        <ClubIntrduce hideClubPage={clubBackClick} showSigninPage={props.showSigninPage}></ClubIntrduce>
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





