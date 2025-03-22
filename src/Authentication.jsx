import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard";

function Authentication(){

    let [loggedIn, setLoggedIn] = useState(false)
    let [userData, setUserData] = useState({})


    function steamLogin(){
        window.location.href = "http://localhost:3000/auth/steam"
    }

    async function getUser(){
        try{
            const response = await fetch("http://localhost:3000/user", {credentials: "include"}); //FETCH DATA

            if(!response.ok) throw new Error("Not authenticated, Please log in")

            userData = await response.json(); //Parse data to JSON

            setUserData(userData); 

            if(!userData.identifier) throw new Error("Bad user data")


            //Successful fetch
            setLoggedIn(true);

        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(() => getUser, []) //Runs only on mount
    useEffect(() => setUserData(userData), [userData]) //Updates userdata



    return <>
        
        {loggedIn? 
        <Dashboard profile={userData.profile}/>
        : 
        <>
        <div className="containerHeader" >
            <h2>Steam Connect</h2>
        </div>

        <div className="bodyContainer">
            
            <div className="bodyContents">
                <p>Please log with Steam in to continue</p>
                <button onClick={steamLogin}>Login with Steam</button>

            </div>
        </div>
        </>

        }


    </>;

}



export default Authentication;