/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {call_set_apis} from '../variables/apiFunctions.js'

import { getDatabase, ref, get} from "firebase/database";
import { initializeApp } from 'firebase/app';
//import {call_set_apis} from 'variables/apiFunctions.js'


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //Label,
  //FormGroup,
  //Input,
  Table,
  Row,
  Col,
  //UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  dashboardFirstbeatData,
  dashboardExample2,
  dashboardExample3,
  dashboardExample4,
} from "variables/charts.js";

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

// hawkin data
async function getPlayerHawk(){
  const db = getDatabase(app);
  const hawkRef = ref(db, 'HawkinStats/2023-10-24');
  let snapshot = await get(hawkRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }       
}
  
export async function getHawkWrap(){
  let data = await getPlayerHawk();
  return data;
}
const hawkList = await getHawkWrap();

// kinexon data
async function getPlayerKinexon(){
  const db = getDatabase(app);
  const kinRef = ref(db, 'KinexonStats/2023-10-27 14:34:15');
  let snapshot = await get(kinRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }      
}
  
export async function getKinexonWrap(){
  let data = await getPlayerKinexon();
  return data;
}
const kinList = await getKinexonWrap();

// function to get average stats
// async function getAverage(){
//   var average = 0;
//   var counter = 0;

//   {Object.values(kinList).map((val, key) => { 
//     average += val.accel_load_accum;
//     counter ++;
//   })}

//   return average/counter;
// }
// firstbeat data
async function getPlayerFB(){
  const db = getDatabase(app);
  const fbRef = ref(db, 'FirstbeatStats/2023-11-01');
  let snapshot = await get(fbRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }       
}
  
export async function getFBWrap(){
  let data = await getPlayerFB();
  return data;
}
const fbList = await getFBWrap();

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  /*const [chart2Data, setChart2Data] = React.useState("data1");
  const stChart2Data = (name) => {
    setChart2Data(name);
  };*/

  // calls apis on reload and on timer
  // useEffect(() => {
  //   call_set_apis();
  //   setInterval(call_set_apis, 1000 * 60 * 60)
  //   }, []);
    
  return (
    <>
      <div className="content">
        <h1>Team Locker Room</h1>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Firstbeat Team Stats</h5>
                    <CardTitle tag="h2">Heart Rate Data</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Trimp
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Training Stat
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Calories
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardFirstbeatData[bigChartData]}
                    options={dashboardFirstbeatData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkins Team Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-time-alarm text-success"  /> Time to Takeoff
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardExample2.data}
                    options={dashboardExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkins Team Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-sound-wave text-success"  />{" "}
                  mRSI
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboardExample3.data}
                    options={dashboardExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkins Team Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-user-run text-success" /> Jump Height
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardExample4.data}
                    options={dashboardExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkins Team Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-trophy text-info" /> Braking Phase
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardExample2.data}
                    options={dashboardExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="9">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Kinexon Team Stats</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Object.values(kinList).map((val, key) => {
                        let ans = Object.values(val).map((val2, key2) => {
                          var accAccVal = 0;
                          var accAccCount = 0;
                          accAccVal += val2.accel_load_accum;
                          accAccCount =+ 1;
                          var accAccAv = accAccVal/accAccCount;
                      return(
                      <>
                        <tr>
                          <td>Date</td>
                          <td>--</td>
                        </tr>
                        <tr>
                          <td>Accumulated Acceleration Load</td>
                          <td>{accAccAv}</td>
                        </tr>
                        <tr>
                          <td>Accumulated Acceleration Load per Minute</td>
                          <td>--</td>
                        </tr>
                        <tr>
                          <td>Total Distance</td>
                          <td>--</td>
                        </tr>
                        <tr>
                          <td>Changes of Orientation</td>
                          <td>--</td>
                        </tr>
                        <tr>
                          <td>Max Speed</td>
                          <td>-- mph</td>
                        </tr>
                        <tr>
                          <td>Max Jump Height</td>
                          <td>-- ft</td>
                        </tr>
                        <tr>
                          <td>Jump Count</td>
                          <td>--</td>
                        </tr>
                      </>
                         ) } )
                        return ans;
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

export default Dashboard;
