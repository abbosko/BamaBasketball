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
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Athletes</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Number</th>
                      <th>Dashboard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(playerList).map((val, key) => {
                    return (
                        <tr>
                            <td>{val.fname}</td>
                            <td>{val.lname}</td>
                            <td>{val.number}</td>
                            <td><Link to="/Dashboard"> Dashboard </Link></td>
                        </tr>
                    )
                })}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category">Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
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
