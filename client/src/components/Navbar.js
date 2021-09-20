import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";


function Navbar({ login, userLogin }) {
  const [user, setUser] = useState({});
  const history = useHistory();

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
    adminLogin();
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    userLogin(false);
    localStorage.clear();
    Swal.fire("Logout Berhasil", `Datang Kembali Ya.`, "success");
    history.push("/");
  };
  const actionHandler = (e) => {
    e.preventDefault();
    Swal.fire("Not Allowed!", `Masuk Atau Daftar Terlebih Dahulu`, "error");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            K-Academy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container">
            <form className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Search Courses"
              />
            </form>
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.0 }}
              >
                <li className="nav-item">
                  { login && user.type === "user" ? (
                    <Link
                    
                      className="nav-link active"
                      aria-current="page"
                      to="/courses/carts"
                    >
                      
                      <i class="fas fa-shopping-cart"></i>
                      
                    </Link>
                    
                  ) : login && user.type === 'admin' ? (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/admin">
                        CMS
                      </Link>
                    </li>
                  ) : (
                    <Link
                      className="nav-link active"
                      to="#"
                      onClick={(e) => actionHandler(e)}
                    >
                      <i class="fas fa-shopping-cart"></i>
                    </Link>
                  )}
                </li>
              </motion.div>
            </ul>
          </div>
          <DropdownButton
            title={login ? user.name : "Akun"}
            variant="dark"
            menuVariant="dark"
          >
            {login && user.type === "admin" ? (
              <>
                <Dropdown.Item style={{ padding: "0px", margin: "0px" }}>
                  <button
                    className="btn nav-link text-light"
                    onClick={(e) => logoutHandler(e)}
                  >
                    Logout
                  </button>
                </Dropdown.Item>
              </>
            ) : login && user.type === "user" ? (
              <>
                <Dropdown.Item style={{ padding: "0px", margin: "0px" }}>
                  <Link className="nav-link text-light" to="/user/profile">
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item style={{ padding: "0px", margin: "0px" }}>
                  <button
                    className="btn nav-link text-light"
                    onClick={(e) => logoutHandler(e)}
                  >
                    Logout
                  </button>
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item style={{ padding: "0px", margin: "0px" }}>
                  <Link className="nav-link text-light" to="/users/register">
                    Daftar!
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item style={{ padding: "0px", margin: "0px" }}>
                  <Link className="nav-link text-light" to="/users/login">
                    Masuk
                  </Link>
                </Dropdown.Item>
              </>
            )}
          </DropdownButton>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
