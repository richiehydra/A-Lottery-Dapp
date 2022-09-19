import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Players.css"

const Players=({state,address})=>
{
const [account,setAccount]=useState("");
const [registeredPlayer,setRegisterPlayers]=useState([]);

useEffect(()=>
{
    const getAccount=async()=>
    {
    const {web3}=state;
    const accounts=await web3.eth.getAccounts();
    setAccount(accounts[0]);
    }
    state.web3 && getAccount();
},[state,state.web3]);


useEffect(()=>
{
    const setPlayers=async()=>
    {
        const {contract}=state;
        const Players=await contract.methods.allPlayers().call();
        console.log(Players);
        const registeredPlayer=await Promise.all(Players.map((players)=>{return players} ))
        setRegisterPlayers(registeredPlayer);

    }
    state.contract && setPlayers();
},[state,state.contract])
return <>
<ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please pay 0.001 ether on this contract address : </b> {address}
          </li>
          <li className="list-group-item">
            <b>Registerd Players </b>:
            <br />
            <br />
            {registeredPlayer.length !== 0 &&
              registeredPlayer.map((name) => <p key={name}>{name}</p>)}
          </li>
        </div>
      </ul>
      </>
}
export default Players;