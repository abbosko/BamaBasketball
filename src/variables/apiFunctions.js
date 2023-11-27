import { ref, set, get} from "firebase/database";
import * as http from 'http';


import * as constants from '../constants.js'
import {db} from '../index.js'
import { genHawkinToken, genToken} from '../genToken.js';

 
// set up 
//const token = genToken();


// const dbListener = ref(db, 'KinexonStats');
// onValue(dbListener, (snapshot) => {
//   const data = snapshot.val();
//   PlayerDashboard(postElement, data);
// });
export async function addPlayer(){
    // call apis to get IDS
    // set in player table
}

export async function call_set_apis() {
   // setFirstBeatSessions();
    //setKinexonStats();
    setHawkins();
}

// get player functions, needed for adding new players

// when adding new player, call api to get player id
export async function getKinexonPlayers(){
    let kinexonplayers = [];
    kinexonplayers = await fetch(('https://corsproxy.io/?' + constants.KINEXON_URL).concat('/teams/6/sessions-and-phases?min=', min_session_date, '&max=', today, '&apiKey=', constants.KINEXON_API_KEY), {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(constants.KINEXON_API_USERNAME + ':' + constants.KINEXON_API_PASSWORD).toString('base64')
        },
});

    let kinexonResponse = await kinexonplayers.json();
    for(let i = 0; i < kinexonResponse.data.length; i++) {     // loop through all measurments & hawkStruct w the data, push this onto h
        const m = kinexonResponse.data[i];

    }
    return kinexonplayers;
}



//firstbeat = apiFirstBeatAthletes
// kinexon = 

export async function getHawkinsPlayers(){
        let hawkPlayer = [];
    
        let hawkinPlayers = await fetch(('https://corsproxy.io/?' + constants.HAWKINS_URL).concat('/athletes'), {
            headers: {
                Authorization: 'Bearer ' + await genHawkinToken()
            }
        });
    
        let hawkinResponse = await hawkinPlayers.json();
        for(let i = 0; i < hawkinResponse.data.length; i++) {     // loop through all measurments & hawkStruct w the data, push this onto h
            const m = hawkinResponse.data[i];

        }
        return hawkPlayer;
    }

const kinexon_players = [79,80,71,76,69,72,75,81,68,66,78,82];

async function getPlayers(){
const playerRef = ref(db, 'Players');
let snapshot = await get(playerRef);

if (snapshot.exists()) {
        let snap  = await snapshot.val();
        return snap;
        // console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
      
}

export async function getPlayerWrap(){
let data = await getPlayers();
return Object.values( data);
}


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

//loaded all data from jan 1 2023 - 10/22
var min_session_date = '2023-06-01%2000%3A00%3A00';
var today = '2023-10-31%2000%3A00%3A00';
const fields = 'accel_load_accum,accel_load_accum_avg_per_minute,distance_total,speed_max,jump_height_max,event_count_jump,event_count_change_of_orientation';
var last_kinexon_session = '2023-10-31%2000%3A00%3A00';

async function getKinexonSessions(){
    // var today = new Date().toISOString();
    // let datetime_array = last_kinexon_session.split('T');
    // let min_session_date = datetime_array[0].toISOString();
    // min_session_date = min_session_date + "T00:00:00Z";
    var today = '2023-11-26%2000%3A00%3A00';

   let response = await fetch(('https://corsproxy.io/?'+ constants.KINEXON_URL).concat('/teams/6/sessions-and-phases?min=', '2023-10-31%2000%3A00%3A00', '&max=', today, '&apiKey=', constants.KINEXON_API_KEY), {
    headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(constants.KINEXON_API_USERNAME + ':' + constants.KINEXON_API_PASSWORD).toString('base64')
        },
    }) 
    
    if (response.ok) { 
        let data = await response.json();
         return data;
        } else { 
            console.log(response.json())
            throw new Error('API request failed'); 
        } 
    

}
//getKinexonSessions();

