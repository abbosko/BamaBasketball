import { getDatabase, ref, set, get} from "firebase/database";
import { initializeApp } from 'firebase/app';

import * as dotenv from 'dotenv';
import {genToken} from './genToken.js';

dotenv.config()

const token = genToken();

// once we have app ready all this info is store in index.js (prob a way to do it now but idk)
const firebaseConfig = {
    apiKey: "AIzaSyC40QoEGRFW3odhHDrk5tYTsO0X4mFyJXQ",
    authDomain: "uambb-2def3.firebaseapp.com",
    projectId: "uambb-2def3",
    storageBucket: "uambb-2def3.appspot.com",
    messagingSenderId: "210177408912",
    appId: "1:210177408912:web:b608c7e17caa478eb27d15",
    measurementId: "G-EYZBG3EE9B",
    databaseURL: "https://uambb-2def3-default-rtdb.firebaseio.com/"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

class FirstbeatPlayerSession{
  constructor(trimp, engConsumption, playerStatusScore){
      this.trimp = trimp;
      this.engConsumption = engConsumption;
      this.playerStatusScore = playerStatusScore;

  }
}

// !!!!!!! MOVE LATER !!!!!!!!
// Firstbeat athlete object
function FBAthlete(fname, lname, email, id) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.id = id;
}



/*var kinBeginDate = '2023-10-10%2000%3A00%3A00';
var kinEndDate = '2023-10-15%2000%3A00%3A00';
var kinPlayerId = '81';
const fields = 'accel_load_accum,accel_load_accum_avg_per_minute,distance_total,speed_max,jump_height_max,event_count_jump,event_count_change_of_orientation';


// have to get one player (and prob one session) at a time bc they dont label the data w any identifiers
const apiKinexonStats = () => {
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
/*const hawkAuth = 'Bearer ' + process.env.HAWKINS_API_KEY;

// gets all data starting from Oct 13, 2023 @ midnight
const apiHawkinsStats = () => {
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

apiHawkinsStats();*/



/*
* Firstbeat API calls! :)
*/
let fbAuth = 'Bearer ' + token;                // generates authorization token
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

//gets sessions going back to last session date
async function  apiFirstBeatSessions(last_session_date) {
    var data;

    let datetime_array = last_session_date.split('T');
    let session_date = datetime_array[0];

   const response = await fetch((process.env.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions?fromTime=' + session_date + "T00:00:00Z"), {  // add teams/{teamId}/sessions to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    });
        if (response.ok) { 
             data = await response.json()
         
        } else { 
            throw new Error('API request failed'); 
        } 
        return  data.sessions;

}

// results for indiv session
async function apiFirstBeatSessionResults(sessionID) {
    var data;

    const token = genToken();
    let fbAuth = 'Bearer ' + token; 

   const response = await fetch((process.env.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions/', sessionID, '/results'), {  // add teams/{teamId}/sessions/{sessionId}/results to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
        }
    });

    if (response.ok) { 
        data = await response.json(); } 
    else { 
            console.log("ERROR: " + response.status);
            throw new Error('API request failed'); 
        } 

    return data;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processFBsession(data, sessionID){

    data = await Promise.resolve(data); // i think this can be deleted idk
    if (data.measurements == null){     // retry if getting {message: Accepted} -- mostly for historical data load, prob could delete
        console.log ("sleep 10 seconds");
        await sleep(10000);
        data = await  apiFirstBeatSessionResults(sessionID)
    }
  
        for(let i = 0; i < data.measurements.length; i++) {
            let session = new FirstbeatPlayerSession(0,0,0);
            session.athlete_id = data.measurements[i].athleteId;
            let datetime_array = data.measurements[i].startTime.split('T');
            let session_date = datetime_array[0];
            session.sessionID = data.measurements[i].sessionId;
            session.session_date = session_date;

        
            for(let j = 0; j < data.measurements[i].variables.length; j++) {
                if(data.measurements[i].variables[j].name == 'trimp') session.trimp = data.measurements[i].variables[j].value;
                if(data.measurements[i].variables[j].name == 'energyConsumptionTotal') session.engConsumption =  data.measurements[i].variables[j].value;
                if(data.measurements[i].variables[j].name == 'playerStatusScore') session.playerStatusScore = data.measurements[i].variables[j].value;

            }
            set(ref(db, 'FirstbeatStats/' + session.sessionID + '/'+ session.athlete_id), {
                date: session_date,
                trimp : session.trimp,
                energyConsumptionTotal: session.engConsumption,
                playerStatusScore: session.playerStatusScore,
            });
        }
    }
    
var last_session_date = new Date();     // Keeping Last session date in memory to reload from this time
last_session_date.setDate(last_session_date.getDate() - 1);
last_session_date = last_session_date.toISOString()


// this is the function to call to grab fb data from api and set in db
async function setFirstBeatSessions(){
  let  sessions = await apiFirstBeatSessions(last_session_date);
 
   for(let i=0; i < sessions.length; i++){
      let session_id = sessions[i].sessionId;
        let response = await apiFirstBeatSessionResults(session_id);
        processFBsession(response, session_id);
        last_session_date = sessions[i].endTime;
        }
   }


