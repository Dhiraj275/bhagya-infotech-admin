import React, { useState } from 'react'
import firebase from '../firebase'
import './pages.css'
const bcrypt = require('bcryptjs')

function Signup() {
    const [admin, setAdmin] = useState({
        username: '',
        password: ''
    });
    const [hashPass, setHashPass] = useState('')

    let name, value;
    const getAdminData = (event) => {
        name = event.target.name;
        value = event.target.value;
        setAdmin({ ...admin, [name]: value });
    }
    const PostData = async (e) => {
        const hashPassword = async () => {
            var hash = await bcrypt.hash(admin.password, 4)
            setHashPass(hash)
            console.log(hashPass)
        }
        hashPassword();
        e.preventDefault();
        const {username} = admin;
        await fetch(
            'https://movies-dit-default-rtdb.firebaseio.com/AdminData.json',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password: hashPass
                })
            }
        );
    
    
    }
    return (
        <div className="login-page">
            <form method="POST">
                <div className="login-box">
                    <h3>Admin Login</h3>
                    <div className="input-group">
                        <div className="input-control">
                            <input name="username" value={admin.username} placeholder="Username" onChange={getAdminData} type="text" />
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="input-control">
                            <input name="password" value={admin.password} placeholder="Password" onChange={getAdminData} type="Password" />
                            <i className="fa fa-lock"></i>
                        </div>
                        <button type="submit"
                            onClick={PostData}
                            className="login-btn">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
