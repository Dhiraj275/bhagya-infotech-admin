import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import firebase from './firebase';
import AdminPanel from './Pages/AdminPanel';
import Login from './Pages/Login';
import Swal from 'sweetalert2';
function App() {
  const [firebaseUserData, setFirebaseUserData] = useState(null)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setFirebaseUserData(user)
    }
    else {
      setFirebaseUserData(undefined)
    }
  })
  if (firebaseUserData === undefined) {
    return (
      <>
        <Login />
        <Redirect to="/" />
      </>
    )

  }
  else {
    if (firebaseUserData !== null) {
      if (
        firebaseUserData.uid === "QwUucy3C3rSzfz9cKCEw04WdJLZ2"
        ||
        firebaseUserData.uid === "YLGjAyIswISqUYaJDdhlTtr1IWF2"
        ||
        firebaseUserData.uid === "1AjGbYpS7oYRJDLHEyis7Pv4WLm2"
      ) {
        return <AdminPanel />
      }
      else {
        Swal.fire("You are not authorized Admin.", "" , "error")
        return (
          <>
            <Login />
            <Redirect to="/" />
          </>
        )
      }
    }
    else {
      console.log(firebaseUserData)
      return ""
    }
  }
}

export default App;
