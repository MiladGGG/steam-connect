//Imports
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/steam-strategy.js";
import cors from 'cors';


const app = express();

//Middleware
app.use(express.json()); //ParseJSON
app.use(cookieParser())//Parse cookies




app.use(session({ //Handle sessions with cookies
    secret: "SECRET-KEY",
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

 

app.get("/auth/steam/return" , passport.authenticate('steam'), (request, response) => {


    return response.status(201).redirect('http://localhost:5173/');
})


app.get("/user", (request, response) =>{

    console.log(`User Get request`)

    if(request.user != null){
        console.log("Sending user")
        
        return response.status(200).send(request.user)
    }
    else{
        return response.sendStatus(401);
    }

})




app.get("/user/inventory", async (request, response) => {


    if(request.user != null){
        console.log("Attempting to load inventorty: ")

        try{
            const inv = await fetch(`https://steamcommunity.com/inventory/${request.user.profile._json.steamid}/730/2`); //FETCH DATA

            if(!inv.ok) throw new Error("Not authenticated, Please log in")

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
















const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is LIVE on Port: ${PORT}`);
})