import { useEffect, useState } from "react";
import './editProfile.css';

export default function EditProfile(props) {

	const authSubmit=(e)=>{

	}

	return (
		<div className={'editProfileBackground'+(props.editProfilePage==='hide'?'editProfileHide':'')} style={{zIndex:10002}}>
			<nav>
				<ul className="nav-container">
					<li className="nav-item" ><span onClick={props.hideEditProfilePage}><i className="fa fa-arrow-left"></i></span></li>
					<li className="nav-item"><p>개인정보</p></li>
				</ul>
			</nav>
			<div className={props.className}>
				<div className="itemName">
					<p>아이디</p>
				</div>
				<div className='valueBanner'>
					<p className='fixedValue'>김이름</p>
				</div>	
				<div className="itemName">
					<p>비밀번호 변경</p>
				</div>
				<div className='valueBanner'>
					<div className="editValueWrap">
						<input type="password" name="id" placeholder="현재 비밀번호"/>
					</div>	
				</div>
				<div className='valueBanner'>
					<div className="editValueWrap">
						<input type="password" name="id" placeholder="새로운 비밀번호"/>
					</div>	
				</div>
				<div className='valueBanner'>
					<div className="editValueWrap">
						<input type="password" name="id" placeholder="새로운 비밀번호 확인"/>
					</div>	
				</div>
				<div className="itemName">
					<p>전화번호</p>
				</div>
				<div className='valueBanner'>
					<p className='fixedValue'>01012345678</p>
				</div>	
				<div className="itemName">
					<p>이메일</p>
				</div>
				<div className='valueBanner'>
					<div className="editValueWrap">
						<input type="text" name="email" placeholder="example@mail.com"/>
					</div>	
				</div>
			</div>
			<button className='saveBtn' onClick={props.hideEditProfilePage}>저장</button>
		</div>
	)
}

