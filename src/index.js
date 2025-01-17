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
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { getDatabase, ref, set, get, child, query, limitToLast} from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AdminLayout from "layouts/Admin/Admin.js";
import { AuthContextProvider } from 'AuthContext.js';
import ProtectedRoute from 'ProtectedRoute.js';

import SignIn from 'views/SignIn.js';
import Dashboard from 'views/Dashboard.js';
import Players from 'views/Players.js';
import UserProfile from 'views/UserProfile.js';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper.js";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper.js";
import PlayerDashboard from "views/PlayerDashboard.js";
import { call_set_apis } from "variables/apiFunctions.js";

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

//const authentication = auth();
export const auth = getAuth(app);
export {app};
export {db};

const root = ReactDOM.createRoot(document.getElementById("root"));
window.onload = call_set_apis(db)

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            {/* Sign-in route - Unprotected */}
            <Route
              path="/admin/SignIn"
              element={
                  <SignIn />
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    {/* Sub-routes within protected routes */}
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="players" element={<Players />} />
                    {/* Add more routes here */}
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            {/* Default route */}
            <Route
              path="*"
              element={<Navigate to="/admin/SignIn" />}
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);