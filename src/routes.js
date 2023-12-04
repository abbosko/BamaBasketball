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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import Players from "views/Players.js"
import Team from "views/Team.js"
import PlayerDashboard from "views/PlayerDashboard.js";
import SignIn from "views/SignIn.js";
import { getPlayerWrap } from "./views/Players.js";

const playerlist = await getPlayerWrap();
const dashroutes = Object.values(playerlist).map((val, key) => {
  return (
  {
    path: "/playerDashboard/" + val.number,
    params: val,
    name: "Player Dashboard",
    side: "False",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-trophy",
    component: <PlayerDashboard />,
    layout: "/admin",
  }
  )
}
)

var routes = [
  {
    path: "/dashboard",
    name: "Team Dashboard",
    side: "True",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-trophy",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/players",
    name: "Players",
    side: "True",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-badge",
    component: <Players />,
    layout: "/admin",
  },
  {
    path: "/playerDashboard",
    name: "Player Dashboard",
    side: "False",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-trophy",
    component: <PlayerDashboard />,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "SignIn",
    side: "False",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: <SignIn />,
    layout: "/admin",
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    side: "False",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
].concat(dashroutes);


export default routes;
