
import './App.css';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MainIcon from "./pages/mainIcon.js";
import Home from "./pages/home.js";

import customAxios from './scripts/customAxios';



/*※※※※※※※※※※※  새로운 환경이라면 npm i swiper@8.0.7 필수  ※※※※※※※※※※ */


function App() {
  /*const [ip, setIp]=useState('');

  function callback(data){
    setIp(data);
  }
  useEffect(
    ()=>{
      customAxios('/ip',callback);
    },[]
    );
    
    const [msg, setMsg]= useState([]);
    function msgf(data){
      setMsg(data);
    }
    useEffect(()=>{
      customAxios('/hello', msgf);
    },[]);
    
    */

//현 스와이퍼 state
  let [swiper,setSwiper]=useState();
  //현 아이콘 상태 state
  let [iconState, setIconState]=useState([true, false, false, false]);
  //아이콘 상태 변경 메소드
  function changeIcon(idx){
    let temp=[false, false, false, false];
    temp[idx-1]=true;
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
            //스와이퍼 init시 개체를 state에 저장
            onSwiper={(sw)=>(setSwiper(sw))}
            //스와이프시 이벤트로 아이콘 상태 변경
            //최초실행시 onslidechange가 먼저 발생해 swiper가 undefined 오류 발생. 예외처리
            onSlideChange={()=>(swiper!=undefined?changeIcon((swiper.activeIndex+3)%4+1):console.log('swiper is undefined.'))}
            >
            <SwiperSlide id="homeWindow">
              <Home className='mainWindow'></Home>
            </SwiperSlide>
            <SwiperSlide id="exploreWindow">
              <div className='mainWindow'></div>
            </SwiperSlide>
            <SwiperSlide id="assetWindow">
              <div className='mainWindow'></div>
            </SwiperSlide>
            <SwiperSlide id="userWindow">
              <div className='mainWindow'></div>
            </SwiperSlide>
          </Swiper>
        <div className='mainIconContainer'>
          <MainIcon type='home' hl={iconState[0]} />
          <MainIcon type='explore' hl={iconState[1]}/>
          <MainIcon type='asset' hl={iconState[2]}/>
          <MainIcon type='user' hl={iconState[3]}/>
        </div>
      </header>
    </div>
  );
}




export default App;
