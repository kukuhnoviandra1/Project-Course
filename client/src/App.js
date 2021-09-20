import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer } from "./components";
import {
  UserLogin,
  UserRegister,
  Home,
  Cart,
  AdminPage,
  CourseAdd,
  CourseEdit,
  CourseDetails,
  UserProfile,
  AdminOrderPage,
  AdminCartPage,
  AdminUserPage,
  AdminItemPage,
  Order,

} from "./pages";

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };
  const userLogin = (param) => {
    setLogin(param);
  };

  const adminLogin = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "GET",
        url: "http://localhost:3000/users/:id",
        headers: { access_token },
      });
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
      adminLogin();
    } else {
      setLogin(false);
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Navbar login={login} userLogin={userLogin} />
      {login && user.type === "user" ? (
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <Home login={login} />
            </Route>
            <Route exact path="/courses/details/:id">
              <CourseDetails />
            </Route>
            <Route exact path="/user/profile/">
              <UserProfile />
            </Route>
            <Route exact path="/courses/carts/">
              <Cart />
            </Route>
            <Route exact path="/courses/orders/">
              <Order />
            </Route>
            <Route exact path="/courses/orders/">
              <Order />
            </Route>
          </Switch>
        </div>
      ) : login && user.type === "admin" ? (
        <Switch>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          <Route exact path="/">
            <Home login={login} />
          </Route>
          <Route exact path="/courses/add/">
            <CourseAdd />
          </Route>
          <Route exact path="/courses/edit/:id">
            <CourseEdit />
          </Route>
          <Route exact path="/courses/details/:id">
            <CourseDetails />
          </Route>
          <Route exact path="/reports/orders">
            <AdminOrderPage />
          </Route>
          <Route exact path="/reports/carts">
            <AdminCartPage />
          </Route>
          <Route exact path="/reports/users">
            <AdminUserPage />
          </Route>
          <Route exact path="/reports/items">
            <AdminItemPage />
          </Route>
        </Switch>
      ) : (
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <Home login={login} />
            </Route>
            <Route exact path="/users/login">
              <UserLogin userLogin={userLogin} getToken={getToken} />
            </Route>
            <Route exact path="/users/register">
              <UserRegister userLogin={userLogin} getToken={getToken} />
            </Route>
            <Route exact path="/courses/details/:id">
            <CourseDetails />
          </Route>
          </Switch>
        </div>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
