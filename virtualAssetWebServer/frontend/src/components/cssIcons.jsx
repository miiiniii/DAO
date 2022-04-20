import './cssIcons.css';

export default function Icon_Settings(props) {
    return (
        <div className='cssIconBase'
            onClick={props.onClick || null}
            style={{
                display: props.display || 'inline-block',
                margin: (props.margin || '0')+' '+(props.margin || '0')+' 0 '+(props.margin || '0'),
                padding: props.padding || 0,
                height: (props.size||'50px'),
                width: (props.size||'50px'),
            }}>
            <div className='cssIconSettingsCenter' style={{ borderColor: props.color || '#f1ede9', borderStyle:'solid',borderWidth:  'calc('+props.size +'* 0.16)' }}></div>
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