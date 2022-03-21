
import './App.css';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";


import customAxios from './customAxios';
import Asset_blue from './Icons/Asset_blue.png';
import Asset_white from './Icons/Asset_white.png';
import Home_blue from './Icons/Home_blue.png';
import Home_white from './Icons/Home_white.png';
import Explore_blue from './Icons/Explore_blue.png';
import Explore_white from './Icons/Explore_white.png';
import User_blue from './Icons/User_blue.png';
import User_white from './Icons/User_white.png';

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


  let [swiper,setSwiper]=useState();
  let [iconState, setIconState]=useState([true, false, false, false]);
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
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            onSwiper={(sw)=>(setSwiper(sw))}
            onSlideChange={()=>(swiper!=undefined?changeIcon((swiper.activeIndex+3)%4+1):console.log())}
            >
            <SwiperSlide id="homeWindow">
              <div className='mainWindow'></div>
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

function MainIcon(props){
  var blue;
  var white;
  switch (props.type){
    case 'home':
      blue=Home_blue;
      white=Home_white;
      break;
    case 'explore':
      blue=Explore_blue;
      white=Explore_white;
      break;
    case 'asset':
      blue=Asset_blue;
      white=Asset_white;
      break;
    case 'user':
      blue=User_blue;
      white=User_white;
      break;
  }
  var style='icon'+(props.hl?' highLight':'');
  return(
    <span id={props.type+'Button'} className='mainIcon'>
      <img className={style} src={white}/>
      <img id='hl' className={'opz '+style} src={blue}/>
    </span>
  )
}


export default App;
