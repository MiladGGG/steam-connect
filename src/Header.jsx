import Authentication from "./Authentication";
import { useState } from "react";


function Header(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [logOutSignal, setLogOutSignal] = useState(false);
    const [logInSignal, setLogInSignal] = useState(false);




    const isLoggedInMessage = (childMessage) => {
        setLoggedIn(childMessage);
    }

    function logButton(){
        loggedIn? setLogOutSignal(true): setLogInSignal(true)
    }


    return <><div className="header">
        <div className="header-start">

            <label id="header-label">STEAM CONNECT</label>

        </div>

        <div className="header-end">


            <button onClick={logButton}>{!loggedIn? "LOG IN": "LOG OUT"}</button>
 

            
        </div>


    </div>
        <Authentication logOutSignal={logOutSignal} logInSignal={logInSignal} isLoggedInMessage={isLoggedInMessage}/>

    </>

}

export default Header;