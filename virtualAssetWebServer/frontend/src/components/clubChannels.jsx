import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import customAxiosData from "../scripts/customAxiosData";


function ClubChannels(props) {
    const onChannelClick=(e)=>{
        props.setSelectedChannel(parseInt(e.target.id));
        console.log(e.target.id);
    }
    return (<div className={"channelWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "club" ? " clubView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX > 0 ? 0 : props.clubView.magX } : {}}>
        {props.channelTabs.map((ct,i)=>(
            <ChannelTab
                key={ct.id}
                channels={props.channels.filter(c=>ct.id===c.tabId)}
                channelTabName={ct.name}
                selectedChannel={props.selectedChannel}
                onChannelClick={onChannelClick}
            />
        ))}
    </div>)
}

function ChannelTab(props) {
    let channels=props.channels.sort((a,b)=>(a.index===b.index?0:(a.index > b.index?1:-1)));
    return (
        <details open={true}>
            <summary>{props.channelTabName}</summary>
            <ul>
                {channels.map((c, i) => (
                    <ChannelList
                        key={c.id}
                        channelName={c.name}
                        channelId={c.id}
                        isClub={c.club}
                        channelMembers={c.memberCnt===0?null:c.memberCnt}
                        contractStatus={c.contractStatus}
                        isSelected={c.id===props.selectedChannel}
                        onClick={props.onChannelClick}/>
                ))}
            </ul>
        </details>
    )
}

function ChannelList(props) {
    return (
        <li id={props.channelId}
            onClick={props.onClick}
            className={(props.isSelected || false ? 'currChannel ' : '') + 'channelBanner'} 
            style={(props.contractStatus != null) ? { opacity: '0.5' } : {}}>{(props.icon != null) ? (<img src={props.icon} alt="img" />) : ''}{props.channelName}{props.contractStatus != null ? (<span style={{ fontSize: 'small' }}>&nbsp;[{props.contractStatus}]</span>) : ''}{props.tag != null ? (<span style={{ fontSize: 'small' }}>&nbsp;#{props.tag}</span>) : ''}{props.channelMembers != null ? (<span style={{ float: 'right', fontSize: '0.8em' }}>{props.channelMembers}
            <div className="userIcon"><div></div><div></div></div></span>) : ''}
        </li>
    )
}

export default ClubChannels;