import React, {useState, useEffect} from "react";
import "./dashboard-css/items.css"
import "./dashboard-css/checkbox.css"
import "./dashboard-css/dashboard.css"

function calculateTimeAgo(timeCreated){ //Not maintainable but its still really cool code 😍,
    const now = new Date();
    const accountCreated = new Date(timeCreated);
    
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    
    const accountCreatedStr = `${String(accountCreated.getDay()).padStart(2,"0")} ${months[accountCreated.getMonth()]},  ${accountCreated.getFullYear()}`
    const created = new Date(accountCreated);

    let yearsAgo = now.getFullYear() - created.getFullYear();
    let monthsAgo = now.getMonth() - created.getMonth();

    if(monthsAgo < 0){yearsAgo--; monthsAgo+=12;}

    let timeAgo = [`${yearsAgo} years ago` ,`${monthsAgo} months ago`];

    yearsAgo >= 1? timeAgo = timeAgo[0] :timeAgo= timeAgo[1];

    if(monthsAgo === 0 && yearsAgo === 0) timeAgo = 0; 

   return timeAgo? `${timeAgo}  (${accountCreatedStr})` : accountCreatedStr; //Returns yrs ago, months ago, OR JUST the date
}





function hexToRgba(hex, alpha = 0.5) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

function getTf2tier(hex){
    const tierCodes = { "#476291": -4, //vintage
                         "#4D7455": -3, //geniune
                        "#CF6A32" : -2, //stramnge
                        "#7D6D00" : -7, // common
                        "#38f3ab" : -5, // haunted
                        "#FAFAFA" : -6, //Gunmettle
                        "#8650AC" : -1
    };

    return tierCodes[hex]? tierCodes[hex] : -100;
}

function getColor(type){
    const defaultColor = {name: "default", value: "rgb(70, 70, 70,0.5)", tier:-1}
    const colorCode = [{name: "consumer", value: "rgb(122, 122, 122,0.5)", tier:0},
                        {name: "industrial", value:"rgb(92, 131, 145, 0.5)", tier:1},
                        {name: "mil-spec", value:"rgb(65, 77, 209,0.5)", tier:2},
                        {name: "restricted", value:"rgb(169, 88, 232,0.5)", tier:3},
                        {name: "classified", value: "rgb(226, 32, 230,0.5)", tier:4},
                        {name: "covert", value:"rgb(217, 28, 28, 0.5)", tier:5},
                        {name: "rare", value: "rgb(227, 215, 10,0.5)", tier:6}
    ]

    let firstStr = type.split(" ")[0].toLowerCase();
    if(firstStr === "stattrak™"){
        firstStr = type.split(" ")[1].toLowerCase();
    }
    
    const hex = colorCode.find((element) => element.name === firstStr)


    return hex? hex :defaultColor;



}


function addSomeFakeItems(invItemsArr){
    const fakeKnife = {name: "★ Karambit | Marble Fade",
        iconUrl: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmMbfUqW1Q7MBOhuDG_Zi73g3i_UQ-Mjz7ddKccQ44aVGD_1W8wenphMS07snJyHtj7nUm4X7aywv3309PGbb8_A/360fx360f",
        color: {name: "rare", value: "rgb(227, 215, 10,0.5)", tier:6},
        wear: "Exterior: Factory New",
        game: "cs2"
    };

    const desolate = {name: "M4A4 | Desolate Space",
        iconUrl: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh4-HluPxDKjBl2hU18h0juDU-ML02lCwqUFtZG-iI4HHelA5YFvU-1O6w-vng8C6u87BySNh6CNx5nfegVXp1tTZc_LR/360fx360f",
        color: {name: "classified", value: "rgb(226, 32, 230,0.5)", tier:4},
        wear: "Exterior: Minimal Wear",
                game: "cs2"
    };

    const redline = {name: "AK-47 | Redline",
        iconUrl: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVS7cYg3LuT94qm21GyqUpsa2j7IIDDJwI7YwvRrFi7lOa5hpfpvs_A1zI97fpmYHCU/360fx360f",
        color: {name: "classified", value: "rgb(226, 32, 230,0.5)", tier:4},
        wear: "Exterior: Minimal Wear",
                game: "cs2"
    };

    const oceanDrive = {name: "Desert Eagle | Ocean Drive",
        iconUrl: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du6kb-AnuP3O4Tck29Y_cg_0rjEpo2giQDi-EU_ZTilddSdeg8_MgmE8wLvweq9jMS-6pvNyyQ27z5iuyjZQpqvJw/360fx360f",
        color: {name: "covert", value:"rgb(217, 28, 28, 0.5)", tier:5},
        wear: "Exterior: Minimal Wear",        game: "cs2"

    };


    invItemsArr.push(desolate);
    invItemsArr.push(redline);
    invItemsArr.push(oceanDrive);

    invItemsArr.push(fakeKnife);


}


