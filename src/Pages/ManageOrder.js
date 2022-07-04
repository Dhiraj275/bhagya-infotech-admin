import React, { useState, useEffect } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'

function ManageOrders() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const loadData = () => {
        async function getData() {
            firebase.database().ref('users/').on('value', (snapshot) => {
                const rawUserData = []
                var snapVal = snapshot.val();
                for (let id in snapVal) {
                    rawUserData.push({ ...snapVal[id], id: id })
                }
                setUsers(snapVal)
            })
            firebase.database().ref('orders/').on('value', (snapshot) => {
                const rawOrderList = []
                var snapVal = snapshot.val();
                for (let id in snapVal) {
                    rawOrderList.push({ ...snapVal[id], id: id })
                }
                setOrders(rawOrderList)
            })
            firebase.database().ref('items/').on('value', (snapshot) => {
                const productsList = []
                var snapVal = snapshot.val();
                // for (let id in snapVal) {
                //     productsList.push({ ...snapVal[id], id: id })
                // }
                setProducts(snapVal)
            })

        }
        getData()
    }

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
                            </div>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Item Name</th>
                                            <th>Item Image</th>
                                            <th>Item Id</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                            <th>User Adderss</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>User Phone No.</th>
                                            <th>Date/Time</th>
                                            {/* <th className="text-center">Opration</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            orders.map((list, index) => {

                                                return (
                                                    <OrderTr users={users} products={products} index={index} order={list} />
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
const OrderTr = (props) => {
    const order = props.order
    const users = props.users
    const products = props.products
    const [currentUser, setCurrentUser] = useState([])
    const [currentProduct, setCurrentProduct] = useState([])

    useEffect(() => {
        firebase.database().ref("users").child(order.userId).on("value", (snapVal) => {
            setCurrentUser(snapVal.val())
        })
        firebase.database().ref("items").child(order.itemId).on("value", (snapVal) => {
            setCurrentProduct(snapVal.val())
        })
    }, [])
    console.log(currentProduct, currentUser)
    var timestamp = order.timeStamp
    var rawTime = String(new Date(timestamp))
    var timestamp = rawTime.replace("GMT+0530 (India Standard Time)", "")
    return (
        <>
            <tr>
                <td>{props.index + 1}</td>
                <td>{currentProduct.name}</td>
                <td><img src={currentProduct.imgUrl} style={{ width: 100 }} className="img-fluid" alt="" /></td>
                <td>{order.itemId}</td>
                <td>{order.quantity}</td>
                <td>{currentProduct.unit}</td>
                <td style={{ minWidth: 385 }}>{currentUser.address === null ? "" : currentUser.address}</td>
                <td>{currentUser.state}</td>
                <td>{currentUser.district}</td>
                <td>{currentUser.phone}</td>
                <td style={{ minWidth: 185 }}>{timestamp}</td>
            </tr>
        </>
    )
}
export default ManageOrders