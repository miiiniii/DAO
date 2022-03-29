import { useState } from "react"


export default function Signup(props) {
  return (
    <div className={'signinBackground'+(props.signupPage==='hide'?' signinPageHide':'')} style={{zIndex:10002}}>
      <nav>
        <ul className="nav-container">
          <li className="nav-item"><span onClick={props.hideSignupPage}><i className="fa fa-arrow-left"></i></span></li>
          <li className="nav-item"><p>회원가입</p></li>
        </ul>
      </nav>
      <section className="signup-section-wrap">
        <div className="signup-input-elements-wrap">
          <div className="signup-input-section-wrap">
            <p>아이디<span style={{color: '#FF0000'}}>*</span></p>
            <div className="signup-input-wrap">
              <input placeholder="아이디" type="id"></input>
            </div>
          </div>
          <button>중복확인</button>
        </div>

        <div className="signup-input-section-wrap">
          <p>비밀번호<span style={{color: '#FF0000'}}>*</span></p>
          <div className="signup-input-wrap password-wrap">
            <input placeholder="비밀번호" type="password"></input>
          </div>
        </div>
        <div className="signup-input-section-wrap">
          <p>비밀번호 확인<span style={{color: '#FF0000'}}>*</span></p>
          <div className="signup-input-wrap password-wrap">
            <input placeholder="비밀번호 확인" type="password"></input>
          </div>
        </div>

        <div className="signup-input-section-wrap">
          <p>이름<span style={{color: '#FF0000'}}>*</span></p>
          <div className="signup-input-wrap">
            <input placeholder="이름" type="name" />
          </div>
        </div>
        <div className="signup-input-section-wrap">
          <p>이메일 주소 (선택)</p>
          <div className="signup-input-wrap">
            <input placeholder="이메일주소" type="email" />
          </div>
        </div>
        <div className="signup-input-elements-wrap">
          <div className="signup-input-section-wrap">
            <p>전화 번호<span style={{color: '#FF0000'}}>*</span></p>
            <div className="signup-input-wrap">
              <input placeholder="전화번호" type="phone"></input>
            </div>
          </div>
          <button style={{fontSize: "12px"}}>인증번호 받기</button>
        </div>
        <div className="signup-input-section-wrap">
          <div className="signup-input-wrap">
            <input placeholder="인증번호 입력" type="auth-number" />
          </div>
        </div>
        <div className="signup-button-wrap">
          <button style={{marginTop: "45px"}}>회원가입</button>
        </div>
      </section>
    </div >
  )
}