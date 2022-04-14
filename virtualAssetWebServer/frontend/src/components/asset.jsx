import React, { useEffect, useState } from "react";
import customAxios from "../scripts/customAxios";
import Logoff from "./logoff";
import No_contents_blue from "../Icons/No_contents_blue.png";
import Search_white from "../Icons/Search_white.png";
import "./asset.css";
import AssetDetail from "./assetDetail";
import LoadingSpinner from "./loadingSpinner";

export default function Asset(props) {

     const [isLoaded, setIsLoaded] = useState(false);
     const [assets, setAssets] = useState([]);
     const [assetDisplay, setAssetDisplay] = useState();
     const [searchState, setSearchState] = useState({ extend: false, class: "searchFloat", inputClass: "searchInput hide", searchValue: "" });
     const [searchInput, setSearchInput] = useState();
     const inputChange = (v) => { setSearchInput(v.target.value) };
     const [detailView, setDetailView] = useState({ view: false, assetId: null, assetIndex:null});

     useEffect(() => {
          if (props.sw !== undefined && props.sw.realIndex === 2) {
               customAxios('/myAssets', (data) => {
                    if (JSON.stringify(data) === JSON.stringify(assets)) {
                         setIsLoaded(true);
                         return;
                    }
                    if (data === "") setAssets(null);
                    else setAssets(data);
                    console.log('assets');
                    console.log(data);
                    setIsLoaded(true);
               });
          }
     }, [props.sw === undefined ? false : props.sw.realIndex]);

     useEffect(() => {
          if (searchInput === undefined || searchInput === null || searchInput === "") {
               setAssetDisplay(assets);
               return;
          }

          setAssetDisplay(Object.values(assets).filter((oc) => {
               return (oc.name === undefined || oc.name === null) ? false : (oc.name.includes(searchInput) || oc.tag.includes(searchInput) || oc.buyClub.includes(searchInput))
          }).map(v => {
               const t = { ...v };
               if (t.name.includes(searchInput)) {
                    t.name = <span>
                         {v.name.slice(0, v.name.indexOf(searchInput))}
                         <span className='sh'>
                              {v.name.slice(v.name.indexOf(searchInput), v.name.indexOf(searchInput) + searchInput.length)}
                         </span>
                         {v.name.slice(v.name.indexOf(searchInput) + searchInput.length)}
                    </span>;
               }
               else if (t.tag.includes(searchInput)) {
                    t.tag = <span>
                         {v.tag.slice(0, v.tag.indexOf(searchInput))}
                         <span className='sh'>
                              {v.tag.slice(v.tag.indexOf(searchInput), v.tag.indexOf(searchInput) + searchInput.length)}
                         </span>
                         {v.tag.slice(v.tag.indexOf(searchInput) + searchInput.length)}
                    </span>;
               } else {
                    t.buyClub = <span>
                         {v.buyClub.slice(0, v.buyClub.indexOf(searchInput))}
                         <span className='sh'>
                              {v.buyClub.slice(v.buyClub.indexOf(searchInput), v.buyClub.indexOf(searchInput) + searchInput.length)}
                         </span>
                         {v.buyClub.slice(v.buyClub.indexOf(searchInput) + searchInput.length)}
                    </span>;
               }
               return t;
          }));
     }, [searchInput, assets]);


     function assetDetailBack() {
          setDetailView({view: false, assetId:null, assetIndex:null});
     }

     function searchCilck() {
          if (!searchState.extend) setSearchState({ extend: true, class: "searchFloat extend", inputClass: "searchInput", searchValue: "" })
          else setSearchState({ extend: false, class: "searchFloat", inputClass: "searchInput hide", searchValue: "" });
     }

     if (props.auth !== undefined && props.auth.code === 100) {
          if(isLoaded){
          return <AssetLogon
               className={props.className}
               assets={assetDisplay}
               auth={props.auth}
               searchCilck={searchCilck}
               searchState={searchState}
               inputChange={inputChange}
               assetDetailBack={assetDetailBack}
               detailView={detailView}
               setDetailView={setDetailView}
               showClubPage={props.showClubPage}
          />;
          }
          return <div className={props.className}><LoadingSpinner></LoadingSpinner></div>
     }
     else {
          return <Logoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage} />;
     }

}

function AssetLogon(props) {

     //보유한 자산이 없을때
     if (props.assets === null) {
          return (
               <div className={props.className}>
                    <img id="no_contents" src={No_contents_blue} alt="img_no_contents" />
                    <p className='anounce'>안녕하세요, {props.auth.name}님!<br />
                         아직 보유한 자산이 없어요.</p>
                    <p style={{ position: "relative", top: "calc(30% + 25px)" }}>공개탭에서 관심사에 맞는 클럽을 찾아<br />
                         구매 계약에 참여하거나 제안해보세요.</p>
               </div>
          );
     }

     //자산이 있을때
     return (
          <div className={props.className}>
               <div className="myAssetList">
                    <div className={props.searchState.class}>
                         <input className={props.searchState.inputClass} type="text" placeholder="검색어를 입력하세요." onChange={props.inputChange} />
                         <img className='searchIcon' width={25} height={25} src={Search_white} onClick={props.searchCilck} />
                    </div>
                    <div className="myClubList">
                         {props.assets.map((c, i) => (
                              <div className="assetBanner" key={c.name + i} onClick={()=>props.setDetailView({view: true, assetId:c.assetId, assetIndex:i})}>
                                   <p className="assetTag">
                                        [{c.tag}]
                                        <span className="buyDate">거래일자:{c.buyDate}</span>
                                   </p>
                                   <p className="assetTitle">{c.name}</p>
                                   <p className="assetInfo">가격 : {new Intl.NumberFormat('ko', { style: 'currency', currency: c.currency||'KRW'}).format(c.currPrice)}</p>
                                   <p className={"assetInfo valueChange" + (c.valueChange > 0 ? " increase" : (c.valueChange < 0 ? " decrease" : ""))}>{c.valueChange > 0 ? (" ▲ +" + new Intl.NumberFormat('ko', { style: 'currency', currency: c.currency||'KRW'}).format(Math.abs(c.currPrice - c.buyPrice))) : (c.valueChange < 0 ? (" ▼ -" + new Intl.NumberFormat('ko', { style: 'currency', currency: c.currency||'KRW'}).format(Math.abs(c.currPrice - c.buyPrice))) : ("■\xa0\xa0\xa0"+new Intl.NumberFormat('ko', { style: 'currency', currency: c.currency||'KRW'}).format(0)))}&nbsp;&nbsp;&nbsp;( {c.valueChange > 0 ? ("+" + Math.abs(c.valueChange).toFixed(2) + "% )") : (c.valueChange < 0 ? ("-" + Math.abs(c.valueChange).toFixed(2) + "% )") : "0% )")}</p>
                                   <p className="assetInfo">구매클럽 : {c.buyClub}</p>
                              </div>
                         ))}
                    </div>
               </div>
               {props.detailView.view?<AssetDetail
                    assetDetailBack={props.assetDetailBack}
                    assetId={props.detailView.assetId}
                    assetInfo={props.assets[props.detailView.assetIndex]}
                    view={props.detailView.view}
                    showClubPage={props.showClubPage}
               />:<></> }
               
          </div>
     );
}
