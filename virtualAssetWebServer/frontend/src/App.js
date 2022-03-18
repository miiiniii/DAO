
import './App.css';
import React, {useEffect, useState} from 'react';
import customAxios from './customAxios';
import Asset_blue from './Icons/Asset_blue.png';
import Asset_white from './Icons/Asset_white.png';
import Home_blue from './Icons/Home_blue.png';
import Home_white from './Icons/Home_white.png';
import Explore_blue from './Icons/Explore_blue.png';
import Explore_white from './Icons/Explore_white.png';
import User_blue from './Icons/User_blue.png';
import User_white from './Icons/User_white.png';
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
  
  const [msg, setMsg]= useState([]);
  function msgf(data){
    setMsg(data);
  }
  useEffect(()=>{
    customAxios('/hello', msgf);
  },[]);


  let [icon, setIcon]= useState();


  return (
    <div className="App">
      <header className="App-header">
        <div className='mainWindowContainer'>
          <div className='mainWindow'>
          </div>
        </div>
        <div className='mainIconContainer'>
          <div id='home' className='mainIcon'>
            <img className='icon highLight' src={Home_white}></img>
            <img id='hl' className='icon underIco highLight' src={Home_blue}></img>
          </div>
          <div id='explore' className='mainIcon'>
            <img className='icon' src={Explore_white}></img>
            <img id='hl' className='icon underIco opz' src={Explore_blue}></img>
          </div>
          <div id='asset' className='mainIcon'>
            <img className='icon' src={Asset_white}></img>
            <img id='hl' className='icon underIco opz' src={Asset_blue}></img>
          </div>
          <div id='user' className='mainIcon'>
            <img className='icon' src={User_white}></img>
            <img id='hl' className='icon underIco opz' src={User_blue}></img>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
