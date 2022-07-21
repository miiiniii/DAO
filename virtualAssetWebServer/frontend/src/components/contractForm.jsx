import React, { useEffect } from 'react';
import {useState} from 'react'
import './contractForm.css';
import ContractModal from './contractModal';

export default function ContractForm(props){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var contractDate=year + "-" + month + "-" + day;

	const [showModal,setShowModal]=useState(false);
	const [sign,setSign]=useState(null);


	const openModal = () => {
		setShowModal(true);
	}

	const closeModal = () => {
	    setShowModal(false);
	}

	/*useEffect=(()=>{
		setArtItem()
		setREstateItem()
	})*/

	if (props.type === 'art' && props.viewContract === false){
		return(
			<div className='contractList'>
            <h1>계약서 작성</h1>
			<div className='contractContainer'>
				<div className="contractItem">
					    <li>상품명 :</li>
					    &nbsp;
					    <p>홍익사진</p>
				</div>
				<div className="contractItem">
					    <li>작가명 :</li>
					    &nbsp;
					    <p>홍길동</p>
				</div>
				<div className="contractItem">
					    <li>전시 장소 :</li>
					    &nbsp;
					    <p>국립현대미술관</p>
				</div>
				<div className="contractItem">
                	    <li>총 금액 :</li>
                		&nbsp;
                		<p>838,157,000</p>
                		&nbsp;
                		<p>원</p>
                </div>
				<div className="contractItem">
					<li>참여인원 :</li>
					&nbsp;
					<p>38</p>
					&nbsp;
					<p>명</p>
				</div>
				<div className="contractItem">
					<li>나의 지분 :</li>
					&nbsp;
					<p>254,000</p>
					&nbsp;
					<p>원</p>
				</div>
				<div className='contractItem'>
				    <li>계약 날짜 :</li>
				    &nbsp;
				    <input type='date' value={contractDate} width='30px'/>
				</div>
				<div className='signContainer'>
					<div className="signBoxWrap">
						<input type="text" name="sign" value={sign} placeholder="서명" onChange={e => setSign(e.target.value)}/>
					</div>
				</div>
				<div className="contractItem">
                    <p>계약서 전문 </p>
                    &nbsp;
                    <p className="additionalBtn" onClick={openModal}> 보기</p>
					<ContractModal showModal={showModal} closeModal={closeModal}></ContractModal>
                </div>
				<div className='sendBtnContainer'>
                	<button className='sendBtn' onClick={props.hideWriteContract}>제출</button>
                </div>
			</div>
		</div>
		)
	}
	else if(props.type === 'rEstate' && props.viewContract === false){
		return(
			<div className='contractList'>
		<h1>계약서 작성</h1>
		<div className='contractContainer'>
			<div className="contractItem">
					<li>상품명 :</li>
					&nbsp;
					<p>홍익상가</p>
			</div>
			<div className="contractListItem">
					<li>부동산 위치 :</li>
					&nbsp;
					<p>서울특별시 마포구 와우산로 94</p>
			</div>
			<div className="contractItem">
					<li>부동산 용도 :</li>
					&nbsp;
					<p>임대</p>
			</div>
			<div className="contractListItem">
					<li>공인중개사 정보 :</li>
					&nbsp;
					<div className='contractItemList'>
						<p>이름 : 홍길동</p>
						<p>연락처 : 010-1234-5678</p>
						<p>주소 : 서울특별시 마포구 와우산로 108</p>
					</div>
			</div>
			<div className="contractItem">
					<li>총 금액 :</li>
					&nbsp;
					<p>838,157,000</p>
					&nbsp;
					<p>원</p>
			</div>
			<div className="contractItem">
				<li>참여인원 :</li>
				&nbsp;
				<p>38</p>
				&nbsp;
				<p>명</p>
			</div>
			<div className="contractItem">
				<li>나의 지분 :</li>
				&nbsp;
				<p>254,000</p>
				&nbsp;
				<p>원</p>
			</div>
			<div className='contractItem'>
				<li>계약 날짜 :</li>
				&nbsp;
				<input type='date' value={contractDate} width='30px'/>
			</div>
			<div className='signContainer'>
				<div className="signBoxWrap">
					<input type="text" name="sign" value={sign} placeholder="서명" onChange={e => setSign(e.target.value)}/>
				</div>
			</div>
			<div className="contractItem">
				<p>계약서 전문 </p>
				&nbsp;
				<p className="additionalBtn" onClick={openModal}> 보기</p>
				<ContractModal showModal={showModal} closeModal={closeModal}></ContractModal>
			</div>
			<div className='sendBtnContainer'>
				<button className='sendBtn' onClick={props.hideWriteContract}>제출</button>
			</div>
		</div>
	</div>
	)

	}
	else if ((props.type === 'art' || props.type === 'rEstate')&&props.viewContract=== true){
		return(
			<div className='contractList'>
			<h1>계약서 작성</h1>
			<div className='contractContainer'>
				<div className="contractItem">
						<li>상품명 :</li>
						&nbsp;
						<p>홍익상가</p>
				</div>
				<div className="contractListItem">
						<li>부동산 위치 :</li>
						&nbsp;
						<p>서울특별시 마포구 와우산로 94</p>
				</div>
				<div className="contractItem">
						<li>부동산 용도 :</li>
						&nbsp;
						<p>임대</p>
				</div>
				<div className="contractListItem">
						<li>공인중개사 정보 :</li>
						&nbsp;
						<div className='contractItemList'>
							<p>이름 : 홍길동</p>
							<p>연락처 : 010-1234-5678</p>
							<p>주소 : 서울특별시 마포구 와우산로 108</p>
						</div>
				</div>
				<div className="contractItem">
						<li>총 금액 :</li>
						&nbsp;
						<p>838,157,000</p>
						&nbsp;
						<p>원</p>
				</div>
				<div className="contractItem">
					<li>참여인원 :</li>
					&nbsp;
					<p>38</p>
					&nbsp;
					<p>명</p>
				</div>
				<div className="contractItem">
					<li>나의 지분 :</li>
					&nbsp;
					<p>254,000</p>
					&nbsp;
					<p>원</p>
				</div>
				<div className='contractItem'>
					<li>계약 날짜 :</li>
					&nbsp;
					<input type='date' value={contractDate} width='30px'/>
				</div>
				<div className="contractItem">
						<li>서명 :</li>
						&nbsp;
						<p>{sign}</p>
				</div>
				<div className="contractItem">
					<p>계약서 전문 </p>
					&nbsp;
					<p className="additionalBtn" onClick={openModal}> 보기</p>
					<ContractModal showModal={showModal} closeModal={closeModal}></ContractModal>
				</div>
			</div>
		</div>
		)
	}
}

