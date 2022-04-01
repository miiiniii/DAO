import React from "react";
import "./assetDetail.css";

export default function AssetDetail(props) {

    return (< div className="touchBlock" >
        <div className="assetDetail">
            <div className="assetDetialNav"><div className="assetDetailBack"><i className="fa fa-arrow-left"></i></div><div className="assetDetailTitle">자산 이름</div></div>
            <div className="assetDetialCont">
                <div>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>[품목]</td>
                                <td>▲</td>
                                <td>+200000 원 ( +20% )</td>
                            </tr>
                            <tr>
                                <td>현재가격</td>
                                <td>:</td>
                                <td>1200000 원</td>
                            </tr>
                            <tr>
                                <td>구매가격</td>
                                <td>:</td>
                                <td>1000000 원</td>
                            </tr>
                            <tr>
                                <td>구매클럽</td>
                                <td>:</td>
                                <td className="link">클럽 이름</td>
                            </tr>
                            <tr>
                                <td>책임자</td>
                                <td>:</td>
                                <td className="link">책임자 이름</td>
                            </tr>
                            <tr>
                                <td>거래일자</td>
                                <td>:</td>
                                <td>2022년 4월 1일</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />
                    <div className="valueChangeGraphCont">
                        <p>변동 추이</p>
                        <div></div>
                    </div>


                </div>
            </div>
        </div>
    </div >)
}