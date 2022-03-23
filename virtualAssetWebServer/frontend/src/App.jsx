
import './App.css';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MainIcon from "./components/mainIcon.jsx";
import Home from "./components/home.jsx";
import Explore from "./components/explore.jsx";

import customAxios from './scripts/customAxios';



/*※※※※※※※※※※※  새로운 환경이라면 npm i swiper@8.0.7 필수  ※※※※※※※※※※ */


function App() {
  const [auth,setAuth] =useState();

  //현 스와이퍼 state
  let [swiper,setSwiper]=useState();

  //로그인 검사
  useEffect(
    () => {
      customAxios('/auth', (data) => {
        setAuth(data);
      });
    }, []
  );


  //현 아이콘 상태 state
  let [iconState, setIconState]=useState([true, false, false, false]);
  //아이콘 상태 변경 메소드
  function changeIcon(idx){
    let temp=[false, false, false, false];
    temp[idx]=true;
    setIconState(temp);
  }

  return (
    <div className="App">
      <header className="App-header">
          <Swiper 
            id='mainWindowContainer'

            //한페이지에 슬라이드하나
            slidesPerView={1}
            //슬라이드 사이 간격
            spaceBetween={20}
            //끝단으로 가면 반대편으로 슬와이프 가능
            loop={true}
            //스와이프시 이벤트로 아이콘 상태 변경
            onSlideChange={(sw)=>(
              setSwiper(sw),
              changeIcon((sw.realIndex))
              )}
            >
            <SwiperSlide id="homeWindow">
              <Home className='mainWindow' auth={auth} sw={swiper}/>
            </SwiperSlide>
            <SwiperSlide id="exploreWindow">
              <Explore className='mainWindow' auth={auth} sw={swiper}></Explore>
            </SwiperSlide>
            <SwiperSlide id="assetWindow">
              <div className='mainWindow'></div>
            </SwiperSlide>
            <SwiperSlide id="userWindow">
              <div className='mainWindow'></div>
            </SwiperSlide>
          </Swiper>
        <div className='mainIconContainer'>
          <MainIcon type='home' hl={iconState[0]} sw={swiper} index={0}/>
          <MainIcon type='explore' hl={iconState[1]} sw={swiper} index={1}/>
          <MainIcon type='asset' hl={iconState[2]} sw={swiper} index={2}/>
          <MainIcon type='user' hl={iconState[3]} sw={swiper} index={3}/>
        </div>
      </header>
    </div>
  );
}


export default App;
