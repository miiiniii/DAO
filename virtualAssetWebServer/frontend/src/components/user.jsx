import React, {useEffect, useState} from 'react';
import Logoff from "./logoff";
import "./home.css";
import "./user.css";

export default function User(props){

    const onLogout=()=>{
        props.setAuth(undefined);
        props.showSigninPage();
    }

   if(props.auth!==undefined&&props.auth.code===1000){
         return <UserLogon auth={props.auth} onLogout={onLogout} className={props.className}  showEditProfilePage={props.showEditProfilePage} showBankAccountPage={props.showBankAccountPage}/>;
    }
    else{
         return <UserLogoff onLogout={onLogout} className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage}/>;
    }
    
}

function UserLogoff(props) {
    return (
        <div className={props.className}>
            <br/>
            <br/>
            <h2>설정</h2>
            <br/>
            <br/>  
            <div className='userAccountBanner'>
                <div className='userAccountWrapper'>
                    <p className='userName'>비회원<br/></p>
                    <p className='userIDLogoff'>#로그인 후 이용하세요<br/></p>
                </div>
                <hr className='divHr'/>
                <p className='mainCmt'>개인정보</p>
                <p className='subCmtLogoff'>개인정보 조회ㆍ변경</p>
                <p className='signinTextWrapper'>
                    <span className='signinText' onClick={props.onLogout}>로그인</span>
                </p>
            </div>
            <div className='userMenuBanner'>
                <p className='mainCmt'>결제</p>
                <p className='subCmtLogoff'>등록된 계좌 조회ㆍ계좌 등록</p>
                <p className='mainCmt'>거래</p>
                <p className='subCmtLogoff'>거래 목록 조회</p>
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


function UserLogon(props) {
    return (
        <div className={props.className}>
            <br/>
            <br/>
            <h2>설정</h2>
            <br/>
            <br/>  
            <div className='userAccountBanner'>
                <div className='userAccountWrapper'>
                    <p className='userName'>{props.auth.userInfo.nick}<br/></p>
                    <p className='userID'>#{props.auth.userInfo.id}<br/></p>
                </div>
                <hr className='divHr'/>
                <p className='mainCmt'>개인정보</p>
                <p className='subCmt' onClick={props.showEditProfilePage} auth={props.auth}>개인정보 조회ㆍ변경</p>
                <p className='signoutBtnWrapper'>
                    <span className='signoutBtn' onClick={props.onLogout}>로그아웃</span>
                </p>
            </div>
            <div className='userMenuBanner'>
                <p className='mainCmt'>결제</p>
                <p className='subCmt' onClick={props.showBankAccountPage} auth={props.auth}>등록된 계좌 조회ㆍ계좌 등록</p>
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
