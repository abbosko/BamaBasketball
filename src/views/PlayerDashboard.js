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

import {useLocation} from "react-router-dom";

import { getDatabase, ref, get, query, limitToLast} from "firebase/database";
import { initializeApp } from 'firebase/app';
import {call_set_apis} from 'variables/apiFunctions.js';

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
  firstbeatData,
  duration,
  accumAccelLoad,
  accumAccelLoadMin,
  totalDistance,
  maxSpeed,
  maxJumpHeight,
  jumpCount,
  changesOfOrientation,
  hawkJumpHeight,
  mRSI,
  timeToTakeoff,
  brakingPhase,
  peakRelativePropulsivePower,
  brakingPower,
  brakingNetImpulse,
  propulsiveNetImpulse,
  LRAvgBrakingForce,
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
const date = '2023-10-24';
//const date = new Date().toJSON().slice(0, 10);
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


// kinexon data
async function getPlayerKinexon(){
  const db = getDatabase(app);
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

// firstbeat data
async function getPlayerFB(){
  const db = getDatabase(app);
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


function PlayerDashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  /*const [chart2Data, setChart2Data] = React.useState("data1");
  const stChart2Data = (name) => {
    setChart2Data(name);
  };*/


  const location = useLocation();

  return (
    <>
      <div className="content">
        <h1>Player Statistics</h1>
        <h2 style={{color: '#a9a9a9'}}>{location.state.fname} {location.state.lname}</h2>
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
                        let ans = Object.values(val).map((val2, key2) => {
                          if(val2.player_id == location.state.kinexon_id) {
                            return (
                              <>
                                <tr>
                                  <td>Accumulated Acceleration Load</td>
                                  <td>{val2.accel_load_accum}</td>
                                </tr>
                                <tr>
                                  <td>Accumulated Acceleration Load per Min</td>
                                  <td>{val2.accel_load_accum_avg_per_minute}</td>
                                </tr>
                                <tr>
                                  <td>Changes of Orientation</td>
                                  <td>{val2.event_count_change_of_orientation}</td>
                                </tr>
                                <tr>
                                  <td>Duration</td>
                                  <td>{val2.duration}</td>
                                </tr>
                                <tr>
                                  <td>Jump Count</td>
                                  <td>{val2.event_count_jump}</td>
                                </tr>
                                <tr>
                                  <td>Max Jump Height</td>
                                  <td>{val2.jump_height_max} ft</td>
                                </tr>
                                <tr>
                                  <td>Max Speed</td>
                                  <td>{val2.speed_max} mph</td>
                                </tr>
                                <tr>
                                  <td>Total Distance (Session)</td>
                                  <td>{val2.distance_total} mi</td>
                                </tr>
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
                              <tr>
                                <td>LR Brake Force</td>
                                <td>{val2.LRBrakeForce} %</td>
                              </tr>
                              <tr>
                                <td>Time to Takeoff</td>
                                <td>{val2.timeTakeoff} s</td>
                              </tr>
                              <tr>
                                <td>Peak Relative Propulsive Power</td>
                                <td>{val2.prpp} W/kg</td>
                              </tr>
                              <tr>
                                <td>Propulsive Net Impulse</td>
                                <td>{val2.propNetImp} N.s</td>
                              </tr>
                              <tr>
                                <td>mRSI</td>
                                <td>{val2.mRSI}</td>
                              </tr>
                              <tr>
                                <td>Jump Height</td>
                                <td>{val2.jumpHeight} m</td>
                              </tr>
                              <tr>
                                <td>Brake Power</td>
                                <td>{val2.brakePwr} W</td>
                              </tr>
                              <tr>
                                <td>Brake Phase</td>
                                <td>{val2.brakePhase} s</td>
                              </tr>
                              <tr>
                                <td>Brake Net Impulse</td>
                                <td>{val2.brakeNetImp} N.s</td>
                              </tr>
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
                              <tr>
                                <td>Trimp</td>
                                <td>{val2.trimp}</td>
                              </tr>
                              <tr>
                                <td>Total Energy Consumption</td>
                                <td>{val2.energyConsumptionTotal} kcal</td>
                              </tr>
                              <tr>
                                <td>Status Score</td>
                                <td>{val2.playerStatusScore}</td>
                              </tr>
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
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Kinexon Stats</h5>
                    <CardTitle tag="h2">Training Impulse</CardTitle>
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
                          Training Status
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
                  <Bar
                    data={firstbeatData[bigChartData]}
                    options={firstbeatData.options}
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
                  <i className="tim-icons icon-bell-55 text-info" /> Duration
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={duration.data}
                    options={duration.options}
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
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Accumulated Acceleration Load
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={accumAccelLoad.data}
                    options={accumAccelLoad.options}
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
                  <i className="tim-icons icon-send text-success" /> Accumulated Accelerated Load/min
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={accumAccelLoadMin.data}
                    options={accumAccelLoadMin.options}
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
                    data={totalDistance.data}
                    options={totalDistance.options}
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
                    data={maxSpeed.data}
                    options={maxSpeed.options}
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
                    data={maxJumpHeight.data}
                    options={maxJumpHeight.options}
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
                    data={jumpCount.data}
                    options={jumpCount.options}
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
                    data={changesOfOrientation.data}
                    options={changesOfOrientation.options}
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
                    data={hawkJumpHeight.data}
                    options={hawkJumpHeight.options}
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
                    data={mRSI.data}
                    options={mRSI.options}
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
                    data={timeToTakeoff.data}
                    options={timeToTakeoff.options}
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
                    data={brakingPhase.data}
                    options={brakingPhase.options}
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
                    data={peakRelativePropulsivePower.data}
                    options={peakRelativePropulsivePower.options}
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
                    data={brakingPower.data}
                    options={brakingPower.options}
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
                    data={brakingNetImpulse.data}
                    options={brakingNetImpulse.options}
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
                    data={propulsiveNetImpulse.data}
                    options={propulsiveNetImpulse.options}
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
                    data={LRAvgBrakingForce.data}
                    options={LRAvgBrakingForce.options}
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