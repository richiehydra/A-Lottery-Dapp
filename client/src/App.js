import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/lottery.json"
import "./App.css";
import "./components/Manager"
import Manager from "./components/Manager";
import Players from "./components/Players";
import {Route,Link} from "react-router-dom";
import Intro from "./components/Intro";
const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="App">
       <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link navtext" aria-current="page">
                  Lottery System
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/manager"
                  className="nav-link navtext"
                  aria-current="page"
                >
                  Manger
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/players" className="nav-link navtext">
                  Player
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Route exact path="/"><Intro/></Route>
      <Route path="/manager"> <Manager state={state}/></Route>
       <Route path="/players"><Players state={state} address={address}/></Route>
     
    </div>
  );
};
export default App;
