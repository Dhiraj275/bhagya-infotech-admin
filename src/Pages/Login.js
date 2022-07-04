import { Link } from 'react-router-dom';
// import '../style/login.css'
import firebase from '../firebase'
import './pages.css'
import Swal from 'sweetalert2'
import { useState } from 'react';
function LoginPage() {
    const [otpStates, setOtpStates] = useState(false)
    const [userData, setUserData] = useState(null)
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    })
    const OtpMain = () => {
        const [EnteredOTP, setEnteredOTP] = useState()
        const verifyOtp = (e) => {
            e.preventDefault()
            var confirmationResult = window.confirmationResult
            confirmationResult.confirm(EnteredOTP).then((result) => {
                setOtpStates(false)
                Swal.fire("User Verified Successfully!", '', 'success').then(() => {
                    var uid = result.user.uid
                    if (
                        uid === "dc2JVlLuLzfuNi94IjRBxGG7hem2"
                        ||
                        uid === "YLGjAyIswISqUYaJDdhlTtr1IWF2"
                        ||
                        uid === "1AjGbYpS7oYRJDLHEyis7Pv4WLm2"
                      ){

                      }
                      else{
                          Swal.fire("You are not authorized Admin.", "" , "error")
                      }

                })
            }).catch((error) => {
                if (error.code === "auth/invalid-verification-code") {
                    Swal.fire("Invalid OTP", "Enter correct OTP and try again", 'error')
                }
            })

        }
        return (
            <>
                <div className="otp-main">
                    <div className="otp-box">
                        <h3>Enter Otp</h3>
                        <form action="" onSubmit={verifyOtp}>
                            <input type="number" placeholder="Enter OTP" value={EnteredOTP} onChange={(e) => { setEnteredOTP(e.target.value) }} />
                            <input type="submit" value="Verify" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
    const setUpRecaptch = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {

                signIn();
            }
        });
    }
    var currentUser = firebase.auth().currentUser
    const signIn = (e) => {
        e.preventDefault()
        setUpRecaptch()

        const phoneNumber = `+91${formData.phone}`;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setOtpStates(true)

            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <>
            {
                otpStates === true ? <OtpMain /> : ""
            }


            <div className="login-page">
                <form onSubmit={signIn} action="">

                    <div className="login-box">
                        <h3>Admin Login</h3>
                        <div className='main-form'>
                            <div className="input-group">
                                <div className="input-control">
                                    <i className="fa fa-phone-alt"></i>
                                    <input onChange={(event) => { setFormData({ ...formData, phone: event.target.value }) }} placeholder="Phone No." max="9999999999" min="1000000000" required="required" type="number"  ></input>
                                </div>
                            </div>

                            <input id="submit" className="login-btn" type="submit" value="Login" />
                        </div>


                        <div id="recaptcha-container"></div>

                    </div>

                </form>
            </div>
        </>
    );



}


export default LoginPage;