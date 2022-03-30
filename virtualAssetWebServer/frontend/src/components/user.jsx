import React, {useEffect, useState} from 'react';
import "./user.css";

export default function User(props){
    if(props.auth!==undefined&&props.auth.code===100){
         return <UserLogon auth={props.auth} className={props.className}/>;
    }
    else{
         return <UserLogoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage}/>;
    }
    
}

function UserLogoff(props){
 return(
     <div className={props.className}>
         <button className='login_btn' onClick={props.showSigninPage}>로그인</button>
         <p className='userTopCmt'>로그아웃 상태입니다.<br/> 로그인하고 그룹 투자를 시작 해 보세요.</p>
         <p className='userBotCmt'>아직 회원이 아니라면?</p>
         <p className='signinBtnWrapper'><span className='signinBtn' onClick={props.showSignupPage}>회원가입</span></p>
     </div>
 );
}

function UserLogon(props) {
    return (
        <div className={props.className}>
            <div className='userAccountBanner'>
                <div className='userAccountWrapper'>
                    <p className='userName'>User_Name<br/></p>
                    <p className='userID'>#0294<br/></p>
                    {/* <p className='userName'>{props.auth.name}<br/></p> */}
                    {/* <p className='userID'>#{props.auth.id}<br/></p> */}
                </div>
                <hr className='divHr'/>
                <p className='mainCmt'>개인정보</p>
                <p className='subCmt'>개인정보 조회ㆍ변경</p>
                <p className='signoutBtnWrapper'>
                    <span className='signoutBtn' onClick={props.showSigninPage}>로그아웃</span>
                </p>
            </div>
            <div className='userMenuBanner'>
                <p className='mainCmt'>결제</p>
                <p className='subCmt'>등록된 계좌 조회ㆍ계좌 등록</p>
                <p className='mainCmt'>거래</p>
                <p className='subCmt'>거래 목록 조회</p>
            </div>
            <div className='userMenuBanner'>
                <p className='mainCmt'>보기</p>
                <p className='subCmt'>테마ㆍ폰트</p>
                <p className='mainCmt'>알림</p>
                <p className='subCmt'>알림 설정ㆍ알림 대상</p>
            </div>
            <div className='userMenuBanner'>
                <p className='mainCmt'>버전</p>
                <p className='subCmt'>1.1_stable</p>
                <p className='mainCmt'>지원</p>
                <p className='subCmt'>고객센터ㆍ도움말</p>
            </div>
        </div>
    );
}
