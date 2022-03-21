import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "./home.css";

export default function Home(props){
    
    return(
        <div className={props.className}>
            <p className='topCmt'>로그아웃 상태입니다.</p>
            <button className='login_btn'>로그인</button>
            <p className='botCmt'>지금 회원가입하고<br/>그룹 투자를 시작 해 보세요.</p>
            <p className='signinBtnWrapper'><span className='signinBtn'>회원가입</span></p>
        </div>
    );
}