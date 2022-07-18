

function ClubChannels(props) {
    return (<div className={"channelWindowWrapper" + (props.clubView.magX === 0 ? " transition" : "") + (props.clubView.mode === "club" ? " clubView" : "")} style={(props.clubView.magX !== 0 && props.clubView.mode === "") ? { left: props.clubView.magX > 0 ? 0 : props.clubView.magX } : {}}>
        <details open={true}>
            <summary>공지사항</summary>
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

function ChannelList(props) {
    return (
        <li className={(props.isSelected || false ? 'currChannel ' : '') + 'channelBanner'} style={(props.privateMent != null) ? { opacity: '0.5' } : {}}>{(props.icon != null) ? (<img src={props.icon} />) : ''}{props.channelName}{props.privateMent != null ? (<span style={{ fontSize: 'small' }}>&nbsp;[{props.privateMent}]</span>) : ''}{props.tag != null ? (<span style={{ fontSize: 'small' }}>&nbsp;#{props.tag}</span>) : ''}{props.members != null ? (<span style={{ float: 'right', fontSize: '0.8em' }}>{props.members}<div className="userIcon"><div></div><div></div></div></span>) : ''}</li>
    )
}

export default ClubChannels;