import React, { useState, useEffect } from "react";
import "./vote.css"

export default function Vote() {
    return (
        <div class="wrapper">
            <header>투표</header>
            <div className="pollArea">
                <label for="">
                    <div className="row">
                        <div className="column">
                            <span className="circle"></span>
                            <span className="text">옵션1</span>
                        </div>
                        <span className="percent">30%</span>
                    </div>
                    <div className="progress"></div>
                </label>
                <label for="">
                    <div className="row">
                        <div className="column">
                            <span className="circle"></span>
                            <span className="text">옵션2</span>
                        </div>
                        <span className="percent">60%</span>
                    </div>
                    <div className="progress"></div>
                </label>
                <label for="">
                    <div className="row">
                        <div className="column">
                            <span className="circle"></span>
                            <span className="text">옵션3</span>
                        </div>
                        <span className="percent">50%</span>
                    </div>
                    <div className="progress"></div>
                </label>
            </div>
        </div>
    )
}