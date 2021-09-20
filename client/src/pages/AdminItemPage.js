// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {TableAdminItem} from '../components';
import {NavbarAdmin} from '../components'


function Home() {
  // const URL = "http://localhost:3000"
  // const [courses, setCourses] = useState([])

  // useEffect(() => {
  //   getCourses()
  // }, [])
  // const getCourses = async () => {
  //   try{
  //     let result = await axios({
  //       method : 'GET',
  //       url: `${URL}/courses`
  //     })
  //     setCourses(result.data)

  //   }catch(err){
  //     console.log(err)
  //   }
  // }
return (
        <div container = "container-center">
          <NavbarAdmin/>
          <h1 className="text-center">Admin Page : User Item Status </h1>
            <TableAdminItem/>
        </div>
    )
}

export default Home
