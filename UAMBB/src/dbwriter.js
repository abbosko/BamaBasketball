require('dotenv').config({path:"./.env"}); 
const token = require('./genToken.js');

import { getDatabase, ref, set, } from "firebase/database";
import { initializeApp } from 'firebase/app';


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

class FirstbeatSession{
  constructor(trimp, engConsumption, playerStatusScore, fbathleteId){
      this.trimp = trimp;
      this.engConsumption = engConsumption;
      this.playerStatusScore = playerStatusScore;
      this.fbathleteId = fbathleteId
  }
}