function Dashboard(dataProp){



    //Dashboard, reading from profile
    const avatarUrl = dataProp.profile._json.avatarfull;  
    const displayName = dataProp.profile.displayName;
    const profilePublic = dataProp.profile._json.communityvisibilitystate == 3? "Public": "Private"; 
    const personaState = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"][dataProp.profile._json.personastate];
    const clanId = dataProp.profile._json.primaryclanid
    const steamId = dataProp.profile.id; 


    const accountCreatedFullStr = calculateTimeAgo(dataProp.profile._json.timecreated *1000)

    const openSteamLink = () => window.open(dataProp.profile._json.profileurl , '_blank').focus()


    const gameIcons = {cs2: "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/730/8dbc71957312bbd3baea65848b545be9eae2a355.jpg"
        ,tf2:"https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/440/e3f595a92552da3d664ad00277fad2107345f743.jpg"
        ,pubg:"https://cdn.fastly.steamstatic.com/steamcommunity/public/images/apps/578080/609f27278aa70697c13bf99f32c5a0248c381f9d.jpg"
}



    if(displayName === "steam_user321"){
        let displayItems = dataProp.inventory;

        return <>
        <div className="containerHeader">
            <h2>Welcome, {displayName}!</h2>

        </div>
        

        <div className="bodyContainer">
            <div className="userDisplay">
                <img src={avatarUrl} placeholder="Steam Avatar"></img>

                <h2>{displayName}</h2>
                
                <label>Steam Status: <i>{personaState}</i></label><br></br>
                <label>Profile Visibility: {profilePublic}</label><br></br><br></br>
                <label>Account Created: {accountCreatedFullStr}</label><br></br>
                

                <br></br>
                <button>View on Steam</button><br></br>
                <label>Steam ID: {steamId}</label><br></br>

            </div>

            <div className="inventoryHeader">
                <h2>Inventory</h2>
                <label>Inventory size: 10</label>

               



          
                
            </div>

            <div className="inventoryDisplay">
                

                <div className="inventoryItems">
                    {displayItems.map((item,index) => {
                        return <div className="item" style={{borderColor:item.color.value, backgroundColor:item.color.value}}>
                                <label>{item.name}</label>
                                <label className="wearText">{item.wear}</label>
                                <img src={item.iconUrl}></img>
                                
                                    <img id="game-icon" src={gameIcons[item.game]}></img>
                                


                        </div>
                    }) }


                </div>
                
                


            </div>

        </div>
    
    
    </> 
    }


    //Inventory
    const inventorySize = dataProp.inventory["730"].total_inventory_count + dataProp.inventory["440"].total_inventory_count +dataProp.inventory["578080"].total_inventory_count ;
    let [dynamicInventorySize, setDynamicInventorySize] = useState(inventorySize);
    let [inventorySizeStr, setInventorySizeStr] = useState(`${inventorySize}`);
    const iconUrlBase = "https://steamcommunity-a.akamaihd.net/economy/image/"


    
    function retrieveCSItems(csInv){
        
        return (Array(csInv.descriptions)[0]).map((item) => {
             return {name : item.name,
                     iconUrl: iconUrlBase + item.icon_url,
                     color : getColor(item.type),
                     wear: item.descriptions[0].name === "exterior_wear"?  item.descriptions[0].value : "",
                     game: "cs2"
             }
        })
    }

    function retrieveTF2Items(tf2Inv){ //Tf2 json has diff architecture
    
        let cumulative = [];
        
        tf2Inv.descriptions.forEach((array) => {
            cumulative = [...cumulative, ...mapValues(array)]
        })
        function mapValues(array){
            return Array(array).map( (item) => {
                return {name : item.name,
                        iconUrl: iconUrlBase + item.icon_url,
                        color : {name: "" ,value: hexToRgba("#"+item.name_color), tier: getTf2tier("#"+item.name_color)},
                        wear: item.type? item.type : "",
                        game : "tf2"
                }
           })
        }

        return cumulative;
    }

    function retrievePUBGItems(pubgInv){
        
        return (Array(pubgInv.descriptions)[0]).map((item) => {
             return {name : item.name,
                     iconUrl: iconUrlBase + item.icon_url,
                     color : {name: "default", value: "rgb(70, 70, 70,0.5)", tier:-10},
                     wear: "",
                     game: "pubg"
             }
        })
    }

    const csInventoryItems = retrieveCSItems(dataProp.inventory["730"])
    const tf2InventoryItems = retrieveTF2Items(dataProp.inventory["440"])
    const pubgInventoryItems = retrievePUBGItems(dataProp.inventory["578080"])


    const inventoryItems = [...csInventoryItems, ...tf2InventoryItems, ...pubgInventoryItems] //Array of objects


    addSomeFakeItems(inventoryItems); // Adding about 5 fake Cs2 items for display
    



    inventoryItems.sort((a,b) => {return  b.color.tier -a.color.tier })


    //Toggle games view
    const gameToCode = {cs2: "730", tf2: "440", pubg: "578080"}

    let [selectedGames, setSelectedGames] = useState({cs2 : true, tf2: true ,pubg : true});

    
    let [displayItems, setDisplayItems] = useState([]);
    const updateDisplayItems = () => {setDisplayItems(inventoryItems.filter((item) => selectedGames[item.game]))};

    function toggleGame(game){
        const gameCode = gameToCode[game];
        const invCount = dataProp.inventory[gameCode].total_inventory_count; //Game inv count
        let temp = selectedGames
        temp[game] = !temp[game] 
        setSelectedGames(temp);
        updateDisplayItems();
    

        setDynamicInventorySize(dynamicInventorySize + (temp[game]? invCount: -invCount));
        
    }

    useEffect(() => updateDisplayItems(), []) //Run once
    useEffect(() => {setInventorySizeStr(`${dynamicInventorySize}(${inventorySize})`)}, [dynamicInventorySize]) //Run on dynamic change


    //console.log(displayItems)

   
    return <>
        <div className="containerHeader">
            <h2>Welcome, {displayName}!</h2>

        </div>
        

        <div className="bodyContainer">
            <div className="userDisplay">
                <img src={avatarUrl} placeholder="Steam Avatar"></img>

                <h2>{displayName}</h2>
                
                <label>Steam Status: <i>{personaState}</i></label><br></br>
                <label>Profile Visibility: {profilePublic}</label><br></br><br></br>
                <label>Account Created: {accountCreatedFullStr}</label><br></br>
                

                <br></br>
                <button onClick={openSteamLink}>View on Steam</button><br></br>
                <label>Steam ID: {steamId}</label><br></br>

            </div>

            <div className="inventoryHeader">
                <h2>Inventory</h2>
                <label>Inventory size: {inventorySize == dynamicInventorySize? inventorySize : inventorySizeStr }</label>

                <div id="toggle-buttons">
                    <img src={gameIcons["cs2"]}></img>
                    <div className="checkbox-wrapper-2"> 
                         <input type="checkbox" checked={selectedGames["cs2"]} className="sc-gJwTLC ikxBAC" onClick={() => {toggleGame("cs2")}}></input>
                    </div>

                    <img src={gameIcons["tf2"]}></img>
                    <div className="checkbox-wrapper-2"> 
                         <input type="checkbox" checked={selectedGames["tf2"]} className="sc-gJwTLC ikxBAC" onClick={() => {toggleGame("tf2")}}></input>
                    </div>

                    <img src={gameIcons["pubg"]}></img>
                    <div className="checkbox-wrapper-2"> 
                         <input type="checkbox" checked={selectedGames["pubg"]} className="sc-gJwTLC ikxBAC" onClick={() => {toggleGame("pubg")}}></input>
                    </div>



                </div>
                
            </div>

            <div className="inventoryDisplay">
                

                <div className="inventoryItems">
                    {displayItems.map((item,index) => {
                        return <div className="item" style={{borderColor:item.color.value, backgroundColor:item.color.value}}>
                                <label>{item.name}</label>
                                <label className="wearText">{item.wear}</label>
                                <img src={item.iconUrl}></img>
                                
                                    <img id="game-icon" src={gameIcons[item.game]}></img>
                                


                        </div>
                    }) }


                </div>
                
                


            </div>

        </div>
    
    
    </>
}


export default Dashboard;