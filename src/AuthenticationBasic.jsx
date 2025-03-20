import React, {useState, useEffect} from "react";

function AuthenticationBasic(){

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
        <h1>Steam Connect</h1>
        {loggedIn? 
        <UserDashboard profile={userData.profile}/>
        : 
        <><p>Please log in to continue</p>
        <button onClick={steamLogin}>Login with Steam</button></>}


    </>;

}

function UserDashboard(dataProp){
    console.log(dataProp)

    const avatarUrl = dataProp.profile._json.avatarfull;  
    const displayName = dataProp.profile.displayName;


    return <>
        <h2>Welcome, {displayName}!</h2>
        <img src={avatarUrl} placeholder="Steam Avatar"></img>
    
    
    </>
}

export default AuthenticationBasic;