import React, { useEffect, useState } from 'react';
import searchAxios from '../scripts/searchAxios';
import "./explore.css";

import Search_white from "../Icons/Search_white.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";
import Close_white from "../Icons/Close_white.png";
import LoadingSpinner from './loadingSpinner';

export default function Explore(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sBarExt, setSBarExt] = useState(false);
    const [keyword, setKeyword] = useState([]);
    const [result, setResult] = useState(null);
    const [hotKeyword, setHotKeyword] = useState(null);
    const [mostDealedKeyword, setMostDealedKeyword] = useState(null);
    const [newsBanner, setNewsBanner] = useState(null);



    useEffect(() => {
        if (props.sw === undefined || props.sw.realIndex !== 1) return;
        if (result === undefined || result === null) {
            setIsLoaded(false);
            searchAxios(keyword, (data) => {
                console.log("explore");
                console.log(data);
                setResult(data);
                setIsLoaded(true);
            });
        }

    }, [props.sw === undefined ? false : props.sw.realIndex, keyword]);

    const searchClick = () => {
        if (!sBarExt) setSBarExt(true);
        else {

        }
    }

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

function ExploreBar(props) {
    if (props.sBarExt) {
        return (
            <div className='exploreBar'>
                <img className='exploreIcon' src={Search_white} width={30} height={30} onClick={props.searchClick} />
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

    return (
        <div className='exploreBar'>
            <img className='exploreIcon' src={Search_white} width={30} height={30} onClick={props.searchClick} />
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

function ExploreView(props) {
    if (props.result === null) {
        return (
            <div className={props.className}>

            </div>
        )
    }
    return (
        <div className={props.className}>
            <div className='pubClubList'>
                {props.result.map((contents, i) => (
                    <div className='pubClubBanner' key={"pubClubBanner" + i} onClick={props.showClubPage}>
                        <p className='smallInfo right'>최근 거래 : {contents.recentActivities} 전</p>
                        <p className='bannerTitle'>{contents.name}</p>
                        <p className='intro'>{contents.introduce}</p>
                        <div className='tagContainer'>
                            {contents.tags.map((tag, ii) => (
                                <div key={'tag' + ii} className='tag'>#{tag}</div>
                            ))}
                        </div>
                        <span className='smallInfo'><img className='smallIcon' src={Contract_white} /> {contents.concludedContract}/{contents.totalContract}</span>
                        <span className='smallInfo right'>{contents.memberAmount} <img className='smallIcon' src={User_white} /></span>
                    </div>
                ))}
            </div>
        </div>
    )
}