import React, { useEffect, useState } from "react";
import customAxios from "../scripts/customAxios";
import Logoff from "./logoff";
import "./home.css";
import LoadingSpinner from "./loadingSpinner";

import No_contents_blue from "../Icons/No_contents_blue.png";
import './bankAccount.css';

export default function BankAccount(props) {

	const [isLoaded, setIsLoaded] = useState(false);
     const [bankAccounts, setBankAccounts] = useState([]);
     const [bankAccountDisplay, setBankAccountDisplay] = useState();

     useEffect(() => { 
		customAxios('/bankAccount', (data) => {
			if (JSON.stringify(data) === JSON.stringify(bankAccounts)) {
				setIsLoaded(true);
				return;
			}
			if (data === '') setBankAccounts(null);
			else setBankAccounts(data);
			console.log('bankAccounts');
			console.log(data);
			setIsLoaded(true);
		});
		   setBankAccountDisplay(bankAccounts);
});

		  if (props.auth !== undefined && props.auth.code === 100) {
			if(isLoaded){
				return <BankAccountLogon
				bankAccountPage={props.bankAccountPage}
					className={props.className}
					bankName={props.bankName}
					accountNumber={props.accountNumber}
					bankAccounts={bankAccountDisplay}
					auth={props.auth}
					hideBankAccountPage={props.hideBankAccountPage}
				/>;
				}
			return <div className={props.className}><LoadingSpinner></LoadingSpinner></div>
		}	

	function BankAccountLogon(props) {
	//연결된 계좌 없을때
	if (props.bankAccounts === null) {
		return (
			<div className={'bankAccountBackground'+(props.bankAccountPage==='hide'?'bankAccountHide':'')} style={{zIndex:10002}}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideBankAccountPage}><i className="fa fa-arrow-left"></i></span></li>
					<li className="nav-item"><p>결제</p></li>
				</ul>
			</nav>
			<img id="no_contents" src={No_contents_blue} alt="img_no_contents" />
			<p className='no_accounts'>안녕하세요, {props.auth.name}님!<br />
			아직 연결된 계좌가 없어요.</p>
			<p className='no_accounts' >지금 계좌를 연결하고 투자를 시작해보세요.<br /></p>
			<button className='addAccountBtn' onClick={props.hideBankAccountPage}>계좌 등록</button>
			</div>
		);
	}
	return (
		<div className={'bankAccountBackground'+(props.bankAccountPage==='hide'?'bankAccountHide':'')} style={{zIndex:10002}}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideBankAccountPage}><i className="fa fa-arrow-left"></i></span></li>
					<li className="nav-item"><p>결제</p></li>
				</ul>
			</nav>
			<div className={props.bankAccounts}>
			<div className={props.className}>
	 			<div className="bankAccountListInfo">등록된 계좌목록</div>
	 				<div className="myAccountList">
	 					{props.bankAccounts.map((accounts, i) => (
							<div className="accountInfoBanner" key={accounts.bankName + i}>
								<p className="bankName">{accounts.bankName}</p>
								<p className="accountNumber">{accounts.accountNumber}</p>
							</div>
						))}
					</div>
					
				</div>
			</div>
		</div>
	);}
}

