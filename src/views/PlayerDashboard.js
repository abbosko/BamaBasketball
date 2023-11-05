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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import {useLocation} from "react-router-dom";

import { getDatabase, ref, get} from "firebase/database";
import { initializeApp } from 'firebase/app';

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
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
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
        <h1>Player Statisitcs</h1>
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
                      if(val.player_id == location.state.kinexon_id) {
                        return (
                          <>
                            <tr>
                              <td>Accumulated Acceleration Load</td>
                              <td>{val.accel_load_accum}</td>
                            </tr>
                            <tr>
                              <td>Accumulated Acceleration Load per Min</td>
                              <td>{val.accel_load_accum_avg_per_minute}</td>
                            </tr>
                            <tr>
                              <td>Changes of Orientation</td>
                              <td>{val.event_count_change_of_orientation}</td>
                            </tr>
                            <tr>
                              <td>Duration</td>
                              <td>{val.duration}</td>
                            </tr>
                            <tr>
                              <td>Jump Count</td>
                              <td>{val.event_count_jump}</td>
                            </tr>
                            <tr>
                              <td>Max Jump Height</td>
                              <td>{val.jump_height_max} ft</td>
                            </tr>
                            <tr>
                              <td>Max Speed</td>
                              <td>{val.speed_max} mph</td>
                            </tr>
                            <tr>
                              <td>Total Distance (Session)</td>
                              <td>{val.distance_total} mi</td>
                            </tr>
                            <tr>
                              <td>Total Distance (Week)</td>
                              <td>**put on week table</td>
                            </tr>
                          </>
                        )
                      }
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
                      if(val.player_id == location.state.hawkins_id) {
                        return (
                          <>
                            <tr>
                              <td>LR Brake Force</td>
                              <td>{val.LRBrakeForce} %</td>
                            </tr>
                            <tr>
                              <td>Time to Takeoff</td>
                              <td>{val.timeTakeoff} s</td>
                            </tr>
                            <tr>
                              <td>Peak Relative Propulsive Power</td>
                              <td>{val.prpp} W/kg</td>
                            </tr>
                            <tr>
                              <td>Propulsive Net Impulse</td>
                              <td>{val.propNetImp} N.s</td>
                            </tr>
                            <tr>
                              <td>mRSI</td>
                              <td>{val.mRSI}</td>
                            </tr>
                            <tr>
                              <td>Jump Height</td>
                              <td>{val.jumpHeight} m</td>
                            </tr>
                            <tr>
                              <td>Brake Power</td>
                              <td>{val.brakePwr} W</td>
                            </tr>
                            <tr>
                              <td>Brake Phase</td>
                              <td>{val.brakePhase} s</td>
                            </tr>
                            <tr>
                              <td>Brake Net Impulse</td>
                              <td>{val.brakeNetImp} N.s</td>
                            </tr>
                          </>
                        )
                      }
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
                      if(val.player_id == location.state.firstbeat_id) {
                        return (
                          <>
                            <tr>
                              <td>Trimp</td>
                              <td>{val.trimp}</td>
                            </tr>
                            <tr>
                              <td>Total Energy Consumption</td>
                              <td>{val.energyConsumptionTotal} kcal</td>
                            </tr>
                            <tr>
                              <td>Status Score</td>
                              <td>{val.playerStatusScore}</td>
                            </tr>
                          </>
                        )
                      }
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
                    <h5 className="card-category">Player Stats</h5>
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
                          Monthly
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
                          Weekly
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
                          Daily
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
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
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
                <h5 className="card-category">Player Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Training Status
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Player Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  mRSI
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Player Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> Jump Height
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Player Stats</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Brake Phase
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
        </Row>
      </div>
    </>
  );
}

export default PlayerDashboard;