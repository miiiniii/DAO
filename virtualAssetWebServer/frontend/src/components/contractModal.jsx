import React from 'react';
import "./contractModal.css";

export default function ContractModal(props){
    return(
        <div>
            {props.showModal ? (
                <div className='openModal modal'>
                    <section>
                          <header>
                            <button className="close" onClick={props.closeModal}>
                              &times;
                            </button>
                          </header>
                          <main>계약서 전문 보기 모달창계약서 전문 보기 모달창계약서 전문 보기 모달창계약서 전문 보기 모달창계약서 전문 보기 모달창계약서 전문 보기 모달창계약서 전문 보기 모달창</main>
                    </section>
                </div>)
            : (<>
            </>)
        }
        </div>
    )
}