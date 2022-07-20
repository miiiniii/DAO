
import { IconPlus } from "./cssIcons";
import { useEffect, useState } from "react";
import SocketJsClient from "react-stomp";
import TEST_IP from "../scripts/setTestIp";
import chatAPI from "../scripts/chatAxios";
import customAxios from "../scripts/customAxios";
import customAxiosData from "../scripts/customAxiosData";
import { useRef } from "react";
import LoadingSpinner from "./loadingSpinner";

function ClubChat(props) {
    //chat view 스크롤


    //메세지 송수신
    const [chatMessasges, setChatMessages] = useState([]);
    const [noMoreMsg, setNoMoreMsg] = useState(false);
    const msgLoading = useRef(false);

    const onMessageReceived = (msg) => {
        console.log("Message Received ", msg);
        if(msg.author===props.auth.userInfo.nick){
            msg.isMine=true;
        }
        else{
            msg.isMine=false;
        }
        setChatMessages(chatMessasges.concat(msg));
    }
    const handleMessageSubmit = (msg, contentType) => {
        chatAPI.sendMessage(props.auth.userInfo.nick, contentType, msg, (res) => {
            console.log("sent", res);
        });
    }

    const addDateSeparation = (chatList) => {
        var temps=document.getElementsByClassName("dateSeparator");
        for(var i=0; i <temps.length; i++){
            temps[i].remove();
        }
        var msgDate = null;
        chatList.map((c, i) => {
            let tempDate = new Date(c.timestamp).toLocaleDateString()
            //map debug
            //console.log(`dateSeparation map ${i}: msgDate=${msgDate}, tempDate=${tempDate}, separation=${msgDate!==tempDate}`)
            if (msgDate === null) {
                msgDate = tempDate;
                return;
            }
            if (msgDate !== tempDate) {
                document.getElementsByClassName("chat")[i]
                .insertAdjacentHTML("beforebegin", `<div class="dateSeparator">${msgDate}</div>`);
            }
            msgDate = tempDate;
            return;
        })
        if (msgDate !== new Date().toLocaleDateString()) {
            document.getElementsByClassName("chat")[chatList.length-1]
            .insertAdjacentHTML("afterend", `<div class="dateSeparator">${msgDate}</div>`);
        }
    }

    const [scrollLock, setScrollLock] = useState(true);
    const scrollBottom = () => {
        let chatView = document.getElementsByClassName("chatView")[0];
        chatView.scrollTop = chatView.scrollHeight;
    }
    useEffect(() => {
        console.log("chatList", chatMessasges.length);
        if (scrollLock) {
            scrollBottom();
        }
        if(chatMessasges.length!==0)setTimeout(()=>addDateSeparation(chatMessasges),10);
    }, [chatMessasges])

    const getMoreMessages = (index) => {
        customAxiosData("/getMsgsFrom", { index: index }, (res) => {
            if (res.length !== 0) {
                res=res.map((c,i)=>{
                    if(c.author===props.auth.userInfo.nick){
                        c.isMine=true;
                    }
                    else{
                        c.isMine=false;
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
        if (props.clubPage.viewClass === '') {
            if (chatMessasges.length === 0) {
                customAxios("/getMsgsLast", (res) => {
                    res=res.map((c,i)=>{
                        if(c.author===props.auth.userInfo.nick){
                            c.isMine=true;
                        }
                        else{
                            c.isMine=false;
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
        if (e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight) setScrollLock(true);
        else {
            if (scrollLock) setScrollLock(false);
        }
        if (props.clubPage.viewClass === '' && !noMoreMsg && !msgLoading.current && e.target.scrollTop <= 500) {
            msgLoading.current = true;
            getMoreMessages(chatMessasges[0].msgId);
        }
    }

    const formattingTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min =
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${min}`;
    };
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


    const [chatFocus, setChatFocus] = useState(false);
    const [inputBarHeight, setInputBarHeight] = useState(1);
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
    const chatChange = (e) => {
        autoSizing(e);
        setChatFocus(document.getElementsByTagName('textarea')[0].value !== '');
    }
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
                onScroll={chatScrollHandle}
                onscrollStart={chatScrollHandle}>

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
                            userPic={null}
                            role="직책"
                            userName={c.author}
                            sendTime={formattingTimestamp(c.timestamp)}
                            isEdited={c.isEdited}
                            contents={c.content}
                            contentType={c.contentType}
                            isMine={c.isMine} />
                    ))}

                </div>
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
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '180px' } : { bottom: '-45px', left: '180px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '135px' } : { bottom: '-45px', left: '135px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '90px' } : { bottom: '-45px', left: '90px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '45px' } : { bottom: '-45px', left: '45px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0 } : { bottom: '-45px' }}></div>
            </div>
        </div>)
}





function Chat(props) {
    if(props.isMine){
        return (
            <div className="chat">
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
    return (
        <div className="chat">
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