
export default function StartPage(props) {

    return (
        <div style={{
            display: props.startView[1],
            zIndex: '10000',
            backgroundColor: '#738CD9',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: '0%',
            left: '0%',
            transition:'0.5s',
            opacity: props.startView[0],
        }}>
            <div style={{
                position: 'relative',
                top:'50%',
                transform:'translateY(-50%)',
            }}>
                <p style={{
                    margin:'0',
                    textAlign:'center',
                    fontWeight: 'bold',
                    fontSize: '6rem',
                    color: '#F1EDE9',
                }}>DAO</p>
                <p style={{
                    margin:'0',
                    textAlign:'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#F1EDE9',
                }}>세상에 존재하는 모든 투자</p>
            </div>
        </div>
    );
}

