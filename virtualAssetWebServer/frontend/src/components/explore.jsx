import React, { useEffect, useState } from 'react';
import searchAxios from '../scripts/searchAxios';
import "./explore.css";

import Search_white from "../Icons/Search_white.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";
import Close_white from "../Icons/Close_white.png";
import LoadingSpinner from './loadingSpinner';
import { Icon_Search } from './cssIcons';

/**
 * 탐색탭 컴포넌트
 * @param currMainWindow as Integer
 * @param showClubPage as function
 */
export default function Explore(props) {

    /*컨텐츠가 모두 로드되면 true, 아니면 false */
    const [isLoaded, setIsLoaded] = useState(false);

    /*탐색바가 확장상태면 true, 아니면 false */
    const [sBarExt, setSBarExt] = useState(false);

    /*검색 키워드 리스트*/
    const [keyword, setKeyword] = useState([]);

    /*키워드로 검색된 결과를 저장하는 리스트 */
    const [result, setResult] = useState(null);

    /*탐색바 내부 핫키워드 랭킹 리스트*/
    const [hotKeyword, setHotKeyword] = useState(null);

    /*탐색바 내부 거래량 많은 키워드 랭킹 리스트*/
    const [mostDealedKeyword, setMostDealedKeyword] = useState(null);


    //첫 로드시 기본 노출 리스트를 서버에 요청
    useEffect(() => {
        if (props.currMainWindow !== 1) return;
        if (result === undefined || result === null) {
            setIsLoaded(false);
            searchAxios(keyword, (data) => {
                console.log("explore");
                console.log(data);
                setResult(data);
                setIsLoaded(true);
            });
        }
    }, [props.currMainWindow, keyword]);

    //돋보기 버튼으로 탐색바 확장하고 확장된 상태에서는 검색 실행하는 함수.
    //서버로 검색키워드를 보내면 서버에서 결과를 보내주는 식으로 구현할 예정.
    const searchClick = () => {
        if (!sBarExt) setSBarExt(true);
        else {

        }
    }

    //탐색바가 확장되면 하단에 나오는 축소버튼의 기능 함수.
    const closeClick = () => {
        if (sBarExt) setSBarExt(false);
    }

    return (
        <>
            <div className={sBarExt ? 'exploreBarContainer exploreBarExt' : 'exploreBarContainer'}>
                <ExploreBar searchClick={searchClick} closeClick={closeClick} sBarExt={sBarExt}/>
            </div>
            <div className={sBarExt ? 'exploreViewContainer exploreViewShort' : 'exploreViewContainer'}>
                {isLoaded?(
                    <ExploreView className={props.className} result={result} showClubPage={props.showClubPage}/>
                    ):(<div className={props.className}><LoadingSpinner></LoadingSpinner></div>)
                    }
                
            </div>
        </>
    )
}

/**
 * 탐색 바 컴포넌트
 */
function ExploreBar(props) {
    //확장 상태일때
    if (props.sBarExt) {
        return (
            <div className='exploreBar'>
                <Icon_Search size={43} onClick={props.searchClick}  margin='14px' float='right'/>
                <select className='roundStyle exploreType typeShow'>
                    <option value='all'>전체</option>
                    <option value='tag'>태그</option>
                    <option value='title'>제목</option>
                    <option value='intro'>소개</option>
                    <option value='content'>제목+소개</option>
                </select>
                <select className='roundStyle sortType sortTypeShow'>
                    <option value='recent'>최근순</option>
                    <option value='accuracy'>정확도</option>
                    <option value='popularity'>인기순</option>
                </select>
                <input type='search' placeholder='키워드를 입력하세요.' className='roundStyle exploreInput show'></input>
                <p className='exploreBarCmt hideUp'>지정된 키워드가 없습니다.<br />돋보기를 눌러 원하는 키워드를 설정해보세요!</p>
                <img className='closeBtn' src={Close_white} width={20} height={20} onClick={props.closeClick} />
            </div>
        )
    }
    //축소 상태일때
    return (
        <div className='exploreBar'>
            <Icon_Search size='43px' onClick={props.searchClick}  margin='14px' float='right'/>
            <select className='roundStyle exploreType'>
                <option value='all'>전체</option>
                <option value='tag'>태그</option>
                <option value='title'>제목</option>
                <option value='intro'>소개</option>
                <option value='content'>제목+소개</option>
            </select>
            <select className='roundStyle sortType'>
                <option value='recent'>최근순</option>
                <option value='accuracy'>정확도</option>
                <option value='popularity'>인기순</option>
            </select>
            <input type='search' placeholder='키워드를 입력하세요.' className='roundStyle exploreInput'></input>
            <p className='exploreBarCmt'>지정된 키워드가 없습니다.<br />돋보기를 눌러 원하는 키워드를 설정해보세요!</p>
        </div>
    )
}

//검색된 커뮤니티 목록 컴포넌트
function ExploreView(props) {
    //검색결과가 없을때
    //검색결과가 없다고 알려줄 안내페이지 제작해야함.
    if (props.result.data === "") {
        return (
            <div className={props.className}>
                
            </div>
        )
    }
    return (
        <div className={props.className}>
            <div className='pubClubList'>
                {props.result.data.map((contents, i) => (
                    <div className='pubClubBanner' key={"pubClubBanner" + i} onClick={props.showClubPage}>
                        <p className='smallInfo right'>최근 거래 : {contents.recentActivities} 전</p>
                        <p className='bannerTitle'>{contents.name}</p>
                        <p className='intro'>{contents.introduce}</p>
                        <div className='tagContainer'>
                            {contents.tags.split(':').map((tag, ii) => (
                                <div key={'tag' + ii} className='tag'>#{tag}</div>
                            ))}
                        </div>
                        <span className='smallInfo'><img className='smallIcon' src={Contract_white} /> {contents.concludedContractAmount}/{contents.totalContractAmount}</span>
                        <span className='smallInfo right'>{contents.memberAmount} <img className='smallIcon' src={User_white} /></span>
                    </div>
                ))}
            </div>
        </div>
    )
}