import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import StateDisctrict from "../Components/StateDisctrict"
import { useLocation } from "react-router-dom"

function EditItemDetail() {
    const item = useLocation().state
    const [data, setData] = useState({
        cateList: [],
    })
    const [itemDetail, setItemDetail] = useState({
    })
    const [isStarted, setIsStarted] = useState(false)
    // const [moreImgUrl, setMoreImgUrl] = useState([])
    const [brands, setBrands] = useState([])
    const [keyFeature, setKeyFeature] = useState(item.keyfeaturs)
    let name, value;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }
    const addKeyFeature = (key) => {
        key.preventDefault()
        var temp = [...keyFeature]
        temp.push(itemDetail.key_feature)
        setKeyFeature(temp)
        key.reset()
    }
    const imgExtRemover = (name) => {
        var fileName = name;
        return fileName.split('.').pop()
    }
    var countryList = ["India", "China"]
    const updataItem = (e) => {
        delete itemDetail.key_feature
        setIsStarted(true)
        // const moreImgUrl = []
        e.preventDefault()
        var TIME_STEMP = Date.now()

        var id = item.id
        delete item.id
        firebase.database().ref("items/").child(id).set({
            ...item,
            ...itemDetail,
            keyfeaturs: keyFeature
            // coverImgUrl: event, TIME_STEMP: TIME_STEMP,
            // keyfeaturs: keyFeature,
            // moreImgUrl: moreImgUrl
        }).then(() => {
            Swal.fire("Item Registerd Successfully!", '', 'success').then(() => {
                window.location.replace("/")

            })
        })
    }
    const loadData = () => {
        firebase.database().ref('categories/').on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            for (let id in snapVal) {
                fatched.push({ id, ...snapVal[id] })

                setData({
                    ...data,
                    cateList: fatched
                })
            }


        })
        firebase.database().ref('brands/').on('value', (snapshot) => {
            const snapVal = snapshot.val();
            const fatched = [];
            for (let id in snapVal) {
                fatched.push({ id, ...snapVal[id] })
            }
            setBrands(fatched)
        })

    }
    const deleteItem = (item) => {
        var temp = [...keyFeature]
        temp.splice(temp.indexOf(item), 1)
        setKeyFeature(temp)
    }
    return (

        <div onLoad={loadData} className="main">
            <SlideMenu />
            <div className="main-display">
                <div className="main-child">
                    <SecondMenu title="Add Item" url="#" />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form">
                                    <form action="" onSubmit={updataItem}>
                                        <div className="form-group my-4">
                                            <label className="form-label">Name</label>
                                            <input onChange={handleFormChanges}
                                                required
                                                defaultValue={item.name}
                                                className="form-control" name="name" type="text" placeholder="Enter Item Name" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Category</label>
                                            <select onChange={handleFormChanges} required className="form-control" name="category" id="">
                                                <option value="">Select Category</option>
                                                {
                                                    data.cateList.map((category, index) => {
                                                        return (
                                                            <option selected={category.categorieName === item.category} key={index} value={category.categorieName}>{category.categorieName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Brands</label>
                                            <select required onChange={handleFormChanges} className="form-control" name="category" id="">
                                                <option value="">Select Category</option>
                                                {
                                                    brands.map((barnd, index) => {
                                                        return (
                                                            <option selected={barnd.categorieName === item.brand} key={index} value={barnd.categorieName}>{barnd.categorieName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-12 my-4">
                                                <label className="form-label">Price</label>
                                                <input onChange={handleFormChanges}
                                                    required
                                                    defaultValue={parseInt(item.price)}
                                                    className="form-control" name="price" type="number" placeholder="Enter Item Price" />
                                            </div>

                                        </div>
                                        <div className="form-group col-lg-12 my-4">
                                            <label className="form-label">Description</label>
                                            <textarea onChange={handleFormChanges}
                                                required
                                                defaultValue={item.name}
                                                className="form-control" name="description" type="number" placeholder="Enter Description" />
                                        </div>

                                        <div className="row">

                                            <div className="form-group col-6 my-4">
                                                <label className="form-label">Key Feature</label>
                                                <div className="d-flex">
                                                    <input onChange={handleFormChanges}
                                                        className="form-control" name="key_feature" type="text" placeholder="Enter Key features atleast 3*" />
                                                    <button onClick={addKeyFeature} className="btn btn-success ml-2"><b>+</b></button>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <ul>
                                                    {
                                                        keyFeature.map((item, index) => {

                                                            return <div key={index} className="d-flex ">
                                                                <li>&#8226; {item} </li> &nbsp;
                                                                <i onClick={() => { deleteItem(item) }} style={{ cursor: "pointer" }} className="fa fa-trash text-danger"></i>
                                                            </div>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <select required
                                                        onChange={handleFormChanges} name="countryOfOrigin" id="" className="form-control">
                                                        <option value="">Select Country of Origin</option>
                                                        {
                                                            countryList.map((country) => {
                                                                return <option selected={item.countryOfOrigin === country} value={country}>{country}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <input required
                                                        defaultValue={item.weight} onChange={handleFormChanges} name="weight" type="number" step="0.01" placeholder="Weight" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <select required
                                                        defaultValue={item.weightUnit} onChange={handleFormChanges} name="weightUnit" id="" className="form-control">
                                                        <option value="">Select unit of weight</option>
                                                        <option selected={item.weightUnit === "kg"} value="kg">Kilograms</option>
                                                        <option selected={item.weightUnit === "g"} value="g">Grams</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-group my-4">
                                            <label className="form-label">Cover Image</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, item_image: e.target.files[0] }) }}
                                                className="form-control" name="item_image" type="file" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">More Images</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, moreImgs: e.target.files, }) }}
                                                multiple
                                                className="form-control" name="item_image" type="file" />
                                        </div> */}
                                        <div className="form-group col-lg-12 my-4">
                                            <label className="form-label">Key Words</label>
                                            <input onChange={handleFormChanges}
                                                required
                                                defaultValue={item.tags}
                                                className="form-control" name="tags" type="text" placeholder="Processor, AMD, Ryzen 5, 5500" />
                                        </div>
                                        <button disabled={isStarted === true} className="btn  btn-success" type="submit"  >Add Item <i className="fa fa-upload"></i></button>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditItemDetail
