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


var kinBeginDate = '2023-10-10%2000%3A00%3A00';
var kinEndDate = '2023-10-15%2000%3A00%3A00';
var kinPlayerId = '81';
const fields = 'accel_load_accum,accel_load_accum_avg_per_minute,distance_total,speed_max,jump_height_max,event_count_jump,event_count_change_of_orientation';


// have to get one player (and prob one session) at a time bc they dont label the data w any identifiers
/*const apiKinexonStats = () => {
    fetch((process.env.KINEXON_URL).concat('/statistics/players/', kinPlayerId, '/sessions?min=', kinBeginDate, '&max=', kinEndDate, '&fields=', fields, '&apiKey=', process.env.KINEXON_API_KEY), {
        headers: {
            'Accept': 'application/json',
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

apiKinexonStats();*/



/*
* Hawkins API calls! :)
*/

function hawkStruct(timestamp, athleteId, jumpHeight, mRSI, timeTakeoff, brakePhase, prpp, brakePwr, brakeNetImp, propNetImp, LRBrakeForce) {
    this.timestamp = timestamp;
    this.athleteId = athleteId;
    this.jumpHeight = jumpHeight;
    this.mRSI = mRSI;
    this.timeTakeoff = timeTakeoff; 
    this.brakePhase = brakePhase;
    this.prpp = prpp;
    this.brakePwr = brakePwr;
    this.brakeNetImp = brakeNetImp;
    this.propNetImp = propNetImp;
    this.LRBrakeForce = LRBrakeForce;
}

// gets all data starting from June 1, 2023 @ midnight: 1685595600
const apiHawkinsStats = async () => {
    let hawkStructArray = [];

    let hawkinStats = await fetch((process.env.HAWKINS_URL).concat('?from=1685595600'), {
        headers: {
            Authorization: 'Bearer ' + await token.genHawkinToken()
        }
    });

    let hawkinResponse = await hawkinStats.json();
    for(let i = 0; i < hawkinResponse.data.length; i++) {     // loop through all measurments & hawkStruct w the data, push this onto hawkStructArray
        const m = hawkinResponse.data[i];
        hawkStructArray.push(new hawkStruct(m.timestamp, m.athlete.id, m['Jump Height(m)'], m['mRSI'], m['Time To Takeoff(s)'], m['Braking Phase(s)'], m['Peak Relative Propulsive Power(W/kg)'], m['Avg. Braking Power(W)'], m['Braking Net Impulse(N.s)'], m['Propulsive Net Impulse(N.s)'], m['L|R Avg. Braking Force(%)']));
    }

    return hawkStructArray;
}

async function setHawkins() {
    let stats = await apiHawkinsStats();
    for(let i = 0; i < stats.length; i++) {
        set(ref(db, 'HawkinStats/' + timestamp), {
            // values here
        });
    }
}
setHawkins();



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
/*const apiFirstBeatTeam = () => {
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
}*/

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
    .then(data => {             // have to do it this way bc variables array switches around every time i call for some reason
        

        for(let i = 0; i < data.measurements.length; i++) {
            for(let j = 0; j < data.measurements[i].variables.length; j++) {
                if(data.measurements[i].variables[j].name == 'trimp') console.log(data.measurements[i].variables[j].name, ' = ', data.measurements[i].variables[j].value);
                if(data.measurements[i].variables[j].name == 'energyConsumptionTotal') console.log(data.measurements[i].variables[j].name, ' = ', data.measurements[i].variables[j].value);
                if(data.measurements[i].variables[j].name == 'playerStatusScore') console.log(data.measurements[i].variables[j].name, ' = ', data.measurements[i].variables[j].value, '\n');
            }
        }
        
    }) 
    .catch(error => { 
        console.error(error);
    });
}



//apiFirstBeatSessions();