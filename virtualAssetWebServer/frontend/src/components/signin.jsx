import { useEffect, useState } from "react";
import NaverLogin, { KakaoLogin } from "./externalLogin";
import loginAxios from "../scripts/loginAxios";

export default function Signin(props) {

	const authSubmit = (e) => {
		var authVal = {id: document.getElementById("loginId").value, pw: document.getElementById("loginPw").value};
		loginAxios(authVal, (data)=>{
			if(data.code==100)props.setAuth(authVal);
			console.log(data);
		})
	}
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<div className={'signinBackground' + (props.signinPage === 'hide' ? ' signinPageHide' : '')}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideSigninPage}><i className="fa fa-arrow-left"></i></span></li>
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
								<input id="loginId" placeholder="아이디" type="text"></input>
							</div>
							<div className="login-input-wrap password-wrap">
								<input id="loginPw" placeholder="비밀번호" type="password"></input>
							</div>
							<div className="login-stay-sign-in">
								<div className="round">
									<input type="checkbox" checked={checked} onChange={handleChange} id="rememberMe" />
									<label htmlFor="rememberMe"></label>
								</div>
								<span style={{ color: "#F1EDE9" }}>로그인 유지</span>
							</div>
						</section>
						<div className="login-button-wrap">
							<button onClick={authSubmit}>로그인</button>
						</div>
					</section>
					<div className="login-sign-up-wrap">
						<p style={{ marginTop: '10px', color: "#F1EDE9" }}>아직 회원이 아니라면?</p>
						<p style={{ marginTop: '15px', color: '#738CD9' }}><span className="signinBtn" onClick={props.showSignupPage}>DAO회원가입</span></p>
						<br/>
						<br/>
						<p style={{ color: '#F1EDE9',marginBottom:'8px', opacity:'0.8'}}>소셜 계정으로 간편가입</p>
						<NaverLogin/><KakaoLogin/>
					</div>
				</div>
			</div>
		</div>
	)
}

