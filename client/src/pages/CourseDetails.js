import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaClock,FaBookOpen,FaLevelUpAlt,FaChalkboardTeacher,FaUserAlt } from 'react-icons/fa';
// import { ModalOrder } from '../components';

function CoursesDetails() {
  const params = useParams();
  const id = +params.id;
  const URL = "http://localhost:3000";
  const history = useHistory();
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      //   const access_token = localStorage.getItem('access_token')
      let result = await axios({
        method: "GET",
        url: `${URL}/courses/${id}`,
        // headers: {
        //     access_token
        // }
      });
      setCourses(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const addCart = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      await axios({
        method: "POST",
        url: `${URL}/line_items/add/${id}`,
        headers: {
          access_token,
        },
        data: courses,
      });
      Swal.fire(`Courses added!`, `Courses added To Cart!`, "success");
      history.push("/courses/carts");
      console.log(access_token);
    } catch (error) {
      Swal.fire("Not Allowed!", `Masuk Atau Daftar Terlebih Dahulu`, "error");
    }
  };
  const AddCartHandler = (e) => {
    console.log(courses);
    addCart();
  };
  console.log(courses);
  return (
    <div>
      <div className="container">
        <div className="middle">
          <div className="card-details col-md-3 col-3 space-enter">
            <div className="card text-white bg-dark space-enter">
              <img
                src={courses?.Course_Contents?.map((content) => {
                  return `http://localhost:3000/tmp/images/${content.filename}`;
                })}
                className="card-img-top"
                style={{ height: "250px" }}
                alt="..."
              />
              <div className="card-body" style={{ height: "3rem" }}>
                <h5 className="card-title text-center">
                  <strong>{courses.name}</strong>
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item text-black bg-white middle"
                  style={{ height: "2.5rem" }}
                >
                  <strong>Rp. {courses.price}</strong>
                </li>
                <li className="list-group-item bg-white text-black">
                  <small>
                    <center>
                      <span>Rating: {courses.rating}</span>
                    </center>
                  </small>
                </li>
                <li
                  className="list-group-item text-black bg-white middle center"
                  style={{ height: "3rem" }}
                >
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => AddCartHandler(true)}
                  >
                    Add To Cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class=" container-card text-center space-enter" >
            <div className="card-header ">Description: </div>
            <div className="card-body">
              <h5 className="card-text">{courses.description}</h5>
            </div>
          </div>
          <div className="card-details col-md-3 col-3 space-enter">
            <div className="card text-black bg-white space-enter">
              <h5 className="card-title middle space-enter text-center" style={{ height: "2rem" }}>
                Detail courses
              </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-white text-black">
                <FaClock /> : {courses.duration}
                </li>
                <li className="list-group-item bg-white text-black">
                <FaBookOpen/> : {courses.total_materi} Materi
                </li>
                <li className="list-group-item bg-white text-black">
                Level <FaLevelUpAlt/> : {courses.level}
                </li>
                <h6
                  className="list-group-item bg-white text-muted"
                  style={{ height: "2.5rem" }}
                >
                  <center>
                    <small><FaChalkboardTeacher/> : {courses.author}</small>
                  </center>
                </h6>
                <h6
                  className="list-group-item bg-white text-black"
                  style={{ height: "2.5rem" }}
                >
                  <FaUserAlt/>: {courses.student}
                </h6>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesDetails;
