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



function Dashboard(dataProp){
    console.log(dataProp)

    const avatarUrl = dataProp.profile._json.avatarfull;  
    const displayName = dataProp.profile.displayName;

    //Get rest of information from  steam website
    

   let accountCreatedFullStr = calculateTimeAgo(dataProp.profile._json.timecreated *1000)

   
    return <>
        <div className="containerHeader">
            <h2>Welcome, {displayName}!</h2>

        </div>
        

        <div className="bodyContainer">
            <div className="userDisplay">
                <img src={avatarUrl} placeholder="Steam Avatar"></img>

                <h2>{displayName}</h2>
                
                <label>Account Created: {accountCreatedFullStr}</label>


            </div>

        </div>
    
    
    </>
}


export default Dashboard;