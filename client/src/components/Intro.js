import React from "react";
import {Link} from "react-router-dom"
import "./First.css"
const Intro=()=>
{
return <>
 <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
           <h6>Welcome to Decentralized Lottery Bootcamp</h6>
          </li>
          <li className="list-group-item">
            <Link to="/manager" className="text-decoration-none text">
              <button className="button1">Manager</button>
            </Link>

            <Link to="/players" className="text-decoration-none text">
              <button className="button1 player">Player</button>
            </Link>
          </li>
        </div>
      </ul>
</>
}
export default Intro;