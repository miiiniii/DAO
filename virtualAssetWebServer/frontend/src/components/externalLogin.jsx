import { useEffect } from "react";
import KaKaoLogin from 'react-kakao-login';
import KakaoImg from "../Icons/kakaolink_btn_medium.png";
const { naver } = window;

export default function NaverLogin(props) {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'nYhzYFgOkIvYqzZW2QQ2',
      callbackUrl: 'http://220.70.59.102:3000/',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47'},
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div id='naverIdLogin' style={{ display: 'inline-block',margin:'0 7px', }}></div>
  )
}



export function KakaoLogin(props) {
  const CLIENT_ID = "74adde2b7493003cc6b930d69f3fc1d1";
  const REDIRECT_URI = "http://220.70.59.102:3000/";


  

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (<div style={{display: 'inline-block', margin:'0 7px',}}>
        <a href={KAKAO_AUTH_URL}>
            <img src= {KakaoImg} style={{width: '47px',height: '47px',}}/>
        </a>
  </div>)
}