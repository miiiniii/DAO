import React, { useEffect, useState } from "react";
import "./assetDetail.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import customAxiosData from "../scripts/customAxiosData";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

export const options = {
    responsive: true,
    interaction: {
        intersect: false,
        mode: 'index',
    },
    tooltip: {
        usePointStyle: true,
    },
    plugins: {
        legend: false
    },
    scales: {
        y: {
            ticks: {
                color: "rgb(55,59,64,1)",
            },
            grid: {
                color: "rgba(55,59,64,0.2)",
            }
        },
        y1: {
            display: false,
        },
        x: {
            ticks: {
                color: "rgb(55,59,64,1)",
            },
            grid: {
                color: "rgba(55,59,64,0.2)",
            }
        }
    },
};

export function makeChartData(price = [0, 0, 0, 0, 0, 0, 0], changes = [0, 0, 0, 0, 0, 0, 0]) {
    const labels = ['6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '1일 전', '오늘'];
    return {
        labels,
        datasets: [
            {
                label: '가격',
                data: price,
                borderColor: 'rgb(115, 140, 217)',
                backgroundColor: 'rgba(115, 140, 217, 0.5)',
                radius: 4,
                hoverRadius: 7,
                yAxisID: 'y',
                pointStyle: 'none',
            },
            {
                label: '변동',
                data: changes,
                yAxisID: 'y1',
                backgroundColor: "rgba(220,220,220,0)",
                borderColor: "rgba(200,200,200,0)",
                fill: { above: 'rgba(255,200,200,0.5)', below: 'rgba(200,200,255,0.5)', target: { value: 0 } },
                pointStyle: 'none',
            }
        ],
    };
}

export default function AssetDetail(props) {
    const [detail, setDetail] = useState({ responsible: "" });

    useEffect(() => {
        customAxiosData("/assetDetail", { assetId: props.assetId }, (data) => {
            setDetail(data);
            console.log(data);
            data.pastPrice.push(props.assetInfo.currPrice);
            setAssetData(makeChartData(data.pastPrice, data.valueChangeHistory));
        })
    }, []);
    const [assetData, setAssetData] = useState(makeChartData());

    return (< div className="touchBlock" >
        <div className="assetDetail">
            <div className="assetDetailNav"><div className="assetDetailBack" onClick={props.assetDetailBack}><i className="fa fa-arrow-left"></i></div><div className="assetDetailTitle">{props.assetInfo.name}</div></div>
            <div className="assetDetailCont">
                <div>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>[{props.assetInfo.tag}]</td>
                                <td colSpan={2}><p className={(props.assetInfo.valueChange > 0 ? " increase" : (props.assetInfo.valueChange < 0 ? " decrease" : ""))}>{props.assetInfo.valueChange > 0 ? (" ▲ +" + AddComma(Math.abs(props.assetInfo.currPrice - props.assetInfo.buyPrice)) + props.assetInfo.currency) : (props.assetInfo.valueChange < 0 ? (" ▼ -" + AddComma(Math.abs(props.assetInfo.currPrice - props.assetInfo.buyPrice)) + props.assetInfo.currency) : ("■\xa0\xa0\xa00" + props.assetInfo.currency))}({props.assetInfo.valueChange > 0 ? ("+" + Math.abs(props.assetInfo.valueChange).toFixed(2) + "%)") : (props.assetInfo.valueChange < 0 ? ("-" + Math.abs(props.assetInfo.valueChange).toFixed(2) + "%)") : "0%)")}</p></td>
                            </tr>
                            <tr>
                                <td>현재가격</td>
                                <td>:</td>
                                <td>{AddComma(props.assetInfo.currPrice) + props.assetInfo.currency}</td>
                            </tr>
                            <tr>
                                <td>구매가격</td>
                                <td>:</td>
                                <td>{AddComma(props.assetInfo.buyPrice) + props.assetInfo.currency}</td>
                            </tr>
                            <tr>
                                <td>구매클럽</td>
                                <td>:</td>
                                <td className="link">{props.assetInfo.buyClub}</td>
                            </tr>
                            <tr>
                                <td>책임자</td>
                                <td>:</td>
                                <td className="link">{detail.responsible}</td>
                            </tr>
                            <tr>
                                <td>거래일자</td>
                                <td>:</td>
                                <td>{props.assetInfo.buyDate}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <br />
                                    <p>가격 변동 그래프</p>
                                    <div className="chartWrapper">
                                        <Line options={options} data={assetData}><p>그래프 기능을 지원하지 않는 브라우저입니다.</p></Line>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div >)
}

function AddComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}