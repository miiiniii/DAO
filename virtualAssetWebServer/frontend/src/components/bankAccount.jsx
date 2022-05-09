import React, { useEffect, useState } from "react";
import customAxios from "../scripts/customAxios";
import Logoff from "./logoff";
import LoadingSpinner from "./loadingSpinner";
import './bankAccount.css';

export default function BankAccount(props) {

	const [isLoaded, setIsLoaded] = useState(false);
     const [bankAccounts, setBankAccounts] = useState([]);
     const [bankAccountDisplay, setBankAccountDisplay] = useState();

     useEffect(() => {
		 if(props.bankAccountPage !== 'hide'){
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
	 }
});

		  if (props.auth !== undefined && props.auth.code === 100) {
			if(isLoaded){
				console.log(props);
			return <BankAccountLogon
				className={props.className}
				bankName={props.bankName}
				accountNumber={props.accountNumber}
				bankAccounts={bankAccountDisplay}
				auth={props.auth}
				bankAccountPage={props.bankAccountPage}
			/>;
			}
			return <div className={props.className}><LoadingSpinner></LoadingSpinner></div>
	   }
	   else {
			return <Logoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage} />;
	   }
	}

	function BankAccountLogon(props) {
		console.log(props);
	return (
		<div className={'bankAccountBackground'+(props.bankAccountPage==='hide'?' bankAccountHide':'')} style={{zIndex:10002}}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideBankAccountPage}><i className="fa fa-arrow-left"></i></span></li>
					<li className="nav-item"><p>결제</p></li>
				</ul>
			</nav>
			<div className={props.bankAccounts}>
				<div className="bankAccountListInfo">등록된 계좌목록</div>
					{props.bankAccounts.map((c, i) => (
                              <div className="accountInfoBanner" key={c.name + i}>
                                   <p className="bankName">{c.bankName}</p>
                                   <p className="accountNumber">{c.accountNumber}</p>
                              </div>
                    ))}
			</div>
			<button className='addAccountBtn' onClick={props.hideBankAccountPage}>계좌 등록</button>
		</div>
	)
}

