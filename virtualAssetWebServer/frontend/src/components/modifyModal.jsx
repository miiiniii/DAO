import React from 'react';
import "./modifyModal.css";


export default function ModifyModal(props){
    if (props.type === 'art'){
        return(
           <div>
               {props.showModModal ? (
                   <div className='openModal modal'>
                       <section>
                            <header>
                               <button className="close" onClick={props.closeModModal}>
                                 &times;
                               </button>
                            </header>
							<div className='mContractContainer'>
								<div className="mContractItem">
										<li>상품명 :</li>
										&nbsp;
										<input type="text" name="itemName"  /*onChange={}*//>
								</div>
								<div className="mContractItem">
										<li>작가명 :</li>
										&nbsp;
										<input type="text" name="writterName"  /*onChange={}*//>
								</div>
								<div className="mContractItem">
										<li>전시 장소 :</li>
										&nbsp;
										<input type="text" name="aPlace" /*onChange={}*//>
								</div>
								<div className="mContractItem">
										<li>총 금액(원) :</li>
										&nbsp;
										<input type="text" name="totPrice"  /*onChange={}*//>
								</div>
								<div className="mContractItem">
									<li>참여인원(명) :</li>
									&nbsp;
									<input type="text" name="nParticipants"  /*onChange={}*//>
								</div>
								<div className="mContractItem">
									<li>나의 지분(원) :</li>
									&nbsp;
									<input type="text" name="share"  /*onChange={}*//>
								</div>
								<div className='mContractItem'>
									<li>계약 날짜 :</li>
									&nbsp;
									<input type='date' value={props.contractDate} width='30px'/>
								</div>
								<div className='mSignContainer'>
									<div className="mSignBoxWrap">
										<input type="text" name="sign" value={props.sign} placeholder="서명" onChange={e => props.setSign(e.target.value)}/>
									</div>
								</div>
								<div className='mSendBtnContainer'>
									<button className='mSendBtn' onClick={props.closeModModal}>제출</button>
								</div>
						    </div>
                       </section>
                   </div>)
               : (<>
                  </>)
               }
           </div>
        )
    }
    else if (props.type === 'rEstate'){
        return(
            <div>
                {props.showModModal ? (
                    <div className='openModal modal'>
                        <section>
                            <header>
                            	<button className="close" onClick={props.closeModModal}>
                                &times;
                                </button>
                            </header>
							<div className='mContractContainer'>
								<div className="mContractItem">
										<li>상품명 :</li>
										&nbsp;
										<input type="text" name="itemName" /*onChange={}*//>
								</div>
								<div className="mContractItem">
										<li>부동산 위치 :</li>
										&nbsp;
										<input type="text" name="ePlace"/*onChange={}*//>
								</div>
								<div className="mContractItem">
										<li>부동산 용도 :</li>
										&nbsp;
										<input type="text" name="usage"  /*onChange={}*//>
								</div>
								<div className="contractListItem">
										<li>공인중개사 정보</li>
										&nbsp;
										<div className='contractItemList'>
											<p>이름 : </p>
											&nbsp;
											<input type="text" name="usage"  /*onChange={}*//>
											<p>연락처 : </p>
											&nbsp;
											<input type="text" name="usage"  /*onChange={}*//>
											<p>주소 : </p>
											&nbsp;
											<input type="text" name="usage"  /*onChange={}*//>
										</div>
								</div>
								<div className="mContractItem">
										<li>총 금액(원) :</li>
										&nbsp;
										<input type="text" name="totPrice"  /*onChange={}*//>
								</div>
								<div className="mContractItem">
									<li>참여인원(명) :</li>
									&nbsp;
									<input type="text" name="nParticipants"  /*onChange={}*//>

								</div>
								<div className="mContractItem">
									<li>나의 지분(원) :</li>
									&nbsp;
									<input type="text" name="share"  /*onChange={}*//>

								</div>
								<div className='mContractItem'>
									<li>계약 날짜 :</li>
									&nbsp;
									<input type='date' value={props.contractDate} width='30px'/>
								</div>
								<div className='mSignContainer'>
									<div className="mSignBoxWrap">
										<input type="text" name="sign" value={props.sign} placeholder="서명" onChange={e => props.setSign(e.target.value)}/>
									</div>
								</div>
								<div className='mSendBtnContainer'>
									<button className='mSendBtn' onClick={props.closeModModal}>제출</button>
								</div>
							</div>
                        </section>
                    </div>)
                : (<>
                </>)
            }
            </div>
        )
    }
}