import passport from "passport";
import pkg from "passport-steam";

const SteamStrategy = pkg;
 
import {configDotenv} from "dotenv"; //Import environment file
configDotenv(); //Initialise



passport.serializeUser((user, done) =>{
    console.log("Inside Serailise USER:");
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    console.log("Inside DEserailise USER:");

    done(null, obj);
  });


passport.use(new SteamStrategy({
    returnURL: process.env.VITE_SERVER_URL+'/auth/steam/return',
    realm: process.env.VITE_SERVER_URL+"/",
    apiKey: process.env.STEAM_API_KEY
  },
  (identifier, profile, done) => {


    try{
       //Find and verify user, might not be needed

        done(null, {identifier: identifier, profile: profile});
    }
    catch(err){
        done(err,null);
    }
  }
));


export default passport;
