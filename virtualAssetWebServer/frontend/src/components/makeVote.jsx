import { useEffect, useState } from "react";
import React from 'react';
import SocketJsClient from "react-stomp";
import TEST_IP from "../scripts/setTestIp";
import { IconPlus } from "./cssIcons";
import ClubChat from "./clubChats";
import chatAPI from "../scripts/chatAxios";
import customAxiosData from "../scripts/customAxiosData";
import { useRef } from "react";
import LoadingSpinner from "./loadingSpinner";
import "react-contexify/dist/ReactContexify.css";
import "./makeVote.css";

const MakeVotepvoteDesc = (props) => {
    const [chatFocus, setChatFocus] = useState(false);
    
    const onClickaddSelection=()=>{
        let tmp=document.getElementById("newSelectionName")
        console.log(tmp)
        setvoteSelectionn(voteSelectionn.concat({name:tmp.value,id:voteSelectionn.length}))
    }
   
     //onMakeVoteClick은 입력내용 전달해주는 함수
        const onMakeVoteClick=(e)=>{  
            let data={ voteName: voteName, voteDesc: voteDesc, voteSelectionn: voteSelectionn}
        
            chatAPI.sendMessage(
                props.auth.userInfo.id,
                "vote",
                props.selectedChannel.id,
                JSON.stringify(data),
                (res) => {
                    console.log("sent", res);
                }
            );
            console.log(data);
        }

      
      const [voteName,setvoteName]=useState("")
      const [voteDesc,setvoteDesc]=useState("")
      const [voteSelectionn,setvoteSelectionn]=useState([])

      const onChangeVoteNameInput = e => {
        console.log(e)
        setvoteName(e.target.value)
      }

      const onChangeVoteDescInput=e=>{ 
        console.log(e)
        setvoteDesc(e.target.value)
      }
        

      return (
        <div className="voteAll clubSettingPage">
            <section className="voteInputWrapper">
                <div className="voteInputItemWrapper">
                    <p><b>투표 제목</b></p>
                    <div className="voteNameIn">
                        <input id="voteNameInput"
                            type="text"
                            name="voteName"
                            placeholder="제목을 입력하세요"
                            onChange={onChangeVoteNameInput}/>
                    </div>
                </div>
                <div className="voteInputItemWrapper">
                    <p><b>투표 설명</b></p>
                    <div className="voteDescIn">
                        <input id="voteNameDesc"
                            type="text"
                            name="voteDesc"
                            placeholder="설명을 입력하세요"
                            onChange={onChangeVoteDescInput}/>
                    </div>
                </div>

                <div className="optionItemWrapper">
                    <p><b>항목</b></p>
                    <div className="optionInBtn">
                        <div className="optionIn">
                             

                            <input id="newSelectionName"
                                type="text"    
                                placeholder="새 항목 입력">
                            </input>
                        </div>
                        <div className="addSelectionBtn">
                            <button id="addSelectionBtn" onClick={onClickaddSelection}>추가</button>
                        </div>
                        
                </div>
                <p>
                   
                <div className="voteSelectionn">
                                
                                {voteSelectionn.map((c,i)=>{
                                  return(
                                     <div className="AddedBtn">
                                     <input
                                     class="radioBtn"
                                     id={"voteSelectionn"+i}
                                     type="radio"
                                     name="voteSelectionn"
                                    value={c.id}/><label htmlFor={"voteSelectionn"+i}> {c.name}</label></div>)
                                    /*라디오 버튼에서, 텍스트를 눌렀을때 같이 선택되게 하려면 id속성과 label for속성을 같게 설정. */
                                 })
                                }           
                                </div>
                </p>
                

                <div className="CreateVoteBtn">
                    <span style={{color: "#ffffff"}} onClick={onMakeVoteClick}>투표 생성</span>
                </div>
            </div>

            </section>

            {/* <div className="voteSelectionn">
                {voteSelectionn.map((c,i)=>{
                    return(
                        <div>
                            <input
                            id={"voteSelectionn"+i}
                            type="radio"
                            name="voteSelectionn"
                            value={c.id}/>
                            <label htmlFor={"voteSelectionn"+i}>{c.name}</label>
                        </div>)
                    })
                }
            </div> */}

            
            
        </div>
      );
  };
  
  export default MakeVotepvoteDesc;


  // +버튼임     <div className="circleBtn"><IconPlus size='100%' /></div> <button className='vote_btn' onClick={props.showSigninPage}>로그인</button>   

