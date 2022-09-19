import React from "react";
import { useState,useEffect } from "react";
import "./Manager.css"
const Manager=({state})=>
{
    const [account,setAccount]=useState("");
    const [currentBalance,setBalance]=useState(0);
    const [winner,setWinner]=useState("No Winners Yet");

    useEffect(()=>
    {
        const getaccounts=async()=>
        {
            const {web3}=state;
            const accounts=await web3.eth.getAccounts();
            console.log(accounts);
            setAccount(accounts[0]);
        }
        state.web3   &&     getaccounts();
    },[state,state.web3])

    const ContractBalance=async()=>
    {
        const {contract}=state;

        try{
            const balance=await contract.methods.getBalance().call({from:account})
            console.log(balance);
            setBalance(balance)
        }
        catch(e)
        {
            setBalance("No balances Got Yet")
        }
    }

    const Winner=async()=>
    {
        const {contract}=state;

        try{
            await contract.methods.pickWinner().send({from:account});
            const lotterywinner=await contract.methods.winner().call();
            console.log(lotterywinner)
            setWinner(lotterywinner)
        }
        catch(e)
        {
            if(e.message.includes("only Owner can Pick Winner"))
            {
                setWinner("Only Owner can Pick Winner")
            }
            else if(e.message.includes("Not have Enough ParticiPants"))
            {
                setWinner("Not have Enough ParticiPants")
            }
            else
            {
                setWinner("No winner announced Yet")
            }
        }
    }

return(
    <ul className="list-group" id="list">
      <div className="center">
        <li className="list-group-item" aria-disabled="true">
          <b>Connected account :</b> {account}
        </li>
        <li className="list-group-item">
          <b> Winner : </b>
          {winner}
          <button className="button1" onClick={Winner}>
            Click For Winner
          </button>
        </li>
        <li className="list-group-item">
          <b>Balance : </b> {currentBalance} ETH
          <button className="button1" onClick={ContractBalance}>
            Click For Balance
          </button>
        </li>
      </div>
    </ul>
);
}
export default Manager;