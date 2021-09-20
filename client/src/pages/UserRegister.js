import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {motion} from "framer-motion"
import Fade from 'react-reveal/Fade';

function UserRegister({userLogin, getToken}) {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        avatar: '',
        type: 'user'
    });

    const URL = "http://localhost:3000";
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        registerUser();
    }

    const registerUser = async () => {
        try {
            let newUser = new FormData();

            newUser.append("name", user.name);
            newUser.append("email", user.email);
            newUser.append("password", user.password);
            newUser.append("birthday", user.birthday);
            newUser.append("gender", user.gender);
            newUser.append("avatar", user.avatar);
            newUser.append("type", user.type);

            let result = await axios ({
                method: 'POST',
                url: `${URL}/users/register`,
                data: newUser,
                header: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const access_token = result.data["access_token"]
            getToken(access_token);
            userLogin(true);
            Swal.fire(
                `Welcome ${user.name}!`,
                'You are now registered!',
                'success'
            );
            history.push('/');
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    return (
        <div>        
            <div className="container container-form">
            <Fade ><h3 className="container text-center">Daftar dan mulailah belajar!</h3></Fade>
                <form className="row g-3 space-enter">
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Username"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="email" onChange={(e) => setUser({...user, email: e.target.value})} placeholder="your@email.com"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Password: </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">birthday: </label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="birthday" onChange={(e) => setUser({...user, birthday: e.target.value})}placeholder="yyyy-mm-dd"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Gender: </label>
                        <div className="col-sm-10" onChange={(e) => setUser({...user, gender: e.target.value})}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="gender" name="gender" value="Male"/>
                                <label className="form-check-label text-black" for="Male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="gender" name="gender" value="Female"/>
                                <label className="form-check-label text-black" for="Female">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-black col-sm-2 col-form-label">Avatar: </label>
                        <div className="col-sm-10">
                        <input type="file" className="form-control" id="avatar" name="avatar" onChange={(e) => setUser({...user, avatar: e.target.files[0]})} accept="image/*"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Submit</button>
                </form>
                <p className="text-black text-center space-center">
                    Sudah mempunyai akun? Masuk <motion.div whileHover={{ scale: 1.2 }}whileTap={{ scale: 1.1 }}><Link to="/users/login">Di sini</Link></motion.div>
                    
                </p>
            </div>
        </div>
    )
}

export default UserRegister
