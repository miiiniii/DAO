import { useEffect, useState } from "react";
import customAxiosData from "../scripts/customAxiosData";
import "./club.css";
import ClubChannels from "./clubChannels";
import ClubChat from "./clubChats";
import ClubInfos from "./clubInfos";
import ContractForm from "./contractForm";
import MakeVotepvoteDesc from "./makeVote";

export default function Club(props) {
    const [touchStart, setTouchStart] = useState({ coord: null, timeStamp: null });
    const [touchState, setTouchState] = useState('none');
    const [touchEnd, setTouchEnd] = useState({ coord: null, timeStamp: null });
    const [clubView, setClubView] = useState({ magX: 0, mode: '' });
    const [clubSettingView, setClubSettingView]= useState(false);
    const [writeContract,setWriteContract]=useState(false);
    const [contractType,setContractType]=useState();
    const [viewContract,setViewContract]=useState(false);
    const [clubVoteView,setClubVoteView]=useState(false);
    const [sign,setSign]=useState(null);
    const [clubMakeVoteView,setclubMakeVoteView]=useState(false);

    const [channels, setChannels]=useState([]);
    const [isMember,setIsMember]=useState(false);
    const [isLoading, setIsLoading]=useState(true);
    const [channelTabs, setChannelTabs]=useState([]);
    const [selectedChannel, setSelectedChannel] = useState({name:null, id:null});

    const changeChannel=(id)=>{
        let temp=channels.filter(c=>c.id===id)[0];
        setSelectedChannel({name:temp.name, id:temp.id});
    }

    //community 입장시 맴버인지 체크
    useEffect(() => {
        if(props.clubPage.viewClass===' clubHide'){
            setChannels([]);
            setIsMember(false);
            setIsLoading(true);
            return;
        }

        customAxiosData("/enterCommunity", {auth: props.auth.userInfo.id, communityId:props.clubPage.id}, (data)=>{
            console.log( "isMember:", data);
            if(data===true){
                setIsMember(true);
                customAxiosData("/getChannels", {communityId:props.clubPage.id}, (data)=>{
                    console.log( "channels:", data);
                    setChannels(data);
                    data.map((c,i)=>{if(c.default){console.log("default",c); setSelectedChannel({name: c.name, id: c.id}); return false;}})
                })
                customAxiosData("/getChannelTabs",{communityId:props.clubPage.id},(data)=>{
                    console.log( "channelTabs:", data);
                    setChannelTabs(data.sort((a,b)=>(a.index===b.index?0:(a.index > b.index?1:-1))));
                })
            }
        })
    }, [props.clubPage.viewClass])



    //터치 핸들러
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

        else if(clubVoteView){
            setClubVoteView(false);
            return;
        }

        else if(writeContract){
            setWriteContract(false);
            return;
        }

        else if(clubMakeVoteView){  //이 이름은 투표생성창 말하는 것. 이게 활성화되어있으면 뒤로가기 눌렀을 때 채팅창으로 가도록 하는 것임. //투표생성하기 버튼 눌렀을 때 뒤로가기로 해보자 나중에
            setclubMakeVoteView(false);
            return;
        }

        props.hideClubPage();
    }

    function sendBtnClick(){
        if(clubSettingView){
            setClubSettingView(false);
            return;
        }
        else if(writeContract){
            setWriteContract(false);
            setViewContract(true);
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



    if (props.auth !== undefined && props.auth.code === 1000 && isMember) {
        return (<div className={"clubPage" + props.clubPage.viewClass}>
            <p className="clubNavBar"><span className="backBtn" onClick={clubBackClick}><i className="fa fa-arrow-left"></i></span><span className="clubName">클럽 이름</span></p>
            <div className="clubComponemtWarpper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <ClubChannels
                    clubView={clubView}
                    channelTabs={channelTabs}
                    channels={channels}
                    selectedChannel={selectedChannel}
                    changeChannel={changeChannel}
                />
                <ClubInfos clubView={clubView} setClubSettingView={setClubSettingView} setWriteContract={setWriteContract} />
                <ClubChat
                    setClubView={setClubView}
                    clubView={clubView}
                    clubPage={props.clubPage}
                    auth={props.auth}
                    selectedChannel={selectedChannel}
                    onClickVoteOpen={()=>{setClubVoteView(true)}}
                    onClickMakeVote={()=>{setclubMakeVoteView(true)}}
                    />
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

            {clubVoteView?(
                
                <MakeVotepvoteDesc auth={props.auth} selectedChannel={selectedChannel}></MakeVotepvoteDesc>
            ):(
                <></>
            ) }

            {clubMakeVoteView?(
                <MakeVotepvoteDesc auth={props.auth} selectedChannel={selectedChannel}></MakeVotepvoteDesc>
            ):(
                <></>
            ) }

            {writeContract?(
                <div className="clubSettingPage">
                     <div>
                         <ContractForm hideWriteContract={sendBtnClick} type={contractType} viewContract={viewContract} setSign={setSign} sign={sign}/>
                     </div>
                </div>
            ):(
                <></>
            )}
        </div>)
    }

    if (props.auth === undefined || props.auth.code !== 1000) {
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
        <div className="joinClubBtn">클럽 가입</div>
        <p style={{bottom:'10px'}}><span className="backBtn" onClick={props.hideClubPage}><i className="fa fa-arrow-left"></i></span></p>

    </div>)
}





