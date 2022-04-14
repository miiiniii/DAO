import { useEffect, useState } from "react";
import './bankAccount.css';

export default function BankAccount(props) {

	const authSubmit=(e)=>{

	}

	return (
		<div className={'bankAccountBackground'+(props.bankAccountPage==='hide'?' signinPageHide':'')} style={{zIndex:10002}}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideBankAccountPage}><i className="fa fa-arrow-left"></i></span></li>
					<li className="nav-item"><p>결제</p></li>
				</ul>
			</nav>
			<div className={props.className}>
				</div>
			<button className='saveBtn' onClick={props.showSigninPage}>계좌 등록</button>
		</div>
	)
}

