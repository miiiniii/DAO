import React from "react";
import Logoff from "./logoff";


export default function Asset(props){

    if(props.auth!==undefined&&props.auth.code===100){
        return <div auth={props.auth} className={props.className}></div>;
   }
   else{
        return <Logoff className={props.className} showSigninPage={props.showSigninPage} showSignupPage={props.showSignupPage}/>;
   }

}