// have to get one player (and prob one session) at a time bc they dont label the data w any identifiers
async function getapiKinexonStats(kinPlayerId, session_id) {
    var data = 0
    let response  = await fetch(('https://corsproxy.io/?' + constants.KINEXON_URL).concat('/statistics/players/', kinPlayerId, '/session/' + session_id+ '?fields=', fields, '&apiKey=', constants.KINEXON_API_KEY), {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(constants.KINEXON_API_USERNAME + ':' + constants.KINEXON_API_PASSWORD).toString('base64')
        }}); 
   
    if (response.ok) { 
             data = await response.json();
        } 
    else { 
           response.json().then(data => {console.log(data)});
            console.log(data);
            throw new Error('API request failed'); 
        } 

        return data;
}
    
   async function processResults(data, session_id, kinPlayerId, session_date){
        
        console.log(data)
        set(ref(db, 'KinexonStats/' + session_date + '/'+ kinPlayerId), {
            session_id: session_id,
            date: session_date,
            accel_load_accum: data.accel_load_accum,
            accel_load_accum_avg_per_minute: data.accel_load_accum_avg_per_minute,
            distance_total: data.distance_total,
            speed_max: data.speed_max,
            jump_height_max: data.jump_height_max,
            event_count_jump: data.event_count_jump,
            event_count_change_of_orientation: data.event_count_change_of_orientation,
            player_id: kinPlayerId,
        });

}

async function setKinexonStats(){
    let sessions = await getKinexonSessions();
    for(let i=0; i< sessions.length; i++){
         for(let j=0; j< kinexon_players.length; j++){

            let results = await getapiKinexonStats(kinexon_players[j], sessions[i].session_id, sessions[i].start_session);
            if ( results.length == 0) {
                console.log('No data for', kinexon_players[j] )
                continue;
            }
           await processResults(results[0], sessions[i].session_id, kinexon_players[j],sessions[i].start_session);
          
        }
     last_kinexon_session = sessions[i].start_session;
    }
}





/*
* Hawkins API calls! :)
*/

// const test = query(ref(db,'HawkinStats'), limitToLast(1));
// get(test).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

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

