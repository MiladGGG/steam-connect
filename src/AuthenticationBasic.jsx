import React, {useState, useEffect} from "react";

function AuthenticationBasic(){

    let [loggedIn, setLoggedIn] = useState(false)


    function steamLogin(){
        window.location.href = "http://localhost:3000/auth/steam"
    }

    async function getUser(){
        try{
            const response = await fetch("http://localhost:3000/user", {credentials: "include"}); //FETCH DATA

            if(!response.ok) throw new Error("Not authenticated, Please log in")

            const userData = await response.json(); //Parse data to JSON

            if(!userData.identifier) throw new Error("Bad user data")


            
            //Successful fetch


            console.log(userData)
            setLoggedIn(true);



        }
        catch(err){
            console.error(err)
        }

    }


    useEffect(() => getUser, []) //Runs only on mount

    return <>
        <h1>Authentication!</h1>
        <p>{loggedIn? "User IS logged in": "User is not logged in"}</p>
        <br></br>
        <button onClick={steamLogin}>Login with Steam</button>
        <br></br>
    </>;

}

export default AuthenticationBasic;