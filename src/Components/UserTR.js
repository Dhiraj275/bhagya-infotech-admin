import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from '../firebase'

function UserTR(props) {
    const list = props.list
    const deleteItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(() => {

            firebase.database().ref("orders").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].userId === list.userId) {
                        firebase.database().ref("orders").child(id).remove()
                    }
                }
            })
            firebase.database().ref("items").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].sellerUID === list.userId) {
                        firebase.database().ref("items").child(id).remove()
                    }
                }
            })
            firebase.database().ref("item-to-verify").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].sellerUID === list.userId) {
                        firebase.database().ref("item-to-verify").child(id).remove()
                    }
                }
            })
            const item = firebase.database().ref('users/').child(list.userId)
            item.remove()

        })

}
const showDetail = () => {
    delete list.farmerData
    delete list.product_for_sell
    delete list.item_rejected
    delete list.cart
    delete list.orders
    delete list.corporateData




    const theDetial = () => {
        var detail = ""
        Object.keys(list).map((col) => { detail = detail + `${col}: ${list[col]} <br>` })
        return detail
    }

    Swal.fire("The detail", `<div class="text-left">${theDetial()}</div>`, "info")
    console.log(list)

}
var timestamp = list.timeStamp
var rawTime = String(new Date(timestamp))
var timestamp=""
if(rawTime==="Invalid Date"){
    timestamp=""
}
else{
    timestamp = rawTime.replace("GMT+0530 (India Standard Time)", "")
}
return (
    <tr key={props.index}>
        <td>{props.index + 1}</td>
        <td>{list.name}</td>
        <td>{list.userType}</td>
        <td>{list.phone}</td>
        <td>{list.email}</td>
        <td>{list.state}</td>
        <td>{list.district}</td>
        <td>{list.address}</td>
        <td>{timestamp}</td>

        <td className="text-center">
            <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
        </td>
        <td className="text-center">
            <i onClick={showDetail} style={{ cursor: 'pointer', margin: '0 5px' }} class="fa fa-info-circle text-primary" aria-hidden="true"></i>
        </td>
    </tr>
)
}

export default UserTR
