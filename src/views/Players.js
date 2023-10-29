import React from "react";
import {Link} from "react-router-dom";
import { getDatabase, ref, get} from "firebase/database";

import { initializeApp } from 'firebase/app';

//import {getPlayerWrap} from '../apiFunctions.js'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";


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
;


async function getPlayers(){
  const db = getDatabase(app);
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
  return data;
  }
const playerList = await getPlayerWrap();


function Players() {

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Athletes</CardTitle>
                <p className="category">CLick name to view athlete dashboard</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                <thead className="text-primary">
                    <tr>
                      <th>Athelte</th>
                      <th>Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(playerList).map((val, key) => {
                    return (
                        <tr>
                            <td> <Link to={"/admin/playerDashboard/" + val.number} style = {{ color: '#FFF' }}>{val.fname} {val.lname} </Link></td>
                            <td>{val.number}</td>
                        </tr>
                    )
                })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Players;