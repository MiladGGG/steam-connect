//Imports
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/steam-strategy.js";
import cors from 'cors'; 

import {configDotenv} from "dotenv"; //Import environment file
configDotenv(); //Initialise


const app = express();

//Middleware
app.use(express.json()); //ParseJSON
app.use(cookieParser())//Parse cookies




app.use(session({ //Handle sessions with cookies
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 //1 hour
    }
}));

app.use(passport.initialize()); //Runs once and modifies request object :) CHAMA
app.use(passport.session()); // Adds cookie to session, Session is now LOCKED IN

app.use(cors({
    origin: "http://localhost:5173", // allow requests
    credentials: true // enable cookie and sessions
  }));




//Endpoints


app.get('/auth/steam', // Redirects to steam for login
    passport.authenticate('steam'),
    function(req, res) {
      // this function will not be called.
    });

 

app.get("/auth/steam/return" , passport.authenticate('steam'), (request, response) => { //Return endpoint after steam auth


    return response.status(201).redirect('http://localhost:5173/');
})
 

app.get("/user", (request, response) =>{ //Send user stored after auth

    console.log(`User Get request`)
 
    if(request.user != null){ 
        console.log("Sending user")
        
        return response.status(200).send(request.user) 
    }
    else{
        return response.sendStatus(401);
    }  

})

app.get("/user/sampleprofile", (request, response) =>{ //Send user stored after auth

    console.log(`Sample profile request`)

    const parsedJSON = JSON.parse(process.env.SAMPLE_DATA);

         
    return response.status(200).send(parsedJSON)

})
app.get("/user/sampleinventory", (request, response) =>{ //Send user stored after auth

    console.log(`Sample inventroy request`)

    const parsedJSON = JSON.parse(process.env.SAMPLE_INVENTORY);

         
    return response.status(200).send(parsedJSON)

})

app.get("/user/logout" ,(request, response) =>{ //Send user stored after auth

    console.log(`Logging out`)

    request.logout((err) => {response.sendStatus(500)})        
})






app.post("/user/inventory", async (request, response) => {

    if(request.user != null){

        try{
            const inv = await fetch(`https://steamcommunity.com/inventory/${request.user.profile._json.steamid}/${request.body.gameCode}/2`); //FETCH DATA
    
            if(!inv.ok) throw new Error("Not authen ticated, Please log in")

            let data = await inv.json()

            return response.status(200).send(data);

        }
        catch(err){
            console.error(err)
        }
        
    }
    else{
        return response.sendStatus(401);
    }

});


app.post("/user/inventory/price", async (request, response) => {

    if(request.user != null){
        console.log("Attempting to load item price: ")

        try{
            const url = `https://steamcommunity.com/market/priceoverview/?country=NL&currency=2&appid=730&market_hash_name=${encodeURIComponent(request.body.url)}`;
            const priceResponse = await fetch(url);
            console.log(priceResponse)

            if(priceResponse.status <= 300 ) throw new Error("Failure in retreiving price")

            let price = await priceResponse.json()

            return response.status(200).send(price);

        }
        catch(err){
            console.error(err)

        }
        
    }
    else{
        return response.sendStatus(401);
    }

});














const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is LIVE on Port: ${PORT}`);
})