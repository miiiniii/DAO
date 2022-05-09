import React, {useEffect, useState} from 'react';
import customAxios from "../scripts/customAxios";
import Logoff from "./logoff";
import LoadingSpinner from "./loadingSpinner";
import './bankAccount.css';
import "./user.css";

export default function User(props){
	const [isLoaded, setIsLoaded] = useState(false);
     const [bankAccounts, setBankAccounts] = useState([]);
     const [bankAccountDisplay, setBankAccountDisplay] = useState();

     useEffect(() => {
	if (props.sw !== undefined && props.sw.realIndex === 3){
		customAxios('/bankAccount', (data) => {
			if (JSON.stringify(data) === JSON.stringify(bankAccounts)) {
					setIsLoaded(true);
					return;
			}
			if (data === "") setBankAccounts(null);
			else setBankAccounts(data);
			console.log('bankAccounts');
			console.log(data);
            console.log(props);
			setIsLoaded(true);
		});
	}
},[props.sw === undefined ? false : props.sw.realIndex]);

    if(props.auth!==undefined&&props.auth.code===100){
         return <UserLogon auth={props.auth} className={props.className} showSigninPage={props.showSigninPage} showEditProfilePage={props.showEditProfilePage} showBankAccountPage={props.showBankAccountPage}/>;
    }
    else{
         return <Logoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage}/>;
    }
    
}


function UserLogon(props) {
    return (
        <div className={props.className}>
            <div className='userAccountBanner'>
                <div className='userAccountWrapper'>
                    <p className='userName'>{props.auth.name}<br/></p>
                    <p className='userID'>#{props.auth.id}<br/></p>
                </div>
                <hr className='divHr'/>
                <p className='mainCmt'>개인정보</p>
                <p className='subCmt' onClick={props.showEditProfilePage} auth={props.auth}>개인정보 조회ㆍ변경</p>
                <p className='signoutBtnWrapper'>
                    <span className='signoutBtn' onClick={props.showSigninPage}>로그아웃</span>
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
