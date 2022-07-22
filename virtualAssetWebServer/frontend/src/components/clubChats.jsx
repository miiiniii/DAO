
import { IconPlus } from "./cssIcons";
import { useEffect, useState } from "react";
import SocketJsClient from "react-stomp";
import TEST_IP from "../scripts/setTestIp";
import chatAPI from "../scripts/chatAxios";
import customAxios from "../scripts/customAxios";
import customAxiosData from "../scripts/customAxiosData";
import { useRef } from "react";
import LoadingSpinner from "./loadingSpinner";
import "react-contexify/dist/ReactContexify.css";
import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    theme,
    animation
} from "react-contexify";


function ClubChat(props) {

    const [chatFocus, setChatFocus] = useState(false);
    const [inputBarHeight, setInputBarHeight] = useState(1);
    const [chatMessasges, setChatMessages] = useState([]);
    const [scrollLock, setScrollLock] = useState(true);
    const [noMoreMsg, setNoMoreMsg] = useState(false);
    const msgLoading = useRef(false);
    const [chatTouchEvent, setChatTouchEvent] = useState();


    //수정요청
    const requestDeleteMessage=(id)=>{
        //TODO
    }


    //날짜 분기선
    const delDateSeparation = () => {
        var temps = document.getElementsByClassName("dateSeparator");
        for (var i = temps.length - 1; i > -1; i--) {
            console.log(`delete separator date:${temps[i].textContent}`);
            temps[i].remove();
        }
    }

    const addDateSeparation = () => {
        delDateSeparation();
        var msgDate = null;
        Array.from(chatMessasges).map((c, i) => {
            let tempDate = new Date(c.timestamp).toLocaleDateString()
            //map debug
            //console.log(`dateSeparation map ${i}: msgDate=${msgDate}, tempDate=${tempDate}, separation=${msgDate!==tempDate}`)
            if (msgDate === null) {
                msgDate = tempDate;
                return;
            }
            if (msgDate !== tempDate) {
                console.log(`separator added at ${i}, target date:${tempDate}, compare date:${msgDate}`);
                document.getElementsByClassName("chat")[i]
                    .insertAdjacentHTML("beforebegin", `<div class="dateSeparator">${msgDate}</div>`);
            }
            msgDate = tempDate;
            return;
        })
        if (msgDate !== new Date().toLocaleDateString()) {
            console.log(`separator added at ${chatMessasges.length - 1}, target date:${new Date().toLocaleDateString()}, compare date:${msgDate}`);
            document.getElementsByClassName("chat")[chatMessasges.length - 1]
                .insertAdjacentHTML("afterend", `<div class="dateSeparator">${msgDate}</div>`);
        }
        scrollBottom();
    }


    //chat view 스크롤

    const scrollBottom = () => {
        if (!scrollLock) return;
        let chatView = document.getElementsByClassName("chatView")[0];
        chatView.scrollTop = chatView.scrollHeight;
    }

    useEffect(() => {
        if (chatMessasges.length === 0) return;
        console.log("chatList", chatMessasges.length);
        scrollBottom();
        if (chatMessasges.length !== 0) setTimeout(() => addDateSeparation(), 10);
    }, [chatMessasges])

    const scrollPosition = (length) => {
        console.log("scrollPosition");
        let addedHeight = 0;
        Array.from(document.getElementsByClassName("chat")).map((c, i) => {
            if (i >= length) return false;
            addedHeight = addedHeight + c.clientHeight;
            return;
        });
        document.getElementsByClassName("chatView")[0].scrollTop += addedHeight;
    }

    const chatScrollHandle = (e) => {
        if(props.clubPage.viewClass!=='')return;
        let lastChatHeight=document.getElementsByClassName("chat");
        lastChatHeight=lastChatHeight[lastChatHeight.length-1].clientHeight - 40;
        let isScrollBottom=e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - lastChatHeight;
        if (!scrollLock && isScrollBottom) {
            console.log("scroll lock on",e.target.clientHeight + e.target.scrollTop,e.target.scrollHeight - lastChatHeight,isScrollBottom);
            setScrollLock(true);
        }
        else if (scrollLock && ! isScrollBottom) {
                console.log("scroll lock off",e.target.clientHeight + e.target.scrollTop,e.target.scrollHeight - lastChatHeight,isScrollBottom);
                setScrollLock(false);
        }
        
        if (props.clubPage.viewClass === '' && !noMoreMsg && !msgLoading.current && e.target.scrollTop <= 500) {
            msgLoading.current = true;
            getMoreMessages(chatMessasges[0].msgId);
        }
    }


    //메세지 송수신

    const onMessageReceived = (msg) => {
        console.log("Message Received ", msg);
        if (msg.author === props.auth.userInfo.nick) {
            msg.isMine = true;
        }
        else {
            msg.isMine = false;
        }
        setChatMessages(chatMessasges.concat(msg));
    }

    const handleMessageSubmit = (msg, contentType) => {
        chatAPI.sendMessage(props.auth.userInfo.nick, contentType, msg, (res) => {
            console.log("sent", res);
        });
    }

    const getMoreMessages = (index) => {
        customAxiosData("/getMsgsFrom", { index: index }, (res) => {
            if (res.length !== 0) {
                res = res.map((c, i) => {
                    if (c.author === props.auth.userInfo.nick) {
                        c.isMine = true;
                    }
                    else {
                        c.isMine = false;
                    }
                    return c;
                })
                console.log(`get past messages from ${index} to ${res[0].msgId}`, res);
                setChatMessages(res.concat(chatMessasges));
                scrollPosition(res.length);
            }
            else {
                setNoMoreMsg(true);
            }
            msgLoading.current = false;
        })
    }

    useEffect(() => {
        console.log("props.clubPage.viewClass === '' =>", props.clubPage.viewClass === '')
        delDateSeparation();
        if (props.clubPage.viewClass === '') {
            if (chatMessasges.length === 0) {
                customAxios("/getMsgsLast", (res) => {
                    res = res.map((c, i) => {
                        if (c.author === props.auth.userInfo.nick) {
                            c.isMine = true;
                        }
                        else {
                            c.isMine = false;
                        }
                        return c;
                    })
                    console.log("get past messages", res);
                    setChatMessages(res.concat(chatMessasges));
                    scrollPosition(res.length);
                    if (res.length < 30) setNoMoreMsg(true);
                })
            }
        } else {
            if (chatMessasges.length !== 0) {
                console.log("del messages");
                setNoMoreMsg(false);
                setChatMessages([]);
            }
        }
    }, [props.clubPage.viewClass])

    //메세지 timestamp formatter
    const formattingTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min =
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${min}`;
    };

    //입력 이벤트
    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            let txt = document.getElementById("chatSubmit").value;
            if (txt === "" || txt === "\n") return false;
            document.getElementById("chatSubmit").value = "";
            handleMessageSubmit(txt, "msg");
            return false;
        }
    }

    const chatChange = (e) => {
        autoSizing(e);
        setChatFocus(document.getElementsByTagName('textarea')[0].value !== '');
    }




    //입력란 사이즈 조절
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
        if (!chatFocus) {
            c.style.height = (30 + 17 * e.target.rows) + 'px';
            setInputBarHeight(30 + 17 * e.target.rows)
        } else {
            c.style.height = (70 + 17 * e.target.rows) + 'px';
            setInputBarHeight(70 + 17 * e.target.rows)
        }
    }

    //입력 바 조절
    useEffect(() => {
        let row = document.getElementsByClassName('chatInput').length === 0 ? 1 : document.getElementsByClassName('chatInput')[0].rows;
        let t = document.getElementsByClassName('chatInputBar')[0];
        if (t == null) return;
        if (!chatFocus) {
            t.style.height = (30 + 17 * row) + 'px';
            setInputBarHeight(30 + 17 * row)
        } else {
            t.style.height = (70 + 17 * row) + 'px';
            setInputBarHeight(70 + 17 * row)
        }
    }, [chatFocus])

    useEffect(() => {
        if ((props.clubView.mode === 'channel' || props.clubView.mode === 'club') && document.getElementsByTagName('textarea')[0].value === '') {
            setChatFocus(false);
        }
    }, [props.clubView.mode])



    //context menu
    const [chatTouchInfo, setChatTouchInfo] = useState({ timer: null, isTouched: false, target:null});

    const { show } = useContextMenu({id: "chatContextMenu"});

    const handleItemClick = ({ event, props, triggerEvent}) => {
        //console.log(event, props, triggerEvent,event.target.parentElement.__reactProps$oxzcr8ujwo.itemID);
        switch (event.target.parentElement.__reactProps$oxzcr8ujwo.itemID) {
            case "delete":
                console.log("delete:", props.id);
              break;
              case "edit":
                    console.log("edit:", props.id);
              break;
          }
    }

    const onContextOpen = (e) => {
        console.log(e);
        if(chatTouchInfo.target===null)return;
        show(e, { props: { id: Number(e.currentTarget.id) } });
    }


    const onChatTouchStart = (e) => {
        setChatTouchEvent(e);
        let target = e.target;
        while (!Array.from(target.classList).includes("chat")) {
            target = target.parentElement;
        }
        setChatTouchInfo({
            timer:
                setTimeout((t = target) => {
                    if (chatTouchInfo.isTouched);
                    t.classList.add('chatTouchAnimation');
                }, 100),
            isTouched: true,
            target: target
        });
    }

    const onChatTouchMove = (e) => {
        if (Math.abs(e.changedTouches[0].clientX - chatTouchEvent.changedTouches[0].clientX) > 20 || Math.abs(e.changedTouches[0].clientY - chatTouchEvent.changedTouches[0].clientY) > 20) {
            let target = e.target;
            while (!Array.from(target.classList).includes("chat")) {
                target = target.parentElement;
            }
            clearTimeout(chatTouchInfo.timer);
            target.classList.remove('chatTouchAnimation');
            setChatTouchInfo({ timer: null, isTouched: false, target: null });
        }
    }

    const onChatTouchEnd = (e) => {
        let target = e.target;
        while (!Array.from(target.classList).includes("chat")) {
            target = target.parentElement;
        }
        if (chatTouchInfo.isTouched) {
            clearTimeout(chatTouchInfo.timer);
            target.classList.add('chatTouchAnimation');
            setTimeout(() => {
                target.classList.remove('chatTouchAnimation');
            }, 100);
            setChatTouchInfo({ timer: null, isTouched: false, target: target });
        }
    }




    //투표
    const [showVoteMaker,setShowVoteMaker]=useState(false);
    const onMakeVoteClick=(e)=>{
        console.log("make vote");

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
            <div className="chatView"
                style={{ height: 'calc(100% - ' + (33 + inputBarHeight) + 'px)' }}
                onScroll={chatScrollHandle}>

                <SocketJsClient
                    url={`http://${TEST_IP}:8080/api/my-chat/`}
                    topics={["/topic/group"]}
                    onMessage={(msg) => onMessageReceived(msg)}
                    debug={true}
                />
                <MsgLoader noMoreMsg={noMoreMsg} />
                <div className="chatWrapper">
                    {chatMessasges.map((c, i) => (
                        <Chat
                            key={i}
                            id={c.msgId}
                            userPic={null}
                            role="직책"
                            userName={c.author}
                            sendTime={formattingTimestamp(c.timestamp)}
                            isEdited={c.isEdited}
                            contents={c.content}
                            contentType={c.contentType}
                            isMine={c.isMine}
                            onContextOpen={onContextOpen}
                            onChatTouchEnd={onChatTouchEnd}
                            onChatTouchMove={onChatTouchMove}
                            onChatTouchStart={onChatTouchStart} />
                    ))}

                </div>
                <Menu id="chatContextMenu" theme={theme.dark} animation={animation.fade}>
                    <Item itemID="edit" onClick={handleItemClick}>수정</Item>
                    <Item itemID="delete" onClick={handleItemClick}>삭제</Item>
                </Menu>
            </div>
            <div className="chatInputBar">
                <textarea
                    id="chatSubmit"
                    className={"chatInput" + (chatFocus ? ' chatExtend' : '')}
                    placeholder="메세지 입력"
                    rows={1}
                    onChange={chatChange}
                    onBlur={autoSizing}
                    onTransitionEnd={autoSizing}
                    onKeyDown={onKeyDown}>
                </textarea>
                <div className="circleBtn" onClick={() => setChatFocus(!chatFocus)}><IconPlus size='100%' minus={chatFocus} /></div>
                <div id="makeVote" className="circleBtn" onClick={onMakeVoteClick} style={chatFocus ? { bottom: 0, left: '180px' } : { bottom: '-45px', left: '180px' }}>투표</div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '135px' } : { bottom: '-45px', left: '135px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '90px' } : { bottom: '-45px', left: '90px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '45px' } : { bottom: '-45px', left: '45px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0 } : { bottom: '-45px' }}></div>
            </div>
        </div>)
}





function Chat(props) {

    return (
        <div id={props.id} className="chat"
            onContextMenu={props.onContextOpen}
            onTouchStart={props.onChatTouchStart}
            onTouchMove={props.onChatTouchMove}
            onTouchEnd={props.onChatTouchEnd}
            >
            <div>
                <div className="chatUserPic" style={{ backgroundImage: props.userPic || "none" }}>{props.userPic || 'DAO'}</div>
                <div className="chatContents">
                    <div className="chatSenderRole">[{props.role}]&nbsp;</div><p className="chatSender">{props.userName}</p><p className={"sendTime" + (props.isEdited ? ' edited' : '')}>{props.sendTime}</p>
                    <pre>{props.contents}</pre>
                </div>
            </div>
        </div>
    )
}

function MsgLoader(props) {
    if (props.noMoreMsg) {
        return (
            <div className="msgLoader">
                이전 메세지가 없습니다.
            </div>
        )
    }
    return (
        <div className="msgLoader">
            <LoadingSpinner scale="0.3"></LoadingSpinner>
        </div>
    )
}


export default ClubChat;