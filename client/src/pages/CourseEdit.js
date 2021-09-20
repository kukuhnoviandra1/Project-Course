import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function CourseEdit() {
  const params = useParams();
  const id = +params.id;
  const [course, setCourse] = useState({
    name: "",
    description: "",
    category: "",
    sub_category: "",
    price: "",
    duration: "",
    total_materi: "",
    level: "",
    author: "",
    rating: 0,
    student: 0,
  });

  const URL = "http://localhost:3000";
  const history = useHistory();

  useEffect(() => {
    getCoursesById();
    // getcourseImages()
  }, []);

  const getCoursesById = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let course = await axios({
        method: "GET",
        url: `${URL}/courses/${id}`,
        headers: {
          access_token,
        },
      });
      setCourse(course.data);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let item = course;
    // if () {
    //     courseImages.primary === true;
    // }

    editCourses(item);
  };

  const editCourses = async (item) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const {
        name,
        description,
        category,
        sub_category,
        price,
        duration,
        total_materi,
        level,
        author,
        rating,
        student,
      } = item;

      await axios({
        method: "PUT",
        url: `${URL}/courses/update/${id}`,
        headers: {
          access_token,
        },
        data: {
          name,
          description,
          category,
          sub_category,
          price,
          duration,
          total_materi,
          level,
          author,
          rating,
          student,
        },
      });

      Swal.fire(
        `Course updated!`,
        `Course has been successfully updated!`,
        "success"
      );
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="space-enter text-center text-black">Edit Course</h1>
      <div className="container">
        <form className="row g-3 space-enter">
          <div className="row mb-3">
            <label className="text-black col-sm-2 col-form-label">Name: </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) =>
                  setCourse({ ...course, name: e.target.value })
                }
                value={course.name}
              />
            </div>
          </div>
          <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, description: e.target.value})} value={course.description} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, category: e.target.value})} value={course.category}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Sub Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, sub_category: e.target.value})}value={course.sub_category}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Price: </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="name" onChange={(e) => setCourse({...course, price: e.target.value})}value={course.price}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Duration: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, duration: e.target.value})} value={course.duration}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Total Materi: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, total_materi: e.target.value})} value={course.total_materi}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Author: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, author: e.target.value})} value={course.author}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Level: </label>
                        <div className="col-sm-10" onChange={(e) => setCourse({...course, level: e.target.value})} value={course.level}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="name" name="level" value="Beginner"/>
                                <label className="form-check-label text-black" for="Beginner">
                                    Beginner
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="name" name="level" value="Intermediate"/>
                                <label className="form-check-label text-black" for="Intermediate">
                                    Intermediate
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="name" name="level" value="Advanced"/>
                                <label className="form-check-label text-black" for="Advanced">
                                    Advanced
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CourseEdit;
