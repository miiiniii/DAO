import "./loadingSpinner.css";
export default function LoadingSpinner(props) {
    return (
        <div className="spinnerWrapper" style={{transform:`scale(${props.scale||0.5})`}}>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}