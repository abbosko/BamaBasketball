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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";

import { getDatabase, ref, get, query, limitToLast} from "firebase/database";
import { initializeApp } from 'firebase/app';
import { useReactToPrint} from 'react-to-print';

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
    let tempMtx = [];
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.jumpHeight, val2.mRSI, val2.timeTakeoff, val2.brakePhase, val2.prpp, val2.brakePwr, val2.brakeNetImp, val2.propNetImp, val2.LRBrakeForce);
      tempMtx.push(arr);
    })
    hawkMatrix.push(tempMtx);
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
    let tempMtx = [];
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.accel_load_accum, val2.accel_load_accum_avg_per_minute, val2.event_count_change_of_orientation, val2.duration, val2.event_count_jump, val2.jump_height_max, val2.speed_max, val2.distance_total);
      tempMtx.push(arr);
    })
    kinexonMatrix.push(tempMtx);
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
    let tempMtx = [];
    Object.values(val).map((val2, key2) => {
      let arr = new Array(val2.energyConsumptionTotal, val2.playerStatusScore, val2.trimp);
      tempMtx.push(arr);
    })
    fbMatrix.push(tempMtx);
  })}
}
getFBGraphWrap();

/*
* Calculates Averages for a Column in a Matrix
*/
function calcAvg(mtx, col) {
  let sum = 0;
  for(let i = 0; i < mtx.length; i++) {
    sum += mtx[i][col];
  }

  return sum / mtx.length;
}


// Calculates Values for Graphs & Returns Data Context
function graphData(mtx, col, unit, c) {
  let data_arr = [];

  // iterate through matrix & push back avgs of each day of given col (metric) onto array
  for(let i = 0; i < mtx.length; i++) {
    data_arr.push(calcAvg(mtx[i], col));
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

function Dashboard(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles:false,
    documentTitle: "Team Statistics"
  });
  return (
    <>
      <div  className="content">
        <h1>Team Statistics</h1>
        <Button color="danger" className="animation-on-hover" onClick = {handlePrint}>Export PDF</Button>
 <div ref={componentRef}>
        <Row>
          <Col xs="4">
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
                      let kinVals = [];
                      Object.values(val).map((val2, key2) => {
                        if (val2.accel_load_accum != null) kinVals.push(new Array(val2.accel_load_accum, val2.accel_load_accum_avg_per_minute, val2.event_count_change_of_orientation, val2.event_count_jump, val2.jump_height_max, val2.speed_max, val2.distance_total));
                      })
                      return (
                        <>
                          <tr><td>Accumulated Acceleration Load</td><td>{calcAvg(kinVals, 0)}</td></tr>
                          <tr><td>Accumulated Acceleration Load/min</td><td>{calcAvg(kinVals, 1)}</td></tr>
                          <tr><td>Changes of Orientation</td><td>{calcAvg(kinVals, 2)}</td></tr>
                          <tr><td>Jump Count</td><td>{calcAvg(kinVals, 3)}</td></tr>
                          <tr><td>Max Jump Height</td><td>{calcAvg(kinVals, 4)} ft</td></tr>
                          <tr><td>Max Speed</td><td>{calcAvg(kinVals, 5)} mph</td></tr>
                          <tr><td>Total Distance</td><td>{calcAvg(kinVals, 6)} mi</td></tr>
                        </>
                      );
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
                      let hawkVals = [];
                      Object.values(val).map((val2, key2) => {
                        if (val2.jumpHeight != null) hawkVals.push(new Array(val2.jumpHeight, val2.mRSI, val2.timeTakeoff, val2.brakePhase, val2.prpp, val2.brakePwr, val2.brakeNetImp, val2.propNetImp, val2.LRBrakeForce));
                      })
                      return (
                        <>
                          <tr><td>Brake Net Impulse</td><td>{calcAvg(hawkVals, 6)} N.s</td></tr>
                          <tr><td>Brake Phase</td><td>{calcAvg(hawkVals, 3)} s</td></tr>
                          <tr><td>Brake Power</td><td>{calcAvg(hawkVals, 5)} W</td></tr>
                          <tr><td>Jump Height</td><td>{calcAvg(hawkVals, 0)} m</td></tr>
                          <tr><td>mRSI</td><td>{calcAvg(hawkVals, 1)}</td></tr>
                          <tr><td>L/R Average Brake Force</td><td>{calcAvg(hawkVals, 8)} %</td></tr>
                          <tr><td>Peak Relative Propulsive Power</td><td>{calcAvg(hawkVals, 4)} W/kg</td></tr>
                          <tr><td>Propulsive Net Impulse</td><td>{calcAvg(hawkVals, 7)} N.s</td></tr>
                          <tr><td>Time to Takeoff</td><td>{calcAvg(hawkVals, 2)} s</td></tr> 
                        </>
                      );
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
                      let fbVals = [];
                      Object.values(val).map((val2, key2) => {
                        if (val2.trimp != null) fbVals.push(new Array(val2.energyConsumptionTotal, val2.playerStatusScore, val2.trimp));
                      })
                      return (
                        <>
                          <tr><td>Total Energy Consumption</td><td>{calcAvg(fbVals, 0)} kcal</td></tr>
                          <tr><td>Trimp</td><td>{calcAvg(fbVals, 2)}</td></tr>
                          <tr><td>Status Score</td><td>{calcAvg(fbVals, 1)}</td></tr> 
                        </>
                      );
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
                    data={graphData(fbMatrix, 2, "Trimp", "#ff5ed1")}
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
                <div className="chart-area" >
                  <Bar
                    data={graphData(fbMatrix, 1, "Status", "#ff5ed1")}
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
                    data={graphData(fbMatrix, 0, "Calories", "#ff5ed1")}
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
                    data={graphData(kinexonMatrix, 0, "AAL", "#66edff")}
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
                    data={graphData(kinexonMatrix, 1, "AAL/min", "#66edff")}
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
                    data={graphData(kinexonMatrix, 7, "mi", "#66edff")}
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
                    data={graphData(kinexonMatrix, 6, "mph", "#66edff")}
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
                    data={graphData(kinexonMatrix, 5, "ft", "#66edff")}
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
                    data={graphData(kinexonMatrix, 4, "Count", "#66edff")}
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
                    data={graphData(kinexonMatrix, 2, "Changes", "#66edff")}
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
                    data={graphData(hawkMatrix, 0, "m", "#72f760")}
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
                    data={graphData(hawkMatrix, 1, "mRSI", "#72f760")}
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
                    data={graphData(hawkMatrix, 2, "s", "#72f760")}
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
                    data={graphData(hawkMatrix, 3, "s", "#72f760")}
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
                    data={graphData(hawkMatrix, 4, "W/kg", "#72f760")}
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
                    data={graphData(hawkMatrix, 5, "W", "#72f760")}
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
                    data={graphData(hawkMatrix, 6, "N.s", "#72f760")}
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
                    data={graphData(hawkMatrix, 7, "N.s", "#72f760")}
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
                    data={graphData(hawkMatrix, 8, "%", "#72f760")}
                    options={chart3_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
