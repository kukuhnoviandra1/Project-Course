import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalUserEdit } from '../components';
import { motion } from "framer-motion"
import Fade from 'react-reveal/Fade';

function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        birthday: '',
        gender: '',
        avatar: '',
    });
    
    const [openModal, setOpenModal] = useState(false)
    
    const URL = "http://localhost:3000";

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try{
            const access_token = localStorage.getItem('access_token')
            let result = await axios ({
                method: 'GET',
                url: `${URL}/users/profile`,
                headers: {
                    access_token
                }
            })
            setUser(result.data)
        } catch(err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    var tempBirth = user.birthday.slice().split('T');
    var birthday = tempBirth[0];

    return (
        <>
        <Fade >
        <div className="container space-enter">
            <div className="middle">
            <div className="card card-details text-white bg-dark mt-2">
                <img src={`http://localhost:3000/${user.avatar}`} className="card-img-top" alt="..."/>
                    <div className="card-body text-white bg-dark">
                        <h5 className="card-title">{user.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-white bg-dark middle">Gender: {user.gender}</li>
                                <li className="list-group-item text-white bg-dark middle">Birthday: {birthday}</li>
                                {
                                    openModal
                                    &&
                                    <ModalUserEdit setOpenModal={setOpenModal} username={user.name} gender={user.gender} type={user.type} avatar={user.avatar}/>
                                }
                                <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 1.0 }}>
                                <button className="btn btn-info btn-sm openModal space-enter" 
                                onClick={() => setOpenModal(true)}>
                                    Edit Profile
                                </button>
                                </motion.div>
                            </ul>
                    </div>
                </div>
            </div>
            
        </div>
        </Fade>
        </>
    )
}

export default UserProfile
