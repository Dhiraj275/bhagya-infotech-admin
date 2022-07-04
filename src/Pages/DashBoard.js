import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import { useEffect, useState } from "react"
function DashBoard() {
    const [mainApi, setMainApi] = useState(undefined)
    const [userData, setUserData] = useState(undefined)
    const [videoData, setVideoData] = useState(undefined)
    useEffect(() => {
        const mainDb = firebase.database().ref('MainApi')
        const videoDb = firebase.database().ref('videos')
        const userDb = firebase.database().ref('user')
        mainDb.on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            for (let id in snapVal) {
                fatched.push({ ...snapVal[id], id })
                setMainApi(fatched)
            }
            console.log(fatched)
        });
        userDb.on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            for (let id in snapVal) {
                fatched.push({ ...snapVal[id], id })
                setUserData(fatched)
            }
            console.log(fatched)
        });
        videoDb.on('value', (snapshot) => {
            const snapVal = snapshot.numChildren();
            setVideoData(snapVal)
        });

    }, [])
    return (
        <div className="main">
            <SlideMenu />
            <div className="main-display">
                <div className="main-child">
                    <SecondMenu title="Dashboard" url="/dashboard" />
                    <div className="third container">
                        <div className="row">
                            <div className="col-md-4 mt-5 mb-3">
                                <div className="card card-hover">
                                    <div className="dash-box text-white">
                                        <h1 className="dash-icon">
                                            <i className="fas fa-user-secret mb-1 font-16"></i>
                                        </h1>
                                        <div className="dash-content">
                                            <h5 className="mb-0 mt-1">1</h5>
                                            <small className="font-light">Total Admin</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5 mb-3">
                                <div className="card card-hover">
                                    <div className="dash-box text-white">
                                        <h1 className="dash-icon">
                                            <i className="fas fa-user mb-1 font-16"></i>
                                        </h1>
                                        <div className="dash-content">
                                            <h5 className="mb-0 mt-1">{userData === (undefined) ? <h6>Loading...</h6> : userData.length}</h5>
                                            <small className="font-light">Total User</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5 mb-3">
                                <div className="card card-hover">
                                    <div className="dash-box text-white">
                                        <h1 className="dash-icon">
                                            <i className="fas fa-video mb-1 font-16"></i>
                                        </h1>
                                        <div className="dash-content">
                                            <h5 className="mb-0 mt-1">{videoData === (undefined) ? <h6>Loading...</h6> : videoData}</h5>
                                            <small className="font-light">Total Videos</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5 mb-3">
                                <div className="card card-hover">
                                    <div className="dash-box text-white">
                                        <h1 className="dash-icon">
                                            <i className="fas fa-shapes mb-1 font-16"></i>
                                        </h1>
                                        <div className="dash-content">
                                            <h5 className="mb-0 mt-1">{mainApi === (undefined) ? <h6>Loading...</h6> : mainApi.length}</h5>
                                            <small className="font-light">Total Categories</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
