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


    console.log(`Sucessful Login USer is: ${request.session.passport.user}`)
    return response.status(201).redirect('http://localhost:5173/');
})


app.get("/user", (request, response) =>{

    console.log(request.user)

    if(request.user != null){
        console.log("Sending user")
        
        return response.status(200).send(request.user)
    }
    else{
        return response.sendStatus(401);
    }

})
















const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is LIVE on Port: ${PORT}`);
})