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

const kinAuth = 'Bearer ' + process.env.KINEXON_API_KEY;
//const apiKey

// gets all data starting from Oct 13, 2023 @ midnight
const apiKinexonTest = () => {
    fetch((process.env.KINEXON_URL).concat('/teams/6/players?apiKey=', process.env.KINEXON_API_KEY), {
        headers: {
            'Accept': 'application/json',
            //'Content-Type' : 'application/json',
            'Authorization': 'Basic ' + Buffer.from(process.env.KINEXON_API_USERNAME + ':' + process.env.KINEXON_API_PASSWORD).toString('base64')
        },
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

/*async function apiKinexonTest() {
    const username = process.env.KINEXON_API_USERNAME;
    const password = process.env.KINEXON_API_PASSWORD;
    const apiKey1 = process.env.KINEXON_API_KEY;
    const url1 = process.env.KINEXON_URL + '/statistics/list?apiKey=' + apiKey1;

    const response1  = await fetch(url1, {
        method: 'GET',
        headers: {
            'Accept' : '',
            'Authorization' : 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        }
    })
    if(response1.ok) {
        console.log('woohoo!');
    }
}*/

apiKinexonTest();



/*
* Hawkins API calls! :)
*/
/*const hawkAuth = 'Bearer ' + process.env.HAWKINS_API_KEY;

// gets all data starting from Oct 13, 2023 @ midnight
const apiHawkinsTests = () => {
    fetch((process.env.HAWKINS_URL).concat('?from=1697173200'), {
        headers: {
            Authorization: hawkAuth
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
        let measurements = data.data[0]; 
        console.log('Jump height');
        console.log(measurements['Jump Height(m)']);

        console.log('mRSI');
        console.log(measurements['mRSI']);

        console.log('Time to takeoff');
        console.log(measurements['Time To Takeoff(s)']);

        console.log('Braking phase');
        console.log(measurements['Braking Phase(s)']);

        console.log('Peak relative propulsive power');
        console.log(measurements['Peak Relative Propulsive Power(W/kg)']);

        console.log('Braking power');
        console.log(measurements['Avg. Braking Power(W)']);

        console.log('Braking net impulse');
        console.log(measurements['Braking Net Impulse(N.s)']);

        console.log('Propulsive net impulse');
        console.log(measurements['Propulsive Net Impulse(N.s)']);

        console.log('L/R avg braking force');
        console.log(measurements['L|R Avg. Braking Force(%)']);
    }) 
    .catch(error => { 
        console.error(error);
    });
}

apiHawkinsTests();*/



/*
* Firstbeat API calls! :)
*/
/*let fbAuth = 'Bearer ' + token.genFbToken();                // generates authorization token
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
            return response;
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
        for(let i = 0; i < 5; i++) {    // get last 5 sessions
            console.log(data.sessions[data.sessions.length - 1 - i]);
        }     
    }) 
    .catch(error => { 
        console.error(error);
    });
}

// results for indiv session, session # for Oct 14th, 2023 is hard coded rn for an example
const apiFirstBeatSessionResults = () => {
    fetch((process.env.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions/725121/results'), {  // add teams/{teamId}/sessions/{sessionId}/results to url
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
        for(let i = 0; i < data.measurements.length; i++) {
            console.log(data.measurements[i].variables[8].name);        // energyConsumptionCarbs
            console.log(data.measurements[i].variables[8].value);

            console.log(data.measurements[i].variables[3].name);       // energyConsumptionFats
            console.log(data.measurements[i].variables[3].value);

            console.log(data.measurements[i].variables[16].name);        // energyConsumptionTotal
            console.log(data.measurements[i].variables[16].value);

            console.log(data.measurements[i].variables[1].name);       // playerStatusScore
            console.log(data.measurements[i].variables[1].value);

            console.log(data.measurements[i].variables[6].name);        // trimp
            console.log(data.measurements[i].variables[6].value);

            console.log(data.measurements[i].variables[24].name);       //trimpPerMinute
            console.log(data.measurements[i].variables[24].value);
        }
    }) 
    .catch(error => { 
        console.error(error);
    });
}

apiFirstBeatSessionResults();*/