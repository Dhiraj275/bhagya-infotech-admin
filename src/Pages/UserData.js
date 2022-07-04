import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { Link, NavLink } from 'react-router-dom'
import notify from '../audio/notify.wav'
import deleteSfx from '../audio/delete.mp3'
import UserTR from '../Components/UserTR'
function UserData() {
    const [data, setData] = useState([]);
    const audio = new Audio(notify)
    const remove = new Audio(deleteSfx)
    const loadData = () => {
        async function getData() {
            firebase.database().ref('users/').on('value', (snapshot) => {
                const rawUserData = []
                var snapVal = snapshot.val();
                for (let id in snapVal){
                    rawUserData.push({...snapVal[id], id:id})
                }
                setData(rawUserData)
            })
        }
        getData()
    }
    
    // firebase.database().ref('contact-form/').on('child_added', ()=>audio.play())
    // firebase.database().ref('contact-form/').on('child_removed', ()=>remove.play())
    return (
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Manage orders" url="/orders" />
                        <div className="container smart-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Users</h4>
                                <Link to="/users/farmers"><button className="btn btn-success">Farmers</button></Link>
                                <Link to="/users/corporate"><button className="btn btn-success">Corporate</button></Link>

                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>User Type</th>
                                            <th>Phone No.</th>
                                            <th>Email</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Address</th>
                                            <th>Time Stamp</th>
                                            <th colSpan={2} className="text-center">Opration</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            data.map((list, index) => {
                                                console.log(list)
                                                return (
                                                    <UserTR index={index} list={list} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default UserData
