
import { Icon_Plus } from "./cssIcons";
import { useEffect, useState } from "react";
import SocketJsClient from "react-stomp";
import TEST_IP from "../scripts/setTestIp";
import chatAPI from "../scripts/chatAxios";

function ClubChat(props) {

    //메세지 송수신
    const [chatMessasges, setChatMessages] = useState([]);
    const onMessageReceived = (msg) => {
        console.log("Message Received ", msg);
        setChatMessages(chatMessasges.concat(msg));
    }
    const handleMessageSubmit = (msg) => {
        chatAPI.sendMessage(props.auth.userInfo.nick, msg,(res)=>{
            console.log("sent",res);
        });
    }

    useEffect(()=>{
        console.log("chatList",chatMessasges);
    },[chatMessasges])

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
            let txt= document.getElementById("chatSubmit").value;
            if (txt===""||txt==="\n")return false;
            document.getElementById("chatSubmit").value="";
            handleMessageSubmit(txt);
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
            <div className="chatView" style={{ height: 'calc(100% - ' + (33 + inputBarHeight) + 'px)' }}>
                <SocketJsClient
                    url={`http://${TEST_IP}:8080/api/my-chat/`}
                    topics={["/topic/group"]}
                    onConnect={console.log("connected!")}
                    onDisconnect={console.log("disconnected!")}
                    onMessage={(msg) => onMessageReceived(msg)}
                    debug={true}
                />
                <div className="chatWrapper">
                    {chatMessasges.map((c, i) => (
                        <Chat
                            key={i}
                            userPic={null}
                            role="직책"
                            userName={c.author}
                            sendTime={formattingTimestamp(c.timestamp)}
                            isEditted={false}
                            contents={c.content} />
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
                <div className="circleBtn" onClick={() => setChatFocus(!chatFocus)}><Icon_Plus size='100%' minus={chatFocus} /></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '180px' } : { bottom: '-45px', left: '180px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '135px' } : { bottom: '-45px', left: '135px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '90px' } : { bottom: '-45px', left: '90px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0, left: '45px' } : { bottom: '-45px', left: '45px' }}></div>
                <div className="circleBtn" style={chatFocus ? { bottom: 0 } : { bottom: '-45px' }}></div>
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

export default ClubChat;