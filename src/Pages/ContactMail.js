import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
// import VideosTr from '../Components/UserTR'
import { NavLink } from 'react-router-dom'
import notify from '../audio/notify.wav'
import deleteSfx from '../audio/delete.mp3'
function ContactMails() {
    const [data, setData] = useState([]);
    const audio = new Audio(notify)
    const remove = new Audio(deleteSfx)
    const loadData = () => {
        firebase.database().ref('contactMail/').on('value', (snapshot) => {
            var snapVal = snapshot.val();
            const fatched = [];
            for (let id in snapVal) {
                fatched.push({ id: id, ...snapVal[id] })

                setData(fatched)

            }

        })
    }
    firebase.database().ref('timingPoll/').on('child_added', () => audio.play())
    firebase.database().ref('timingPoll/').on('child_removed', () => remove.play())
    return (
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Manage orders" url="/orders" />
                        <div className="container smart-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Categories</h4>
                                <NavLink to='/upload-video' ><button className="btn btn-primary">Upload Videos <i className="fa fa-upload"></i></button></NavLink>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>eMail</th>
                                            <th>Address</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th className="text-center">Opration</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            data.map((list, index) => {
                                                console.log(list)
                                                return (
                                                    <tr key={index + 6}>
                                                        <td>{index + 1}</td>
                                                        <td>{list.name}</td>
                                                        <td>{list.phone}</td>
                                                        <td>{list.address}</td>
                                                        <td>{list.subject}</td>
                                                        <td>{list.message}</td>
                                                        <td className="text-center">
                                                            <i style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                                                        </td>
                                                    </tr>
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

export default ContactMails
