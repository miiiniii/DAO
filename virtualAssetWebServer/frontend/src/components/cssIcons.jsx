import './cssIcons.css';

export default function Icon_Settings(props) {
    return (
        <div className='cssIconBase'
            onClick={props.onClick || null}
            style={{
                display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
                margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
                padding: props.padding || 0,
                height: (props.size || '50px'),
                width: (props.size || '50px'),
                float: props.float || 'none',
            }}>
            <div className='cssIconSettingsCenter' style={{ borderColor: props.color || '#f1ede9', borderStyle: 'solid', borderWidth: 'calc(' + props.size + '* 0.16)' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
            <div className='cssIconSettingsTooth' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
        </div>)
}

export function Icon_Board(props) {
    return (<div className='cssIconBase'
        onClick={props.onClick || null}
        style={{
            display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
            margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
            padding: props.padding || 0,
            height: (props.size || '50px'),
            width: (props.size || '50px'),
            float: props.float || 'none',
        }}>
        <div className='cssIconBoardBody' style={{ borderColor: props.color || '#f1ede9', borderStyle: 'solid', borderWidth: 'calc(' + props.size + '* 0.10)' }}></div>
        <div className='cssIconBoardRope'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.08)',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent'
            }}></div>
        <div className='cssIconBoard'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.25) calc(' + props.size + '* 0.20)',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                height: '0',
                width: '0',
                top: '28%',
                left: '20%'
            }}>
        </div>
        <div className='cssIconBoard' style={{
            backgroundColor: props.color || '#f1ede9',
            height: '11%',
            width: '10%',
            left: '60%',
            top: '65%',
            transform: 'rotate(-39deg)'
        }}></div>
        <div className='cssIconBoard'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.08) calc(' + props.size + '* 0.064)',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                height: '0',
                width: '0',
                top: '53%',
                left: '58%'
            }}>        </div>
        <div className='cssIconBoard'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.08) calc(' + props.size + '* 0.064)',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                height: '0',
                width: '0',
                top: '62%',
                left: '65%'
            }}>
        </div>
    </div>)
}

export function Icon_Search(props) {
    return (<div className='cssIconBase'
        onClick={props.onClick || null}
        style={{
            display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
            margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
            padding: props.padding || 0,
            height: (props.size || '50px'),
            width: (props.size || '50px'),
            float: props.float || 'none',
        }}>
        <div className='cssIconSearchLens' style={{ borderColor: props.color || '#f1ede9', borderStyle: 'solid', borderWidth: 'calc( ' + props.size + 'px * 0.08 )' }}></div>
        <div className='cssIconSearchConnecter' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
        <div className='cssIconSearchHandle' style={{ backgroundColor: props.color || '#f1ede9' }}></div>
    </div>)
}

export function Icon_Contract(props) {
    return (<div className='cssIconBase'
        onClick={props.onClick || null}
        style={{
            display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
            margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
            padding: props.padding || 0,
            height: (props.size || '50px'),
            width: (props.size || '50px'),
            float: props.float || 'none',
        }}>
        <div className='cssIconContractBodyLeft'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.1)',
                borderRight: 0
            }}></div>
        <div className='cssIconContractBodyRight'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.1)',
                borderLeft: 0
            }}></div>
        <div className='cssIconContractBodyEdge'
            style={{
                borderColor: 'transparent',
                borderTopColor: props.color || '#f1ede9',
                borderLeftColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.13)'
            }}></div>
        <div className='cssIconContractBodyEdgeRound'
            style={{
                borderBottomColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.08)'
            }}></div>
        <div className='cssIconContractLine'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.06)',
                width: '32%',
                top: '68%'
            }}></div>
        <div className='cssIconContractLine'
            style={{
                borderColor: props.color || '#f1ede9',
                borderStyle: 'solid',
                borderWidth: 'calc(' + props.size + '* 0.06)',
                width: '49%',
                top: '50%'
            }}></div>
        <div style={{
            position: 'absolute',
            backgroundColor: props.color || '#f1ede9',
            height: '45%',
            width: '23%',
            top: '8%',
            left: '22%'
        }}></div>
        <div style={{
            position: 'absolute',
            backgroundColor: props.color || '#f1ede9',
            height: '20%',
            width: '20%',
            top: '68%',
            left: '58%',
        }}></div>

    </div>)
}

export function Icon_Plus(props){
    return(<div className='cssIconBase'
    onClick={props.onClick || null}
    style={{
        display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
        margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
        padding: props.padding || 0,
        height: (props.size || '50px'),
        width: (props.size || '50px'),
        float: props.float || 'none',
    }}>
        <div className='cssIconPlus' style={{opacity: props.minus||false?0:1,backgroundColor: props.backgroundColor||'#4b525a'}}/>
        <div className='cssIconPlus' style={{backgroundColor: props.backgroundColor||'#4b525a'}}/>
    </div>)
}

export function Icon_Edit(props){
    return(<div className='cssIconBase'
    onClick={props.onClick || null}
    style={{
        display: props.display || ((props.float || null) == null ? 'inline-block' : 'block'),
        margin: (props.margin || '0') + ' ' + (props.margin || '0') + ' 0 ' + (props.margin || '0'),
        padding: props.padding || 0,
        height: (props.size || '50px'),
        width: (props.size || '50px'),
        float: props.float || 'none',
    }}>
        <div className='cssIconPlus' style={props.minus||false?{opacity:0}:{}}/>
        <div className='cssIconPlus'/>
    </div>)
}