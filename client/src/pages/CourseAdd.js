import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CourseAdd() {
    const [courseContents,setCourseContents] = useState([])
    const [course, setCourse] = useState({
        name:'',
        description:'', 
        category:'',
        sub_category:'',
        price:'', 
        duration:'', 
        total_materi:'',
        level:'',
        author:'',
        rating: 0,
        student: 0,
    });

    const URL = "http://localhost:3000";
    const history = useHistory();

    const submitHandler = (e) => {
        console.log(course);
        e.preventDefault();
        addCourse();
    }

    // const addCourse = async () => {
    //     try {
    //         const access_token = localStorage.getItem('access_token')
    //         await axios({
    //             method: 'POST',
    //             url: `${URL}/courses/add`,
    //             headers: {
    //                 access_token
    //             },
    //             data: course
    //         }) 
    //         Swal.fire(
    //             `Course added!`,
    //             `Course has been successfully added!`,
    //             'success'
    //         );
    //         history.push("/");
    //         console.log(access_token)
    //     } catch (error) {
    //         Swal.fire(
    //             `Error!`,
    //             `${error}`,
    //             'error'
    //         );
    //     }
    // }
    
    const addCourse = async () => {
        try {
          let formData = new FormData();
    
          formData.append("name", course.name);
          formData.append("description", course.description);
          formData.append("category", course.category);
          formData.append("sub_category", course.sub_category);
          formData.append("price", course.price);
          formData.append("duration", course.duration);
          formData.append("total_materi", course.total_materi);
          formData.append("level", course.level);
          formData.append("author", course.author);
          formData.append("rating", course.rating);
          formData.append("student", course.student);
          formData.append("content", courseContents);
        
    
          const access_token = localStorage.getItem("access_token");
          await axios({
            method: "POST",
            url: `${URL}/courses/add`,
            data: formData,
            headers: {
              access_token,
              "Content-Type": "multipart/form-data",
            },
          });
          Swal.fire(
            `Course added!`,
            `Course has been successfully added!`,
            'success'
        );
        history.push("/");
        console.log(access_token)
    } catch (error) {
        Swal.fire(
            `Error!`,
            `${error}`,
            'error'
        );
    }
}

    return (
        <div>
            <h1 className="space-enter text-center text-black">Add Course</h1>
            <div className="container">
                <form className="row g-3 space-enter">
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, name: e.target.value})} placeholder="Course Name"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, description: e.target.value})} placeholder="Course Description"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, category: e.target.value})} placeholder="Category"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Sub Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, sub_category: e.target.value})} placeholder="Sub Category"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Price: </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="name" onChange={(e) => setCourse({...course, price: e.target.value})} placeholder="Rp."/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Duration: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, duration: e.target.value})} placeholder="Hour"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Total Materi: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, total_materi: e.target.value})} placeholder="Total Materi"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Author: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setCourse({...course, author: e.target.value})} placeholder="Author"/>
                        </div>
                    </div>
                    
                                    
                                    <div className="center">
                                         <input type="file" className="form-control" id="content" name="content" 
                                        onChange={(e) => setCourseContents(e.target.files[0])} 
                                        accept="image/*"/>
                                    </div>
                                    

                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Level: </label>
                        <div className="col-sm-10" onChange={(e) => setCourse({...course, level: e.target.value})}>
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
    )
}

export default CourseAdd;
