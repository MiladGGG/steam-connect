import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard";

function Authentication(){

    let [loggedIn, setLoggedIn] = useState(false)
    let [userData, setUserData] = useState({})
    let [userInventory, setUserInventory] = useState({})



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

            await getInventory();

        }
        catch(err){
            console.error(err)
        }
    }
    async function getInventory(){
        try{
            const response = await fetch(`http://localhost:3000/user/inventory`
                , {  credentials: "include"}); //FETCH DATA

            if(!response.ok) throw new Error("Not authenticated, Please log in")

            let data = await response.json();
            console.log(data)

            if(data.success !== 1) throw new Error("Error retrieving inventory, check if Steam inventory is set to public")

            setUserInventory(data); 


        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => getUser, []) //Runs only on mount
    useEffect(() => setUserData(userData), [userData]) //Updates userdata
    useEffect(() => setUserInventory(userInventory), [userInventory]) //Updates userinv



    return <>
        
        {loggedIn? 
        <Dashboard profile={userData.profile} inventory={userInventory}/>
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