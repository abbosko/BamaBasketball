require('dotenv').config({path:"./.env"}); 
const token = require('./genToken.js');


// !!!!!!! MOVE LATER !!!!!!!!
// Firstbeat athlete object
function FBAthlete(fname, lname, email, id) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.id = id;
}

/*const apiHawkinsTest = () => {
    fetch(process.env.HAWKINS_URL, {
        headers: {
            Authorization: "bearer ${process.env.HAWKINS_API_KEY}"
            //X-AUTH-TOKEN': process.env.HAWKINS_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
        return response.text(); // Parse the response data as JSON 
        //return response;
        } else { 
        throw new Error('API request failed'); 
        } 
    }) 
    .then(data => { 
        // Process the response data here 
        console.log(data); // Example: Logging the data to the console 
    }) 
    .catch(error => { 
        // Handle any errors here 
        console.error(error); // Example: Logging the error to the console 
    });
}

apiHawkinsTest();*/

/*const apiKinexonTest = () => {
    fetch(process.env.KINEXON_URL, {
        headers: {
            //Authorization: 'Bearer ${process.env.KINEXON_API_KEY}'
            'X-AUTH-TOKEN': process.env.KINEXON_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
        return response.text(); // Parse the response data as JSON 
        //return response;
        } else { 
        throw new Error('API request failed'); 
        } 
    }) 
    .then(data => { 
        // Process the response data here 
        console.log(data); // Example: Logging the data to the console 
    }) 
    .catch(error => { 
        // Handle any errors here 
        console.error(error); // Example: Logging the error to the console 
    });
}

apiKinexonTest();*/



/*
* Firstbeat API calls! :)
*/
let fbAuth = 'Bearer ' + token.genFbToken();                // generates authorization token
const teamId = 17688;                                       // UAMBB team id
var fbAthleteArray = [];

// gets athlete info, creates instance of 'FBAthlete', stores in fbAthleteArray
const apiFirstBeatAthletes = () => {
    fetch((process.env.FIRSTBEAT_URL).concat('/athletes'), { // add {accountId}/athletes to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
            return response.json();
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => {      
        for(let i = 0; i < data.athletes.length; i++) {     // create FBAthlete & push onto fbAthleteArray
            fbAthleteArray.push(new FBAthlete(data.athletes[i].firstName, data.athletes[i].lastName, data.athletes[i].email, data.athletes[i].athleteId));
        }
    }) 
    .catch(error => { 
        console.error(error);
    });
}

// did this to get team id, do we need groups??
const apiFirstBeatTeam = () => {
    fetch((process.env.FIRSTBEAT_URL).concat('/teams'), {  // add team to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
            return response.json();
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => {
        for(let i = 0; i < 3; i++) {
           console.log(data.teams[0].groups[i]);
        }      
    }) 
    .catch(error => { 
        console.error(error);
    });
}

//gets sessions going back to June 1st, 2022; store this data somewhere
const apiFirstBeatSessions = () => {
    fetch((process.env.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions'), {  // add teams/{teamId}/sessions to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
            return response.json();
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => {
        console.log(data);     
    }) 
    .catch(error => { 
        console.error(error);
    });
}

// results for indiv session, session # for June 1st, 2022 is hard coded rn for an example
const apiFirstBeatSessionResults = () => {
    fetch((process.env.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions/575554/results'), {  // add teams/{teamId}/sessions/{sessionId}/results to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    }) 
    .then(response => { 
        if (response.ok) { 
            return response.json;
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => {
        console.log(data);     
    }) 
    .catch(error => { 
        console.error(error);
    });
}

apiFirstBeatSessionResults();