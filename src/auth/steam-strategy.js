import passport from "passport";
import pkg from "passport-steam";
const SteamStrategy = pkg;


passport.serializeUser((user, done) =>{
    console.log("Inside Serailise USER:");
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    console.log("Inside DEserailise USER:");

    done(null, obj);
  });


passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: "SecretapikeyLOL"
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
