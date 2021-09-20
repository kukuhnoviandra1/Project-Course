import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Carousel} from 'react-bootstrap'
import CardCourse from '../components/CardCourse';

function Home() {
  const URL = "http://localhost:3000"
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, [])
  const getCourses = async () => {
    try{
      let result = await axios({
        method : 'GET',
        url: `${URL}/courses`
      })
      setCourses(result.data)

    }catch(err){
      console.log(err)
    }
  }
    return (
        <div container = "container-center">
            <h1 className="text-center"> Home Page </h1>

  <Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-10"
      style={{width:703,marginLeft:"auto",marginRight:"auto"}} 
      src="https://c4.wallpaperflare.com/wallpaper/966/672/905/javascript-minimalism-wallpaper-preview.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h5 class="text-white">JavaScript</h5>
      <p class="text-white">Mulailah belajar JavaScript, dan ubah hidup mu.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-10"
      style={{width:660,marginLeft:"auto",marginRight:"auto"}} 
      src="https://ml7a1cnkmo5m.i.optimole.com/6IH-QXI-zCN84owO/w:650/h:433/q:auto/https://www.dev-cafe.org/wp-content/uploads/2018/08/python-logo-3.6.gif"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h5 class="text-white">Phyton</h5>
      <p class="text-white">Mulailah belajar Phyton dan ubah hidupmu.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-10"
      style={{width:840,marginLeft:"auto",marginRight:"auto"}} 
      src="https://toghr.com/wp-content/uploads/2020/09/5-600x283.png"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h5 class="text-white">C++</h5>
      <p class="text-white">Mulailah belajar Bahasa C dan jadilah enginner terbaik.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

<div className="row card-course">
          {
            courses.length === 0 ?
            <loadingText/> : courses.map(course=>{
              return <CardCourse key={course.id} course={course}/>
            })
          }
            </div>
        </div>
        
    )
}

export default Home
