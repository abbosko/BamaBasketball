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
import { useRef } from "react";
import {getData} from '../export.js';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";

import {useLocation} from "react-router-dom";

import { getDatabase, ref, get, query, limitToLast} from "firebase/database";
import { initializeApp } from 'firebase/app';
import { useReactToPrint } from 'react-to-print';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import {
  chart_options,
  chart2_options,
  chart3_options,
} from "../variables/charts.js"

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


// hawkin data
async function getPlayerHawk(){
  const hawkRef = query(ref(db, 'HawkinStats/'), limitToLast(1));
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

var hawkMatrix = [];
async function getGraphHawk(){
  const hawkRef = query(ref(db, 'HawkinStats/'), limitToLast(7));
  let snapshot = await get(hawkRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }      
}
  
export async function getHawkGraphWrap(){
  let data = await getGraphHawk();
  {Object.values(data).map((val, key) => {
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.player_id, val2.jumpHeight, val2.mRSI, val2.timeTakeoff, val2.brakePhase, val2.prpp, val2.brakePwr, val2.brakeNetImp, val2.propNetImp, val2.LRBrakeForce);
      hawkMatrix.push(arr);
    })
  })}
}
getHawkGraphWrap();


// kinexon data
async function getPlayerKinexon(){
  const kinRef = query(ref(db, 'KinexonStats/'), limitToLast(1));
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

var kinexonMatrix = [];
async function getGraphKinexon(){
  const kinRef = query(ref(db, 'KinexonStats/'), limitToLast(7));
  let snapshot = await get(kinRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }      
}
  
export async function getKinexonGraphWrap(){
  let data = await getGraphKinexon();
  {Object.values(data).map((val, key) => {
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.player_id, val2.accel_load_accum, val2.accel_load_accum_avg_per_minute, val2.event_count_change_of_orientation, val2.duration, val2.event_count_jump, val2.jump_height_max, val2.speed_max, val2.distance_total);
      kinexonMatrix.push(arr);
    })
  })}
}
getKinexonGraphWrap();

// firstbeat data
async function getPlayerFB(){
  const fbRef = query(ref(db, 'FirstbeatStats/'), limitToLast(1));
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

var fbMatrix = [];
async function getGraphFB(){
  const fbRef = query(ref(db, 'FirstbeatStats/'), limitToLast(7));
  let snapshot = await get(fbRef);
  
  if (snapshot.exists()) {
    let snap  = await snapshot.val();
    return snap;
  } else {
    console.log("No data available");
  }      
}
  
export async function getFBGraphWrap(){
  let data = await getGraphFB();
  {Object.values(data).map((val, key) => {
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.player_id, val2.energyConsumptionTotal, val2.playerStatusScore, val2.trimp);
      fbMatrix.push(arr);
    })
  })}
}
getFBGraphWrap();

// get data list & return data struct for graph
function graphData(mtx, id, col, unit, c) {
  let data_arr = [];

  // iterate through matrix & push back players' data on array
  for(let i = 0; i < mtx.length; i++) {
    if(mtx[i][0] == id) {
      data_arr.push(mtx[i][col]);
    }
  }

  return {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: unit,
        fill: true,
        backgroundColor: "",
        borderColor: c,
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data_arr,
      },
    ],
  };
};

function setStartDate(date) {
  
}

