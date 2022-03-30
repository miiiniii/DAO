import React, {useEffect, useState} from 'react';
import customAxios from '../scripts/customAxios';
import "./home.css";

import No_contents_blue from "../Icons/No_contents_blue.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";
import Search_white from "../Icons/Search_white.png";


export default function Home(props){
    const [clubs,setClubs] =useState(null);
    const [clubsDisplay,setClubsDisplay] =useState(null);
    const [searchState, setSearchState]=useState({extend: false, class: "searchFloat",inputClass:"searchInput hide", searchValue:""});
    const [searchInput, setSearchInput]=useState();
    const inputChange=(v)=>{setSearchInput(v.target.value)};

    useEffect(() => {
        if (props.sw !== undefined && props.sw.realIndex === 0) {
            customAxios('/myClubBanners', (data) => {
                if (JSON.stringify(data) === JSON.stringify(clubs)) return;
                if (data === "") setClubs(null);
                else setClubs(data);
            });
        }
    }, [props.sw === undefined ? false : props.sw.realIndex]);

    useEffect(()=>{
        if(searchInput===undefined||searchInput===null||searchInput===""){
            setClubsDisplay(clubs);
            return;
        }

        
        
        setClubsDisplay(Object.values(clubs).filter((oc) => {
            return (oc.name === undefined || oc.name === null)?false:oc.name.includes(searchInput)
        }).map(v => {
            const t={...v};
            t.name = <span>
                {v.name.slice(0, v.name.indexOf(searchInput))}
                <span className='sh'>
                    {v.name.slice(v.name.indexOf(searchInput), v.name.indexOf(searchInput) + searchInput.length)}
                </span>
                {v.name.slice(v.name.indexOf(searchInput) + searchInput.length)}
            </span>;
            return t;
        }));
    },[searchInput, clubs]);


    function searchCilck(){
        if(!searchState.extend)setSearchState({extend: true, class: "searchFloat extend",inputClass:"searchInput", searchValue:""})
        else setSearchState({extend: false, class: "searchFloat",inputClass:"searchInput hide", searchValue:""});
    }






    if(props.auth!==undefined&&props.auth.code===100){
        return  <HomeLogon 
                    className={props.className} 
                    clubs={clubsDisplay} 
                    auth={props.auth} 
                    searchCilck={searchCilck} 
                    searchState={searchState}
                    inputChange={inputChange}
                />;
    }else{
        return <HomeLogoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage}/>;
    }
    
}

function HomeLogoff(props){
 return(
     <div className={props.className}>
         <p className='topCmt'>로그아웃 상태입니다.</p>
         <button className='login_btn' onClick={props.showSigninPage}>로그인</button>
         <p className='botCmt'>지금 회원가입하고<br />그룹 투자를 시작 해 보세요.</p>
         <p className='signinBtnWrapper'><span className='signinBtn' onClick={props.showSignupPage}>회원가입</span></p>
     </div>
 );
}

function HomeLogon(props) {

    //가입한 클럽이 없을때
    if (props.clubs === null) {
        return (
            <div className={props.className}>
                <img id="no_contents" src={No_contents_blue} alt="img_no_contents"/>
                <p className='anounce'>안녕하세요, {props.auth.name}님!<br/>
                 아직 가입한 클럽이 없어요.</p>
                <p style={{position: "relative", top:"calc(30% + 25px)"}}>공개탭에서 관심사에 맞는 클럽을 찾아<br/>
                참여하거나 새로운 클럽을 개설해보세요.</p>
            </div>
        );
    }
    
    //클럽이 있을때
    return(
        <div className={props.className}>
            <div className="myClubList">
                <div className={props.searchState.class}>
                        <input className={props.searchState.inputClass} type="text" placeholder="검색어를 입력하세요." onChange={props.inputChange}/> 
                        <img className='searchIcon' width={25} height={25} src={Search_white} onClick={props.searchCilck}/>
                </div>
            {props.clubs.map((contents, index)=>(
                <div className='myClubBanner' key={contents+index}>
                    <p className='smallInfo right'>최근 거래 : {contents.recentActivities} 전</p>
                    <p className='bannerTitle'>{contents.name}</p>
                    <span className='smallInfo'><img className='smallIcon' src={Contract_white}/> {contents.concludedContract}/{contents.totalContract}</span>
                    <span className='smallInfo right'>{contents.member} <img className='smallIcon' src={User_white}/></span>
                </div>
            ))}
            </div>
        </div>
    );
}

