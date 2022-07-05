
import './App.css';
import React, { useEffect, useState } from 'react';
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
import customAxiosData from './scripts/customAxiosData';

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

  //로그인 검사
  useEffect(
    () => {
      if(auth==null)return;
      customAxiosData('/auth', auth, (data) => {
        if(data.code==100)setAuth(auth);
        setAuth(null);
      });
    }, [auth]
  );


  //현 아이콘 상태 state
  const [iconState, setIconState] = useState([true, false, false, false]);
  //아이콘 상태 변경 메소드
  function changeIcon(index) {
    let temp = [false, false, false, false];
    temp[index] = true;
    setIconState(temp);
  }
  const [touchStart, setTouchStart] = useState({ coord: null, timeStamp: null });
  const [touchState, setTouchState] = useState('none');
  const [touchEnd, setTouchEnd] = useState({ coord: null, timeStamp: null });
  const [currMainWindow, setCurrMainWindow] = useState(0);
  const [isSkip, setIsSkip] = useState(false);

  useEffect(() => {
    changeIcon(currMainWindow);
    setMainWindowPosition();
  }, [currMainWindow])

  function setMainWindowPosition(){
		//왼쪽, 중앙, 오른쪽에 배치될 mainWindow의 translateX속성 값 리스트.
    let posSet=["-100vw","0vw","100vw"];
		
    for(var i of [0,1,2,3]){
				//index가 i인 mainWindow가 왼쪽에 있는지 오른쪽에 있는지 판별을 위한 변수.
        let t=(i-currMainWindow);
				//display 속성 값을 위한 변수.
        let d="block";
				//오른쪽으로 3칸 옆에 있으면 바로 왼쪽에 있는것과 같음. 계산을 위해 보정.
        if(t>2)t=-1;
				//왼쪽으로 3칸 옆에 있으면 바로 오른쪽에 있는것과 같음. 계산을 위해 보정.
        else if(t<-2)t=1;
				//왼쪽으로 두칸옆에 있는것은 현재 페이지의 대척점에있으므로 최적화를 위해 disply속성을 none으로 줘 랜더링에서 제외
        else if(t<-1){
          t=-1;
					//스킵시 대척점에 있는 페이지에서 현 페이지로 바로 이동하기 때문에 display를 none으로 하면 이동시 갑자기 전페이지가 사라짐.
					//따라서 스킵시에는 display속성을 바꾸지 않음.
          d=isSkip?"block":"none";
        }
        //오른쪽으로 두칸옆에 있는것은 현재 페이지의 대척점에있으므로 최적화를 위해 disply속성을 none으로 줘 랜더링에서 제외
        else if(t>1){
          //스킵시 대척점에 있는 페이지에서 현 페이지로 바로 이동하기 때문에 display를 none으로 하면 이동시 갑자기 전페이지가 사라짐.
					//따라서 스킵시에는 display속성을 바꾸지 않음.
          d=isSkip?"block":"none";
          t=1;
        }
			//계산한 위치와 display 속성을 적용.
      document.getElementsByClassName("mainWindowContainer")[i].style.transform="translateX("+posSet[t+1]+")";
      document.getElementsByClassName("mainWindowContainer")[i].style.display=d;
    }
		//스킵 변수 초기화.
    setIsSkip(false);
}

  function setMainWindowTransition(val) {
      for(var i of [0,1,2,3]){
        document.getElementsByClassName("mainWindowContainer")[i].style.transition=val?"0.2s":"";
      }
  }

  function handleTouchStart(e) {
    setTouchStart({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
  }

  function handleTouchMove(e) {
		//필요 state의 touchStart, touchState, touchEnd, currMainWindow 참조
		//swipe 입력 대기 상태일 때
    if (touchState === 'none') {
			//touchEnd좌표 - touchStart좌표 => 이동한 거리
      let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
      let deltaY = e.targetTouches[0].clientY - touchStart.coord.clientY;

			// 이동한 거리가 x축으로 3px 또는 y축으로 3px보다 크다면
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
				//x축으로 이동한 거리가 y축으로 이동한 거리의 1.2배 보다 크다면
        if (Math.abs(deltaX) > Math.abs(deltaY)*1.2) {
					//터치 상태를 true로 설정.
          setTouchState('true');
					//setMainWindowTransition(boolean)참조.
          setMainWindowTransition(false);
					//필요 state의 touchEnd 참조.
          setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
					//currMainWondow에 저장된 index로 element id값을 사용하기위한 임시 변수.
          let temp = ["home", "explore", "asset", "user"];
					//이동한 x축 거리만큼 현재 mainWindow를 이동
          document.getElementById(temp[currMainWindow]).style.transform = "translateX(" + deltaX + "px))";
          //최적화를 위해 항상 이전, 현재, 다음 mainWindow가 같이 움직이는게 아닌 움직임이 필요한 mainWindow만 이동하도록 조건을 걺.
					//왼쪽으로 움직였다면 움직인 거리만큼 다음 mainWindow도 이동. 
					if(deltaX<0){
            document.getElementById(temp[(currMainWindow+1)%4]).style.transform = "translateX( calc( 100vw + " + deltaX + "px))";
            document.getElementById(temp[(currMainWindow+3)%4]).style.transform = "translateX( -100vw)";
          }
          //오른쪽으로 움직였다면 움직인 거리만큼 이전 mainWindow도 이동. 
					if(deltaX>0){
            document.getElementById(temp[(currMainWindow+3)%4]).style.transform = "translateX( calc( -100vw + " + deltaX + "px))";
            document.getElementById(temp[(currMainWindow+1)%4]).style.transform = "translateX( 100vw)";
          }
        }
				//x축으로 이동한 거리가 y축으로 이동한 거리의 1.2배 보다 작다면
        else {
					//가로 스크롤이 아닌 세로 스크롤이므로 터치 상태를 discard로 설정.
          setTouchState('discard');
        }
      }
    }
		//swipe 활성화 상태일 때
    if (touchState === 'true') {
			//필요 state의 touchEnd 참조.
      setTouchEnd({ coord: e.targetTouches[0], timeStamp: e.timeStamp });
			
			//위외 동일. 최적화를 위해 조건 탐색부분을 제외한 부분만 따로 빼냄.
      let deltaX = e.targetTouches[0].clientX - touchStart.coord.clientX;
      //위와 동일
      let temp = ["home", "explore", "asset", "user"];
      document.getElementById(temp[currMainWindow]).style.transform = "translateX(" + deltaX + "px)";
      if(deltaX<0){
        document.getElementById(temp[(currMainWindow+1)%4]).style.transform = "translateX( calc( 100vw + " + deltaX + "px))";
        document.getElementById(temp[(currMainWindow+3)%4]).style.transform = "translateX( -100vw)";
      }
      if(deltaX>0){
        document.getElementById(temp[(currMainWindow+3)%4]).style.transform = "translateX( calc( -100vw + " + deltaX + "px))";
        document.getElementById(temp[(currMainWindow+1)%4]).style.transform = "translateX( 100vw)";
      }
    }
  }

  function handleTouchEnd(e) {
    //필요 state의 touchStart, touchState, touchEnd, currMainWindow 참조
    //swipe시 mainWindow의 index를 늘리서나 줄일때 더해 줄 변수.
    let add = 0;
    //예외상황 방지 && swipe 비활성화 상태가 아닐때.
    if (touchEnd.timeStamp !== null && touchState !== 'discard') {
      //swipe 이동거리가 브라우저 가로의 40%보다 크거나 swipe 이동 거리가 swipe 이돈 시간/5보다 클때
      if ((Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX) > window.innerWidth / 2.5)
        || (Math.abs(touchStart.coord.clientX - touchEnd.coord.clientX)
        > (touchEnd.timeStamp - touchStart.timeStamp) / 5)) {
          //오른쪽으로 이동했을 때
          if (touchEnd.coord.clientX - touchStart.coord.clientX > 0) {
            //index - 1 
            // (index+3) %4를 하면 1이 줄어드는 효과와 같다.
            //단순하게 -1을 하면 index가 음수일때의 예외처리를 따로 해줘야하기 때문에 이런식으로 처리.
            add = 3;
          } 
          //왼쪽으로 이동했을 때
          else {
            //index +1
            //index 가 최대치여서 +1 되러 range를 벗어난다 해도 마지막어 %4 처리를 하기때문에 예외처리 필요없음.
            add = 1;
          }
      }
    }
    //swipe 입력 대기상태로 설정
    setTouchState('none');
    //touchEnd값 초기화
    setTouchEnd({ coord: null, timeStamp: null });
    //currMainWindow가 초기화 되지 않았을때의 예외처리 후 %4로 index range로 변환
    setCurrMainWindow(((currMainWindow === undefined ? 0 : currMainWindow) + add) % 4);
    //transition을 설정하여 남을 이동은 부드럽게 자동으로 전환.
    setMainWindowTransition(true);
    //변한 currMainWindow index에 맞게 mainWindow의 translateX 조정. 
    setMainWindowPosition();
  }

  function setIndex(index){
		//움직이기전 이동위치 잡기위해 trasition 비활성화
    setMainWindowTransition(false);
		//currMainWondow에 저장된 index로 element id값을 사용하기위한 임시 변수.
    let temp = ["home", "explore", "asset", "user"];
		//2칸 이동일 때
    if(Math.abs(currMainWindow-index)===2){
			//스킵 상태를 true로 설정
      setIsSkip(true);
			//이동할 페이지의 전 페이지, 해당페이지, 다음페이지 저장
      let nxtEl=[document.getElementById(temp[(index+3)%4]),document.getElementById(temp[index]),document.getElementById(temp[(index+1)%4])];
			//이동할 페이지는 현페이지의 대척점에 있기 때문에 display가 none으로 되있음.
      nxtEl[1].style.display="block";
			//오른쪽으로 이동할때. 2칸 이동할때라 3->0으로 가는 상황은 생각하지 않아도 된다.
      if(index>currMainWindow){
        nxtEl[0].style.transform="translateX(-100vw)";
        nxtEl[1].style.transform="translateX(100vw)";
        nxtEl[2].style.transform="translateX(100vw)";
      }
			//왼쪽으로 이동할때. 2칸 이동할때라 0->3으로 가는 상황은 생각하지 않아도 된다.
			else{
        nxtEl[0].style.transform="translateX(-100vw)";
        nxtEl[1].style.transform="translateX(-100vw)";
        nxtEl[2].style.transform="translateX(100vw)";
      }
    }
		//1칸 이동일때
		else{
      for(var i in [0,1,2,3]){
				//정렬상태가 꼬여있는경우가 있을 수 있어 현재 페이지와 이동할 페이지만 랜더링.
        if(i==currMainWindow||i==index)continue;
        document.getElementById(temp[i]).style.display="none";
      }
    }
		//transition이 비활성화 된 상태로 정렬하고 랜더링 되기 위해서는 다음단계는 다음틱에 실행해야하기때문에
		//setTimeout으로 5milliseconds 대기후 실행.
    setTimeout(()=>{
			////다시 transition을 활성화 시켜준다.
      setMainWindowTransition(true);
			//currMainWindow를 이동할 페이지로 설정.
      setCurrMainWindow(index);
    },5)
  }

  return (
    <div className="App">
      <div className="touchBlocker" style={{ display: touchBlock ? 'block' : 'none', opacity: touchBlock ? '0.4' : '0' }}></div>
      <header className="App-header">
        <div id='windowView'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div id="home" className='mainWindowContainer'>
            <Home className='mainWindow' auth={auth} currMainWindow={currMainWindow} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="explore" className='mainWindowContainer'>
            <Explore className='mainWindow' auth={auth} currMainWindow={currMainWindow} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="asset" className='mainWindowContainer'>
            <Asset className='mainWindow' auth={auth} currMainWindow={currMainWindow} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showClubPage={showClubPage} />
          </div>
          <div id="user" className='mainWindowContainer'>
            <User className='mainWindow' auth={auth} currMainWindow={currMainWindow} showSignupPage={showSignupPage} showSigninPage={showSigninPage} showEditProfilePage={showEditProfilePage} showBankAccountPage={showBankAccountPage} />
          </div>
        </div>
        <div className='mainIconContainer'>
          <MainIcon type='home' hl={iconState[0]} currMainWindow={currMainWindow} setIndex={setIndex} index={0} />
          <MainIcon type='explore' hl={iconState[1]} currMainWindow={currMainWindow} setIndex={setIndex} index={1} />
          <MainIcon type='asset' hl={iconState[2]} currMainWindow={currMainWindow} setIndex={setIndex} index={2} />
          <MainIcon type='user' hl={iconState[3]} currMainWindow={currMainWindow} setIndex={setIndex} index={3} />
        </div>
      </header>
      <StartPage startView={startView} />
      <Signin signinPage={signinPage} hideSigninPage={hideSigninPage} showSignupPage={showSignupPage} setAuth={setAuth} />
      <Signup signupPage={signupPage} hideSignupPage={hideSignupPage} showSigninPage={showSigninPage} />
      <Club auth={auth} clubPage={clubPage} hideClubPage={hideClubPage} showSigninPage={showSigninPage} />
      <EditProfile auth={auth} editProfilePage={editProfilePage} hideEditProfilePage={hideEditProfilePage} showEditProfilePage={showEditProfilePage} />
      <BankAccount auth={auth} bankAccountPage={bankAccountPage} hideBankAccountPage={hideBankAccountPage} showBankAccountPage={showBankAccountPage} />
    </div>
  );
}


export default App;
