
import './App.css';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import './components/style.css';
import MainIcon from "./components/mainIcon.jsx";
import Home from "./components/home.jsx";
import Explore from "./components/explore.jsx";
import StartPage from './components/startPage';
import Signin from './components/signin';
import Signup from './components/signup';
import EditProfile from './components/editProfile';
import User from './components/user';
import useScript from "./scripts/useScript"
import BankAccount from './components/bankAccount';
import Asset from './components/asset';
import Club from './components/club';
import customAxios from './scripts/customAxios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function App() {
  useScript("https://kit.fontawesome.com/51db22a717.js");



  //********임시 로딩타임 1000ms 추후 로딩 기능 넣으면 동적으로 변경*********/
  const tempLoadingTime = 1000;

  const [startView, SetStartView] = useState(['1', 'block']);
  useState(() => {
    const timer = setInterval(() => {
      SetStartView(['0', 'block'])
      const timer2 = setInterval(() => {
        SetStartView(['0', 'none'])
        clearInterval(timer2)
      }, 500);
      clearInterval(timer)
    }, tempLoadingTime)
  });


  const [signinPage, setSigninPage] = useState('hide');
  const [signupPage, setSignupPage] = useState('hide');
  const [editProfilePage, setEditProfilePage] = useState('hide');
  const [clubPage, setClubPage] = useState({ viewClass: ' clubHide' });
  const [bankAccountPage, setBankAccountPage] = useState('hide');

  const showClubPage = () => setClubPage({ viewClass: '' })
  const hideClubPage = () => setClubPage({ viewClass: ' clubHide' })
  const showSigninPage = () => setSigninPage('show');
  const hideSigninPage = () => setSigninPage('hide');
  const showSignupPage = () => setSignupPage('show');
  const hideSignupPage = () => setSignupPage('hide');
  const showEditProfilePage = () => setEditProfilePage('show');
  const hideEditProfilePage = () => setEditProfilePage('hide');
  const showBankAccountPage = () => setBankAccountPage('show');
  const hideBankAccountPage = () => setBankAccountPage('hide');

  //****main 위에 쓰이는 페이지는 z index 10000으로 설정************
  const [touchBlock, setTouchBlock] = useState(false);
  useEffect(() => {
    setTouchBlock(signinPage === 'show' || signupPage === 'show' || clubPage.viewClass === '' || editProfilePage === 'show' || bankAccountPage === 'show');
  }, [signinPage, signupPage, clubPage, editProfilePage, bankAccountPage])

  const [auth, setAuth] = useState();

  //현 스와이퍼 state
  let [swiper, setSwiper] = useState();

  //로그인 검사
  useEffect(
    () => {
      customAxios('/auth', (data) => {
        setAuth(data);
      });
    }, []
  );


  //현 아이콘 상태 state
  let [iconState, setIconState] = useState([true, false, false, false]);
  //아이콘 상태 변경 메소드
  function changeIcon(idx) {
    let temp = [false, false, false, false];
    temp[idx] = true;
    setIconState(temp);
  }
  const [touchStart, setTouchStart] = useState({ coord: null, timeStamp: null });
  const [touchState, setTouchState] = useState('none');
  const [touchEnd, setTouchEnd] = useState({ coord: null, timeStamp: null });
  const [currMainWindow, setCurrMainWindow] = useState('home');
  useEffect(()=>{

  },[currMainWindow])
  function handleTouchStart(e) {
    setTouchStart({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
  }
  function handleTouchMove(e) {
    if (touchState === 'none') {
      let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
      let deltaY = e.targetTouches[0].clientY - touchStart.coord.clientY;
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          setTouchState('true');
          setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
          setCurrMainWindow({ magX: deltaX, mode: currMainWindow });
        }
        else {
          setTouchState('discard');
        }
      }
    }
    if (touchState === 'true') {
      setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
      let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
      deltaX = deltaX > (window.innerWidth * 0.7 + 5) ? (window.innerWidth * 0.7 + 5) : deltaX;
      deltaX = deltaX < -(window.innerWidth * 0.7 + 5) ? -(window.innerWidth * 0.7 + 5) : deltaX;
      setCurrMainWindow({ magX: deltaX, mode: currMainWindow });
    }
  }

  function handleTouchEnd(e) {
    let mode = currMainWindow;
    if (touchEnd.timeStamp !== null && touchState !== 'discard') {
      if ((Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX) > window.innerWidth / 2.5)
        || (Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX)
          > (touchEnd.timeStamp - touchStart.timeStamp) / 5)) {
        if (touchEnd.coord.clientX - touchStart.coord.clientX) {

        }
      }
    }
    setTouchState('none');
    setTouchEnd({ coord: null, timeStamp: null });
    setCurrMainWindow({ magX: 0, mode: mode });
  }

  return (
    <div className="App">
      <div className="touchBlocker" style={{ display: touchBlock ? 'block' : 'none', opacity: touchBlock ? '0.4' : '0' }}></div>
      <header className="App-header">
        <div id='windowView'>
          <div id="home" className='mainWindowContainer'>
            <Home className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="explore" className='mainWindowContainer'>
            <Explore className='mainWindow' auth={auth} sw={swiper} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="asset" className='mainWindowContainer'>
            <Asset className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="user" className='mainWindowContainer'>
            <User className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showEditProfilePage={showEditProfilePage} showBankAccountPage={showBankAccountPage} />
          </div>
        </div>
        <div className='mainIconContainer'>
          <MainIcon type='home' hl={iconState[0]} sw={swiper} index={0} />
          <MainIcon type='explore' hl={iconState[1]} sw={swiper} index={1} />
          <MainIcon type='asset' hl={iconState[2]} sw={swiper} index={2} />
          <MainIcon type='user' hl={iconState[3]} sw={swiper} index={3} />
        </div>
        {/*
        <Swiper
          id='mainWindowContainer'
          //한페이지에 슬라이드하나
          slidesPerView={1}
          //슬라이드 사이 간격
          spaceBetween={20}
          //끝단으로 가면 반대편으로 슬와이프 가능
          loop={true}
          //스와이프시 이벤트로 아이콘 상태 변경
          onSlideChange={(sw) => {
            setSwiper(sw)
            changeIcon((sw.realIndex))
          }}
        >
          <SwiperSlide id = "homeWindow">
            <Home className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </SwiperSlide>
          <SwiperSlide id="exploreWindow">
            <Explore className='mainWindow' auth={auth} sw={swiper} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </SwiperSlide>
          <SwiperSlide id="assetWindow">
            <Asset className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </SwiperSlide>
          <SwiperSlide id="userWindow">
            <User className='mainWindow' auth={auth} sw={swiper} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showEditProfilePage={showEditProfilePage} showBankAccountPage={showBankAccountPage} />
          </SwiperSlide>
        </Swiper>
      */}
        <div className='mainIconContainer'>
          <MainIcon type='home' hl={iconState[0]} sw={swiper} index={0} />
          <MainIcon type='explore' hl={iconState[1]} sw={swiper} index={1} />
          <MainIcon type='asset' hl={iconState[2]} sw={swiper} index={2} />
          <MainIcon type='user' hl={iconState[3]} sw={swiper} index={3} />
        </div>
      </header>
      <StartPage startView={startView} />
      <Signin signinPage={signinPage} hideSigninPage={hideSigninPage} showSignupPage={showSignupPage} />
      <Signup signupPage={signupPage} hideSignupPage={hideSignupPage} showSigninPage={showSigninPage} />
      <Club auth={auth} clubPage={clubPage} hideClubPage={hideClubPage} showSigninPage={showSigninPage} />
      <EditProfile auth={auth} editProfilePage={editProfilePage} hideEditProfilePage={hideEditProfilePage} showEditProfilePage={showEditProfilePage} />
      <BankAccount auth={auth} bankAccountPage={bankAccountPage} hideBankAccountPage={hideBankAccountPage} showBankAccountPage={showBankAccountPage} />
    </div>
  );
}


export default App;