function PlayerDashboard(props) {
  const location = useLocation();
  var data = [];
  const getDataL = (kin_id, fb_id, hawk_id) =>{
    Object.values(kinList).map((val, key) => {
    let ans = Object.values(val).map((val2, key2) => {
      if(val2.player_id == kin_id) {
          data = [val2.accel_load_accum, val2.accel_load_accum_avg_per_minute, val2.event_count_change_of_orientation, val2.event_count_jump, val2.jump_height_max, val2.speed_max, val2.distance_total]
        }})})

    Object.values(hawkList).map((val, key) => {
      let ans = Object.values(val).map((val2, key2) => {
        if(val2.player_id == hawk_id) {
            data.push([val2.brakePhase,val2.brakePwr,val2.brakeNetImp,val2.jumpHeight,val2.mRSI,val2.LRBrakeForce,val2.prpp,val2.propNetImp,val2.timeTakeoff])}})})
        
    Object.values(fbList).map((val, key) => {
      let ans = Object.values(val).map((val2, key2) => {
        if(val2.player_id == fb_id) {
          data.push([val2.energyConsumptionTotal,val2.trimp,val2.playerStatusScore])}})})
  
        
    getData(data);
        };
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
  return (
    <>
        
      <div ref={componentRef} className="content">
        <h1>Player Statistics</h1>
        <h2 style={{color: '#a9a9a9'}}>{location.state.fname} {location.state.lname}</h2>
        <Row>
          <Col xs="4">   
          <Button color="danger" className="animation-on-hover" onClick = {() => getDataL(location.state.kinexon_id, location.state.firstbeat_id, location.state.hawkins_id)}>Export CSV</Button>
          <Button color="danger" className="animation-on-hover" onClick = {handlePrint}>Export PDF</Button>
    
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Kinexon Stats</CardTitle>
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
                          if(val2.player_id == location.state.kinexon_id) {
                            return (
                              <>
                                <tr><td>Accumulated Acceleration Load</td><td>{val2.accel_load_accum}</td></tr>
                                <tr><td>Accumulated Acceleration Load per Min</td><td>{val2.accel_load_accum_avg_per_minute}</td></tr>
                                <tr><td>Changes of Orientation</td><td>{val2.event_count_change_of_orientation}</td></tr>
                                <tr><td>Jump Count</td><td>{val2.event_count_jump}</td></tr>
                                <tr><td>Max Jump Height</td><td>{val2.jump_height_max} ft</td></tr>
                                <tr><td>Max Speed</td><td>{val2.speed_max} mph</td></tr>
                                <tr><td>Total Distance (Session)</td><td>{val2.distance_total} mi</td></tr>
                              </>
                            )
                          }
                        })
                        return ans;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Hawkin Stats</CardTitle>
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
                    {Object.values(hawkList).map((val, key) => {
                      let ans = Object.values(val).map((val2, key2) => {
                        if(val2.player_id == location.state.hawkins_id) {
                          return (
                            <>
                              <tr><td>Brake Phase</td><td>{val2.brakePhase} s</td></tr>
                              <tr><td>Brake Power</td><td>{val2.brakePwr} W</td></tr>
                              <tr><td>Brake Net Impulse</td><td>{val2.brakeNetImp} N.s</td></tr>
                              <tr><td>Jump Height</td><td>{val2.jumpHeight} m</td></tr>
                              <tr><td>mRSI</td><td>{val2.mRSI}</td></tr>
                              <tr><td>LR Brake Force</td><td>{val2.LRBrakeForce} %</td></tr>
                              <tr><td>Peak Relative Propulsive Power</td><td>{val2.prpp} W/kg</td></tr>
                              <tr><td>Propulsive Net Impulse</td><td>{val2.propNetImp} N.s</td></tr>
                              <tr><td>Time to Takeoff</td><td>{val2.timeTakeoff} s</td></tr>
                            </>
                          )
                        }
                      })
                      return ans;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">FirstBeat Stats</CardTitle>
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
                    {Object.values(fbList).map((val, key) => {
                      let ans = Object.values(val).map((val2,key2) => {
                        if(val2.player_id == location.state.firstbeat_id) {
                          return (
                            <>
                              <tr><td>Total Energy Consumption</td><td>{val2.energyConsumptionTotal} kcal</td></tr>
                              <tr><td>Trimp</td><td>{val2.trimp}</td></tr>
                              <tr><td>Status Score</td><td>{val2.playerStatusScore}</td></tr>
                            </>
                          )
                        }
                      })
                      return ans;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>          
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Firstbeat Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Trimp
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(fbMatrix, location.state.firstbeat_id, 3, "Trimp", "#ff5ed1")}
                    options={chart_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Firstbeat Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Training Status Score
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(fbMatrix, location.state.firstbeat_id, 2, "Status", "#ff5ed1")}
                    options={chart_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Firstbeat Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Total Energy Consumption
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(fbMatrix, location.state.firstbeat_id, 1, "Calories", "#ff5ed1")}
                    options={chart_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />{" "}
                  Accumulated Acceleration Load
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id , 1, "AAL", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Accumulated Accelerated Load/min
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 2, "AAL/min", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Total Distance
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 8, "mi", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Max Speed
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 7, "mph", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Max Jump Height
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 6, "ft", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Jump Count
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 5, "Count", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Kinexon Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Changes of Orientation
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(kinexonMatrix, location.state.kinexon_id, 3, "Changes", "#66edff")}
                    options={chart2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Jump Height
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 1, "m", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> mRSI
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 2, "mRSI", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Time to Takeoff
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 3, "s", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Braking Phase
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 4, "s", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Peak Relative Propulsive Power
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 5, "W/kg", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Braking Power
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 6, "W", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Braking Net Impusle
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 7, "N.s", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Propulsive Net Impulse
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 8, "N.s", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Hawkin Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> L/R Avg. Braking Force
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={graphData(hawkMatrix, location.state.hawkins_id, 9, "%", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PlayerDashboard;