import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import Fade from 'react-reveal/Fade';

function CardCourse(props) {
    const { 
        id,
        name, 
        // description, 
        category, 
        price, 
        // duration, 
        // total_materi,
        // level,
        author,
        rating,
        // student,
        Course_Contents
    } = props.course

    return (
<Fade right>
        <div className="col-md-3 col-3 space-enter ">
            <div className="col-md-6">
            <div className="container-fluid">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.0 }}>
            <Link to={`/courses/details/${id}`} className="Link">
            <div className="card bg-light text-black">
                    <img src =
                        {
                            Course_Contents.map(content => {
                                return `http://localhost:3000/tmp/images/${content.filename}`
                            })
                        } 
                    className="card-img-top" style={{height:"150px"}} alt="..."/>
                <div className="card-body" style={{height: "3rem"}}>
                    <h5 className="card-title text-center"><strong>{name}</strong></h5>
                </div>
                <ul className="list-group list-group-flush ">
                    {/* <li className="list-group-item bg-light text-black" style={{height: "2.5rem"}}><small>{description}</small></li> */}
                    <li className="list-group-item bg-light text-black"><small>Category: {category}</small></li>
                    <li className="list-group-item bg-light text-black text-center" style={{height: "2.5rem"}}><strong>Rp. {price}</strong></li>
                    {/* <li className="list-group-item bg-light text-black">Duration: {duration}</li> */}
                    {/* <li className="list-group-item bg-light text-black">Total Materi: {total_materi}</li> */}
                    {/* <li className="list-group-item bg-light text-black">Level: {level}</li> */}
                    <h6 className="list-group-item bg-light text-muted" style={{height: "2.5rem"}}><small>Author: {author}</small></h6>
                    {/* <li className="list-group-item bg-light text-black">Student: {student}</li> */}
                    <li className="list-group-item bg-light text-black">
                        <small><center><span>Rating: {rating}</span></center></small>
                    </li>
                </ul>
            </div>
            </Link>
            </motion.div>
        </div>
        </div>
        </div>
        </Fade>
    )
}

export default CardCourse;