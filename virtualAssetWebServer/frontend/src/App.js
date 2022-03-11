
import './App.css';
import React, {useEffect, useState} from 'react';
import customAxios from './customAxios';

function App() {
  const [ip, setIp]=useState('');

  function callback(data){
    setIp(data);
  }

  useEffect(
    ()=>{
      customAxios('/ip',callback);
    },[]
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>aaaaaaaaaaaaaaaa</div>
        <ul>
          {ip}
        </ul>
        <div>aaaaaaaaaaaaaaaa</div>
      </header>
    </div>
  );
}

export default App;
