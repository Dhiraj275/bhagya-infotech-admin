import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import firebase from '../firebase'
import { Link } from 'react-router-dom';
function ItemsTr(props) {
    const deleteItem = () => {
        Swal.fire(
            'Do you really want to delelte these item?',
            '',
            'warning'
        ).then(() => {

            const ItemRef = firebase.database().ref('items/').child(props.list.id);
            ItemRef.remove().then(() => {
                Swal.fire(
                    'Deleted Successfull',
                    "",
                    'success'
                )
            })



        })

    }
    const showDetail = () => {

        const list = props.list
        const theDetial = () => {
            var detail = ""
            Object.keys(list).map((col) => { detail = detail + `${col}: ${list[col]} <br>` })
            return detail
        }

        Swal.fire("The detail", `<div class="text-left">${theDetial()}</div>`, "info")
        console.log(list)

    }
    if (props.category === '') {
        return (
            <tr key={props.index + 6}>
                <td>{props.index + 1}</td>
                <td>{props.list.name}</td>
                <td>&#8377; {props.list.price}</td>
                <td>{props.list.unit}</td>
                <td>{props.list.quantity}</td>
                <td>{props.list.category}</td>
                <td key={props.index + 5} className="text-center">
                    <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                    <i onClick={showDetail} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-info-circle text-primary"></i>
                    <Link
                        to={{
                            pathname: '/edit-item-detail',
                            // search: `?id=${props.list.id}&name=${props.list.name}&category=${props.list.categorieName}&price=${props.list.price}&varient=${props.list.varient}`,
                            state: { data: props.list, category: props.cateList }
                        }
                        }
                    ><i style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i></Link>
                </td>
            </tr>
        )
    }
    else {
        return (
            props.category !== props.list.category ? '' :
                <tr key={props.index}>
                    <td>{props.index + 1}</td>
                    <td>{props.list.name}</td>
                    <td>&#8377; {props.list.price}</td>
                    <td>{props.list.unit}</td>
                    <td>{props.list.quantity}</td>
                    <td>{props.list.category}</td>
                    <td key={props.index + 5} className="text-center">
                        <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
                        <i onClick={showDetail} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-info-circle text-primary"></i>
                        <Link
                            to={{
                                pathname: '/edit-item-detail',
                                // search: `?id=${props.list.id}&name=${props.list.name}&category=${props.list.categorieName}&price=${props.list.price}&varient=${props.list.varient}`,
                                state: { data: props.list, category: props.cateList }
                            }
                            }
                        ><i style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i></Link>
                    </td>

                </tr>
        )
    }
}

export default ItemsTr
