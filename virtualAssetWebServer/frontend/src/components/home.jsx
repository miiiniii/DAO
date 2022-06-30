import React, { useEffect, useState } from 'react';
import customAxios from '../scripts/customAxios';
import "./home.css";
import Logoff from './logoff';

import No_contents_blue from "../Icons/No_contents_blue.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";
import Search_white from "../Icons/Search_white.png";
import LoadingSpinner from './loadingSpinner';
import {Icon_Search} from './cssIcons';

/**
 * 홈 탭 컴포넌트
 */
export default function Home(props) {
    /*컨텐츠가 모두 로드되면 true, 아니면 false */
    const [isLoaded, setIsLoaded] = useState(false);

    /*내가 가입한 커뮤니티 리스트*/
    const [community, setCommunity] = useState(null);

    /*홈탭에서 검색할깨 키워드로 필터링된 커뮤니티 리스트*/
    const [communityDisplay, setCommunityDisplay] = useState(null);

    /*검색 플로팅 버튼 상태*/
    const [searchState, setSearchState] = useState({ extend: false, class: "searchFloat", inputClass: "searchInput hide"});
    /*검색 키워드*/
    const [searchInput, setSearchInput] = useState();
    /*검색 인풋 함수*/
    const inputChange = (v) => { setSearchInput(v.target.value) };

    //내 커뮤니티 불러오기
    useEffect(() => {
        if (props.currMainWindow === 0) {
            customAxios('/myCommunityBanners', (data) => {
                if (JSON.stringify(data) === JSON.stringify(community)) return;
                if (data === "") setCommunity(null);
                else setCommunity(data);
                console.log("myCommunity");
                console.log(data);
                setIsLoaded(true);
            });
        }
    }, [props.currMainWindow]);

    //
    useEffect(() => {
        if (searchInput === undefined || searchInput === null || searchInput === "") {
            setCommunityDisplay(community);
            return;
        }

        setCommunityDisplay(Object.values(community).filter((oc) => {
            return (oc.name === undefined || oc.name === null) ? false : oc.name.includes(searchInput)
        }).map(v => {
            const t = { ...v };
            t.name = <span>
                {v.name.slice(0, v.name.indexOf(searchInput))}
                <span className='sh'>
                    {v.name.slice(v.name.indexOf(searchInput), v.name.indexOf(searchInput) + searchInput.length)}
                </span>
                {v.name.slice(v.name.indexOf(searchInput) + searchInput.length)}
            </span>;
            return t;
        }));
    }, [searchInput, community]);


    function searchClick() {
        if (!searchState.extend) setSearchState({ extend: true, class: "searchFloat extend", inputClass: "searchInput"})
        else setSearchState({ extend: false, class: "searchFloat", inputClass: "searchInput hide"});
    }






    if (props.auth !== undefined && props.auth.code === 100) {
        if(isLoaded){
        return (
        <HomeLogon
            className='mainWindow'
            clubs={communityDisplay}
            auth={props.auth}
            searchClick={searchClick}
            searchState={searchState}
            inputChange={inputChange}
            showClubPage={props.showClubPage}
        />)
        }
        return (
        <div className='mainWindow'><LoadingSpinner></LoadingSpinner></div>)
    } else {
        return <Logoff className='mainWindow' showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage} />;
    }

}


function HomeLogon(props) {

    //가입한 클럽이 없을때
    if (props.clubs === null) {
        return (
            <div className="mainWindow">
                <img id="no_contents" src={No_contents_blue} alt="img_no_contents" />
                <p className='anounce'>안녕하세요, {props.auth.name}님!<br />
                    아직 가입한 클럽이 없어요.</p>
                <p style={{ position: "relative", top: "calc(30% + 25px)" }}>공개탭에서 관심사에 맞는 클럽을 찾아<br />
                    참여하거나 새로운 클럽을 개설해보세요.</p>
            </div>
        );
    }

    //클럽이 있을때
    return (
        <div className="mainWindow">
            <div className="myClubList">
                <div className={props.searchState.class}>
                    <input className={props.searchState.inputClass} type="text" placeholder="검색어를 입력하세요." onChange={props.inputChange} />
                    <Icon_Search size='34px' onClick={props.searchClick} margin='7.5px' float='right'/>
                </div>
                <br/>
                <h2>가입한 커뮤니티</h2>
                <br/>
                {props.clubs.map((contents, index) => (
                    <div className='myClubBanner' key={contents + index} onClick={props.showClubPage}>
                        <p className='smallInfo right'>최근 거래 : {contents.recentActivities} 전</p>
                        <p className='bannerTitle'>{contents.name}</p>
                        <span className='smallInfo'><img className='smallIcon' src={Contract_white} /> {contents.concludedContractAmount}/{contents.totalContractAmount}</span>
                        <span className='smallInfo right'>{contents.memberAmount} <img className='smallIcon' src={User_white} /></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

