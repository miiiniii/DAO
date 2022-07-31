import "./kbank.css";
// import '../App.css';

import React, { useState } from 'react';
import { useTable } from 'react-table';
import { useMemo } from "react";
// import styled from 'styled-components';

export default function KBank() {

    // const touchBlock = "true";

    const columns = [
        {
          accessor: 'user',
          Header: '사용자',
        //   maxWidth: 150,
        //   minWidth: 100,
          width: 70,
        //   width: "30%"
        },
        {
          accessor: 'amount',
          Header: '금액',
          maxWidth: 300,
          minWidth: 200,
          width: 200,
        //   width: "20%"
        },
        {
          accessor: 'status',
          Header: '비고',
          width: 50
        //   width: "20%"
        },
    ]

    let data = [
        { user: "시우", amount: "6,000,000", status: false ? "⭕" : "❌" },
        { user: "카이샹", amount: "200,000", status: true ? "⭕" : "❌" },
        { user: "성주", amount: "1,000,000", status: true ? "⭕" : "❌" },
        { user: "선민", amount: "4,000,000", status: true ? "⭕" : "❌" },

    ]

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = 
    useTable({
        columns,
        data,
    });
      
    return (
        <div className="Container">
            {/* <div className="touchBlocker" style={{ display: touchBlock ? 'block' : 'none', opacity: touchBlock ? '0.4' : '0' }}></div> */}
            {/* <header className="App-header"></header> */}
            <i className="fa fa-arrow-left"></i>
            <br/>
                <h2>KBank</h2>
            <br/>
            <div className="App">
            {/* <header className="App-header"> */}
                <div className="Table">
                    <table {...getTableProps()}>
                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th width={column.width}  {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <button className="refreshButton">새로고침</button>
                    {/* onMouseEnter={() => {
                        setIsShown(true);
                        
                    }}
                    onMouseLeave={() => setIsShown(false)} */}
            {/* </header> */}
            </div>
        </div>
    );

    //     <div className="App">
        // <div className="touchBlocker" style={{ display: touchBlock ? 'block' : 'none', opacity: touchBlock ? '0.4' : '0' }}></div>
    //     <header className="App-header">
	// 	<div className>
    //         <h1>KBank</h1>
    //         {users.map((user, index) => {
    //             return (
    //                 <div key={index}>
    //                     <div>
    //                         <span>{user.name}</span>
    //                         <span>{user.number}</span>
    //                         <span>{user.status ? "O" : "X"}</span>
    //                     </div>
    //                 </div>
    //             )
    //         })}
    //         <button>새로고침</button>
    //     </div>
    //     </header>
    //     </div>
	// )
}