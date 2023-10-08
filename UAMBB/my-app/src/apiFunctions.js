require('dotenv').config({path:"./.env"}); 
const token = require('./genToken.js');

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

let fbAuth = 'Bearer ' + token.genFbToken();

const apiFirstBeatTest = () => {
    fetch(process.env.FIRSTBEAT_URL, {
        headers: {
            Authorization: fbAuth,
            "X-Api-Key": process.env.FIRSTBEAT_API_KEY
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

apiFirstBeatTest();