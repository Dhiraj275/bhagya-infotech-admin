import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import $ from 'jquery'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import CategoriesTr from '../Components/CategoriesTr'
function EditCategories() {
    const [data, setData] = useState({
        categorie: '',
        length: '',
        deleteId: '',
        cateList: []
    });
    const showAdd = () => {
        $('.add-cate').toggleClass('active')
    }
    const handelChange = (val) => {
        setData({
            ...data,
            categorie: val.target.value
        })
    }

    const addCate = () => {
        const categories = firebase.database().ref("categories/")
        categories.push({
            categorieName: data.categorie,
           })
       
    }
    const enterData = (keycode) => {
        if (keycode.code === "Enter") {
            addCate();
        }
    }
    const loadData = () => {
        firebase.database().ref('categories/').on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            console.log(snapVal)
            for (let id in snapVal) {
                fatched.push({ id, ...snapVal[id] })

                setData({
                    ...data,
                    length: snapshot.numChildren(),
                    cateList: fatched
                })
                console.log(fatched)
            }


        })
    }
    
    return (
        <>
            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Edit Catrgories" url="/edit-categories" />
                        <div className="container smart-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Categories</h4>
                                <div className="add-cate text-success d-flex">
                                    <div className="input-cate">
                                        
                                        <input value={data.categorie} onKeyPressCapture={enterData} onChange={handelChange} type="text" />
                                        <button onClick={addCate}><i className="fa fa-plus"></i></button>
                                    </div>
                                    <div className="add-btn" onClick={showAdd}> <span className="mx-3">Add Categories</span><i className="fa fa-plus "></i></div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th colSpan={2} className="text-center">Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            data.cateList.map((list, index) => {
                                                
                                                return (
                                                    <CategoriesTr key={index + 7} list={list} index={index} />
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

export default EditCategories
