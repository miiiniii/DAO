import React, {useEffect, useState} from 'react';
import searchAxios from '../scripts/searchAxios';
import "./explore.css";

import Search_white from "../Icons/Search_white.png";
import User_white from "../Icons/User_white.png";
import Contract_white from "../Icons/Contract_white.png";

export default function Explore(props){
    const [sBarExt,setSBarExt]=useState(false);
    const [keyword, setKeyword]=useState([]);
    const [result, setResult]=useState(null);

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

    return(<>
        <div className='searchBarContainer'>
        <SearchBar searchClick={searchClick}></SearchBar>
        </div>
        <div className='exploreViewContainer'>
        <ExploreView className={props.className} result={result}></ExploreView>    
        </div>
        </>
    )
}

function SearchBar(props){

    return(
        <div className='searchBar'>
            <p>지정된 키워드가 없습니다.<br/>돋보기를 눌러 원하는 키워드를 설정해보세요!</p>
            <img src={Search_white} width={30} height={30} onClick={props.searchClick}/>
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