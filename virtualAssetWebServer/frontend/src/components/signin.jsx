import { useEffect, useState } from "react";
import useScript from "./useScript"

export default function Signin(props) {
	useScript("https://kit.fontawesome.com/51db22a717.js");
	const [authId, setAuthId]= useState('');
	const [authPw, setAuthPw]= useState('');
	const authIdHandle=(e)=>{
		setAuthId(e.target.value);
		console.log(e.target.value)
	}
	const authPwHandle=(e)=>{
	  setAuthPw(e.target.value);
	  console.log(e.target.value)
	}
	const authSubmit=(e)=>{

	}

	return (
		<div className={'signinBackground'+(props.signinPage==='hide'?' signinPageHide':'')}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item"><span onClick={props.hideSigninPage}><i className="fa fa-arrow-left"></i></span></li>
				</ul>
			</nav>
			<div className="main-container">
				<div className="main-wrap">
					<div className="logo-wrap">
						<span style={{
							fontWeight: 'bold',
							fontSize: '3rem',
							color: '#F1EDE9',
						}}>DAO</span><br />
					</div>
					<section className="login-section-wrap">
						<section className="login-input-section-wrap">
							<div className="login-input-wrap">
								<input placeholder="아이디" type="text" onChange={authIdHandle}></input>
							</div>
							<div className="login-input-wrap password-wrap">
								<input placeholder="비밀번호" type="password" onChange={authPwHandle}></input>
							</div>
							<div className="login-stay-sign-in">
								<i className="far fa-check-circle"></i>

								<span style={{ color: "#F1EDE9" }}>로그인 유지</span>
							</div>
						</section>
						<div className="login-button-wrap">
							<button>로그인</button>
						</div>
					</section>
					<div className="login-sign-up-wrap">
						<p style={{ marginTop: '10px', color: "#F1EDE9" }}>아직 회원이 아니라면?</p>
						<p style={{ marginTop: '15px',  color: '#738CD9' }}><span className="signinBtn" onClick={props.showSignupPage}>회원가입</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}