const apiHawkinsStats = async (datetime) => {
    let hawkStructArray = [];

    let hawkinStats = await fetch(('https://corsproxy.io/?' + constants.HAWKINS_URL).concat('?from=', datetime), {
        headers: {
            Authorization: 'Bearer ' + await genHawkinToken()
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
    var yesterday = Math.floor((Date.now() - 86400000) / 1000);         // get epoch timestamp from 24 hours ago (in seconds)

    let stats = await apiHawkinsStats(yesterday);
    for(let i = 0; i < stats.length; i++) {
        var d = new Date(0);
        d.setUTCSeconds(stats[i].timestamp);
        var d_array = d.toISOString().split('T');                       // d_array[0] = date, d_array[1] = time

        // fix any null vals
        if(stats[i].athleteId == undefined) stats[i].athleteId = null;
        if(stats[i].jumpHeight == undefined) stats[i].jumpHeight = null;
        if(stats[i].mRSI == undefined) stats[i].mRSI = null;
        if(stats[i].timeTakeoff == undefined) stats[i].timeTakeoff = null;
        if(stats[i].brakePhase == undefined) stats[i].brakePhase = null;
        if(stats[i].prpp == undefined) stats[i].prpp = null;
        if(stats[i].brakePwr == undefined) stats[i].brakePwr = null;
        if(stats[i].brakeNetImp == undefined) stats[i].brakeNetImp = null;
        if(stats[i].propNetImp == undefined) stats[i].propNetImp = null;
        if(stats[i].LRBrakeForce == undefined) stats[i].LRBrakeForce = null;

        set(ref(db, 'HawkinStats/' + d_array[0] + '/' + stats[i].timestamp), {
            date : d_array[0],
            time : d_array[1],
            player_id : stats[i].athleteId,
            jumpHeight : stats[i].jumpHeight,
            mRSI : stats[i].mRSI,
            timeTakeoff : stats[i].timeTakeoff,
            brakePhase : stats[i].brakePhase,
            prpp : stats[i].prpp,
            brakePwr : stats[i].brakePwr,
            brakeNetImp : stats[i].brakeNetImp,
            propNetImp : stats[i].propNetImp,
            LRBrakeForce : stats[i].LRBrakeForce
        });
    }
}

//setHawkins();


/*
* Firstbeat API calls! :)
*/

let fbAuth = 'Bearer ' + await genToken();              // generates authorization token
const teamId = 17688;                                       // UAMBB team id
var fbAthleteArray = [];

// gets athlete info, creates instance of 'FBAthlete', stores in fbAthleteArray
const apiFirstBeatAthletes = () => {
    fetch((constants.FIRSTBEAT_URL).concat('/athletes'), { // add {accountId}/athletes to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": constants.FIRSTBEAT_API_KEY
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

//gets sessions going back to last session date
async function  apiFirstBeatSessions(last_session_date) {
    var data;

    let datetime_array = last_session_date.split('T');
    let session_date = datetime_array[0];

    // const headerDict = {
    //         Authorization: fbAuth,
    //         "X-Api-Key": constants.FIRSTBEAT_API_KEY,
    // }
    // const requestOptions = {
    //     headers: new Headers(headerDict)
    // };
    // let promise =  new Promise((resolve, reject) => {
    //     let url = constants.FIRSTBEAT_URL + '/teams/17688/sessions?fromTime=' + session_date + "T00:00:00Z";
    //     http.get(url, requestOptions)
    //     .toPromise();
    // });
    // let response = await promise.resolve();
    // if (response.ok){
    //     let data = response.json();
    //     return data.sessions;

    // }
    // else {
    //     console.log(response);
    //     throw new Error('API request failed'); 
    //     }
 
            
        
  
    // };


   const response = await fetch(('https://corsproxy.io/?' + constants.FIRSTBEAT_URL + '/teams/17688/sessions?fromTime=' + session_date + "T00:00:00Z"), {  // add teams/{teamId}/sessions to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": constants.FIRSTBEAT_API_KEY,
        },
    });
        if (response.ok) { 
             data = await response.json()
         
        } else { 
            console.log(response);
            throw new Error('API request failed'); 
        } 
        return  data.sessions;
    };


// results for indiv session
async function apiFirstBeatSessionResults(sessionID) {
    var data;

    const token = await genToken();
    let fbAuth = 'Bearer ' + token; 

   const response = await fetch(('https://corsproxy.io/?' + constants.FIRSTBEAT_URL).concat('/teams/', teamId, '/sessions/', sessionID, '/results'), {  // add teams/{teamId}/sessions/{sessionId}/results to url
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": constants.FIRSTBEAT_API_KEY
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
    if (data.measurements == null || (typeof data.measurements == 'undefined')){     // retry if getting {message: Accepted} -- mostly for historical data load, prob could delete
        //return;
        console.log (data.measurements);
        await sleep(100000);
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
        set(ref(db, 'FirstbeatStats/' + session_date + '/'+ session.athlete_id), {
            session_id: session.sessionID,
            date: session_date,
            player_id: session.athlete_id,
            trimp : session.trimp,
            energyConsumptionTotal: session.engConsumption,
            playerStatusScore: session.playerStatusScore,
        });
    }
}
    
var last_session_date = new Date();     // Keeping Last session date in memory to reload from this time
last_session_date.setFullYear(2023,10,27);
last_session_date = last_session_date.toISOString()


// this is the function to call to grab fb data from api and set in db
export async function setFirstBeatSessions(){
    console.log(last_session_date);
  let  sessions = await apiFirstBeatSessions(last_session_date);
 
   for(let i=0; i < sessions.length; i++){
      let session_id = sessions[i].sessionId;
        let response = await apiFirstBeatSessionResults(session_id);
        processFBsession(response, session_id);
        last_session_date = sessions[i].endTime;
        }
   }
