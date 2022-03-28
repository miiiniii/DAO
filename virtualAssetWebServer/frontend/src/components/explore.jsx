import React, {useEffect, useState} from 'react';
import searchAxios from '../scripts/searchAxios';
import "./explore.css";

import Search_white from "../Icons/Search_white.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";
import Close_white from "../Icons/Close_white.png";

export default function Explore(props){
    const [sBarExt,setSBarExt]=useState(false);
    const [keyword, setKeyword]=useState([]);
    const [result, setResult]=useState(null);
    const [hotKeyword, setHotKeyword]=useState(null);
    const [mostDealedKeyword,setMostDealedKeyword]=useState(null);
    const [newsBanner, setNewsBanner]=useState(null);



    useEffect(()=>{
        if(props.sw === undefined||props.sw.realIndex!==1)return;
        if(result===undefined||result===null){
            searchAxios(keyword,(data)=>{
                setResult(data)
            });
        }

    },[props.sw === undefined ? false : props.sw.realIndex,keyword]);

    const searchClick=()=>{
        if(!sBarExt)setSBarExt(true);
        else{

        }
    }

    const closeClick=()=>{
        if(sBarExt)setSBarExt(false);
    }

    return(
    <>
        <div className={sBarExt?'exploreBarContainer exploreBarExt':'exploreBarContainer'}>
        <ExploreBar searchClick={searchClick} closeClick={closeClick} sBarExt={sBarExt}></ExploreBar>
        </div>
        <div className={sBarExt?'exploreViewContainer exploreViewShort':'exploreViewContainer'}>
        <ExploreView className={props.className} result={result}></ExploreView>    
        </div>
    </>
    )
}

function ExploreBar(props){
    if(props.sBarExt){
        return(
        <div className='exploreBar'>
            <p className='exploreBarCmt hideUp'>지정된 키워드가 없습니다.<br/>돋보기를 눌러 원하는 키워드를 설정해보세요!</p>
            <img className='exploreIcon' src={Search_white} width={30} height={30} onClick={props.searchClick}/>
            <select className='exploreType show'>
                <option value='all'>전체</option>
                <option value='title'>제목+내용</option>
                <option value='tag'>태그</option>
            </select>
            <input type='search' placeholder='키워드를 입력하세요.' className='exploreInput show'></input>
            <img className='closeBtn' src={Close_white} width={20} height={20} onClick={props.closeClick}/>
        </div>
        )
    }

    return(
        <div className='exploreBar'>
            <p className='exploreBarCmt'>지정된 키워드가 없습니다.<br/>돋보기를 눌러 원하는 키워드를 설정해보세요!</p>
            <img className='exploreIcon' src={Search_white} width={30} height={30} onClick={props.searchClick}/>
            <select className='exploreType'>
                <option value='all'>전체</option>
                <option value='title'>제목+내용</option>
                <option value='tag'>태그</option>
            </select>
            <input type='search' placeholder='키워드를 입력하세요.' className='exploreInput'></input>
        </div>
    )
}

function ExploreView(props){
    if(props.result===null){
        return(
            <div className={props.className}>

            </div>
        )
    }
    return(
        <div className={props.className}>
            <div className='pubClubList'>
                {props.result.map((contents,i)=>(
                    <div className='pubClubBanner' key={"pubClubBanner"+i}>
                        <p className='smallInfo right'>최근 거래 : {contents.recentActivities} 전</p>
                        <p className='bannerTitle'>{contents.name}</p>
                        <p className='intro'>{contents.intro}</p>
                        <div className='tagContainer'>
                            {contents.tag.map((tag,ii)=>(
                                <div key={'tag'+ii} className='tag'>#{tag}</div>
                            ))}
                        </div>
                        <span className='smallInfo'><img className='smallIcon' src={Contract_white} /> {contents.concludedContract}/{contents.totalContract}</span>
                        <span className='smallInfo right'>{contents.member} <img className='smallIcon' src={User_white} /></span>
                    </div>
                ))}
            </div>
        </div>
    )
}