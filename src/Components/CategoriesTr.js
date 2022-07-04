import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import firebase from '../firebase'

function CategoriesTr(props) {
    const [length, setLength] = useState();

    useEffect(() => {
        const loadData = (id) => {
            firebase.database().ref('MainApi/').child(id).child('videos/').on('value', (snapshot) => {
                setLength(snapshot.numChildren())
            })
        }
        const id = props.list.id
        loadData(id)
    })
    const deleteItem = () => {
        Swal.fire(
            'Do you really want to delelte category?',
            '',
            'warning'
        ).then(() => {

            const ItemRef = firebase.database().ref('categories/').child(props.list.id);
            ItemRef.remove().then(() => {
                Swal.fire(
                    'Deleted Successfull',
                    "",
                    'success'
                )
            })



        })
    }
    const onEdit = async () => {

        const { value: order } = await Swal.fire({
            title: 'Edit Category',
            input: 'number',
            inputLabel: 'Edit Order',
            // inputValue: inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (order) {
            firebase.database().ref("categories/").child(parseInt(order)).set({...props.list}).then(()=>{
                firebase.database().ref("categories/").child(props.list.id).remove().then(()=>{
                    Swal.fire("Item edited successfully", "" ,"success")
                })
            })
        }
    }
    return (
        <tr key={props.index + 6}>
            <td key={props.index + 1}>{props.index + 1}</td>
            <td key={props.index + 2}>{props.list.categorieName}</td>
            <td key={props.index + 4} onClick={deleteItem} className="text-center"><i style={{ cursor: 'pointer' }} className="fa fa-trash text-danger"></i></td>
            <td key={props.index + 4} onClick={onEdit} className="text-center"><i style={{ cursor: 'pointer' }} className="fa fa-edit text-primary"></i></td>

        </tr>
    )
}

export default CategoriesTr
