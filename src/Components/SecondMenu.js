import React from 'react'
import $ from 'jquery'
import firebase from '../firebase'
import { NavLink, useHistory } from 'react-router-dom'
$(document).ready(
    ()=>{
        $('.main').toggleClass('nav-active')
    }
)
const toggle = () => {
    $('.main').toggleClass('nav-active')
}
const show = () => {
    $('.second .right ').toggleClass('active')
}



function SecondMenu(props) {
    const history = useHistory();
    const logout= () =>{
        firebase.auth().signOut().then(window.location.replace('/login'))
    }
    return (
        <>
            <div className="controls">
                <div className="toggler" onClick={toggle}>
                    <i className="toggler-ico"></i>
                </div>
                <div className="right">

                    <div className="view-site">
                        <a target="_blank" href="http://bhagyainfotech.coverallweb.in/">View site <i className="fa fa-external-link-alt"></i></a>
                    </div>
                </div>
            </div>

            <div className="second">
                <div className="left">
                    <h3>{props.title}</h3>
                    <div className="location"><NavLink to="/"><span>Home</span></NavLink> / <NavLink to={props.url}>{props.title}</NavLink> </div>
                </div>
                <div className="right">
                    <div className="admin-settings">
                        <NavLink onClick={show} to="#">Admin</NavLink>
                        <ul>
                            <li>Edit Profile</li>
                            <li>Change Password</li>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecondMenu
