import React from 'react'
import { NavLink } from 'react-router-dom'
import './component.css'
import logo from '../images/logo.svg'
function SlideMenu() {

    return (
        <>

            <div className="slide-menu">
                <div className="logo-div">
                    <img src={logo} className="logo" alt="logo" />
                    <div className="powered-by"><h3>~Cover All Web Solutions</h3></div>
                </div>

                <div className="navigation">
                    <ul>
                        <li><NavLink activeClassName="navigation-active" exact to="/users"><i className="fa fa-users"></i>Users</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/manage-item"><i className="fa fa-plus"></i>Manage Item</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/manage-orders"><i className="fa fa-edit"></i>Manage Orders</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/edit-categories"><i className="fa fa-edit"></i>Edit Categories </NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/contact-mails"><i class="fa fa-envelope"></i>Contact Mails</NavLink></li>

                    </ul>
                </div>
            </div>


        </>
    )
}

export default SlideMenu
