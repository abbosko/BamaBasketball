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
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Players from "views/Players.js"
import Team from "views/Team.js"
import PlayerDashboard from "views/PlayerDashboard.js";
import { getPlayerWrap } from "./views/Players.js";

const playerlist = await getPlayerWrap();
const dashroutes = Object.values(playerlist).map((val, key) => {
  return (
  {
    path: "/playerDashboard/" + val.number,
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
    name: "Dashboard",
    side: "True",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    side: "True",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    side: "True",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    side: "True",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    side: "True",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    side: "True",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
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
    path: "/team",
    name: "Team",
    side: "True",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-trophy",
    component: <Team />,
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
].concat(dashroutes);


export default routes;
