import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard";

function Authentication({logInSignal, logOutSignal, isLoggedInMessage}){

    let [loggedIn, setLoggedIn] = useState(false)
    let [inventoryDefined, setInventoryDefined] = useState(false)

    let [userData, setUserData] = useState({})
    let [userInventory, setUserInventory] = useState({})

    async function loadSampleProfile(){
        try{
            const response = await fetch("http://localhost:3000/user/sampleprofile"); //FETCH DATA

            if(!response.ok) throw new Error("Not authenticated, Please log in")

            userData = await response.json(); //Parse data to JSON

            setUserData(userData); 



            const response2 = await fetch("http://localhost:3000/user/sampleinventory"); //FETCH DATA

            if(!response2.ok) throw new Error("Not authenticated, Please log in")

            userInventory = await response2.json(); //Parse data to JSON

            setUserInventory(userInventory); 




            //Successful fetch
            setLoggedIn(true);

            //Successful fetch
            setInventoryDefined(true);

        }
        catch(err){
            console.error(err)
        }
    }

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

            await getInventory("730"); //CS2
            await getInventory("440"); //TF2
            await getInventory("578080"); //TF2


            //Successful fetch
            setInventoryDefined(true);

        }
        catch(err){
            console.error(err)
        }
    }
    async function getInventory(gameCode){
        try{
            const response = await fetch(`http://localhost:3000/user/inventory`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
        
                    body: JSON.stringify({
                      gameCode: gameCode
                    })
                });


            if(!response.ok) throw new Error("Not authenticated, Please log in")

            let data = await response.json();

            if(data.success !== 1) throw new Error("Error retrieving inventory, check if Steam inventory is set to public")

            setUserInventory((previousData) => {
                previousData[gameCode] = data;
                return previousData
            }); 

            


        }
        catch(err){
            console.error(err)
        }
    }

    if(logInSignal){
        steamLogin()
    }
    
    if(logOutSignal){
        async function logOut(){
            try{
                let response =  await fetch("http://localhost:3000/user/logout", {credentials: "include"})
                console.log(response    )
                window.location.reload();

            }
            catch(err){
                console.error(err)
            }
        }
        logOut()

    }




    useEffect(() => getUser, []) //Runs only on mount
    useEffect(() => setUserData(userData), [userData]) //Updates userdata
    useEffect(() => setUserInventory(userInventory), [userInventory]) //Updates userinv
    useEffect(() => isLoggedInMessage(loggedIn) , [loggedIn])

    return <>
        
        {loggedIn?
        inventoryDefined? <Dashboard profile={userData.profile} inventory={userInventory}/>: <label>Loading Inventory, please wait.</label>
        : 
        <>
        <div className="containerHeader" >
            <h2>Steam Connect</h2>
        </div>

        <div className="bodyContainer">
            
            <div className="bodyContents">
                <p>Please log with Steam in to continue</p>
                <button onClick={steamLogin}>Login with Steam</button><br></br>
                <button onClick={loadSampleProfile}>Load Sample Profile</button>

            </div>
        </div>
        </>

        }


    </>;

}



export default Authentication;