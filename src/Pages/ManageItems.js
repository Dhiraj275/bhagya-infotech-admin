import React, { useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { Link, NavLink } from 'react-router-dom'
import ItemsTr from '../Components/ItemsTr'
import FlatList from 'flatlist-react';
import QuickShowCard from '../Components/QuickShowCard'
import Swal from 'sweetalert2'
function ManageItems() {
    const [itemList, setItemList] = useState([]);
    const [cateList, setCateList] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [filterData, setFilterData] = useState([])

    const loadData = () => {
        firebase.database().ref('items/').on('value', (snapshot) => {
            var snapVal = snapshot.val();
            const itemsArry = [];

            for (let id in snapVal) {
                itemsArry.push({ id, ...snapVal[id] })
            }
            setItemList(itemsArry)
            setFilterData(itemsArry)
            firebase.database().ref('categories/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                setCateList(fatched)
            })
        })
    }
    const searchFilter = (e) => {
        const text = e.target.value
        if (text) {
            const newData = itemList.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            )
            setSearch(text)
            setFilterData(newData)
        }
        else {
            setSearch(text)
            setFilterData(itemList)
        }
    }
    return (
        <>

            <div className="main nav-active" onLoad={loadData}>
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">

                        <SecondMenu title="Manage Items" url="/manage-items" />
                        <div className="container smart-card">
                            <select onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="">All</option>
                                {
                                    cateList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.categorieName}>{item.categorieName}</option>
                                        )
                                    })
                                }
                            </select>
                            <input placeholder="search" value={search} type="text" onChange={searchFilter} className="form-control my-2" />
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Categories</h4>
                                <NavLink to='/add-item' ><button className="btn btn-primary">Add Items <i className="fa fa-plus"></i></button></NavLink>
                            </div>
                            <div className="row isotope-grid">
                                {
                                    filterData.map((item, index) => {
                                        return (
                                            <ProductCard key={index} category={category} cateList={cateList} item={item} index={index} />
                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageItems
const urlToName = (url) => {
    "1656858567009%5B1%5D.png"

    return String(url.split("/")[7].replace("items%2F", "").split("?alt")[0].replace("%5B", "[").replace("%5D", "]"))
}
const ProductCard = (props) => {
    const [isShow, setIsShow] = useState(false)
    const item = props.item
    const currentCate = props.currentCate
    const deleteItem = () => {
        var str = item.coverImgUrl
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                firebase.storage().ref("items").child(urlToName(item.coverImgUrl)).delete().then(() => {
                    item.moreImgUrl.map((item) => {
                        console.log(urlToName(item))
                        firebase.storage().ref("items").child(urlToName(item)).delete()
                    })
                }).then(() => {
                    firebase.database().ref('items/').child(item.id).remove().then(() => {
                        Swal.fire("ItemDeleted successFully", "", "success")
                    })
                })
            }
        })

    }
    return (
        <>
            <div style={{ transition: "1s" }} class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                <div className="block2">
                    <div className="block2-pic hov-img0">
                        <img src={item.coverImgUrl} alt="IMG-PRODUCT" />
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => { setIsShow(true) }}
                            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                            Quick View
                        </div>
                    </div>
                    <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                            <div
                                // href="product-detail.html"
                                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                                {item.name}
                            </div>
                            <span className="stext-105 cl3">&#8377; {item.price}</span>
                        </div>
                        <div style={{ cursor: "pointer" }} className="block2-txt-child2 d-flex flex-column align-items-end flex-r p-t-3">

                            <Link to={{pathname:"/edit-item-detail", state:item}}>
                                <i className="fa fa-edit">
                                </i>
                            </Link>
                            <i onClick={deleteItem} className="fa fa-trash text-danger">

                            </i>
                            {/* <img
                                    className="icon-heart1 dis-block trans-04"
                                    src="images/icons/icon-heart-01.png"
                                    alt="ICON"
                                />
                                <img
                                    className="icon-heart2 dis-block trans-04 ab-t-l"
                                    src="images/icons/icon-heart-02.png"
                                    alt="ICON"
                                /> */}

                        </div>
                    </div>
                </div>
            </div>
            {
                isShow && <QuickShowCard item={item} setIsShow={setIsShow} />

            }

        </>

    )
}