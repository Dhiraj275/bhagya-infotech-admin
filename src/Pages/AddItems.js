import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import SecondMenu from "../Components/SecondMenu"
import SlideMenu from "../Components/SlideMenu"
import firebase from "../firebase"
import StateDisctrict from "../Components/StateDisctrict"

function AddItem() {
    const [data, setData] = useState({
        cateList: [],
    })
    const [itemDetail, setItemDetail] = useState({
    })
    const [isStarted, setIsStarted]= useState(false)
    // const [moreImgUrl, setMoreImgUrl] = useState([])
    const [brands, setBrands] = useState([])
    const [keyFeature, setKeyFeature] = useState([])
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

    const addItem = (e) => {
        setIsStarted(true)
        const moreImgUrl = []
        e.preventDefault()
        var TIME_STEMP = Date.now()
        firebase.storage().ref("items/").child(`${TIME_STEMP}.${imgExtRemover(itemDetail.item_image.name)}`).put(itemDetail.item_image)
        .then(() => {
            const moreImgs = itemDetail.moreImgs

            for (let i = 0; i < itemDetail.moreImgs.length; i++) {
                firebase.storage().ref("items/").child(`${TIME_STEMP}[${i}].${imgExtRemover(moreImgs[i].name)}`).put(moreImgs[i]).then(() => {
                    firebase.storage().ref('items/').child(`${TIME_STEMP}[${i}].${imgExtRemover(moreImgs[i].name)}`).getDownloadURL().then((event) => {
                        moreImgUrl.push(event)
                    }).then(() => {
                        if (i === itemDetail.moreImgs.length - 1) {
                            firebase.storage().ref('items/').child(`${TIME_STEMP}.${imgExtRemover(itemDetail.item_image.name)}`).getDownloadURL().then((event) => {
                                delete itemDetail.item_image
                                firebase.database().ref("items/").push({ ...itemDetail, coverImgUrl: event, TIME_STEMP: TIME_STEMP, keyfeaturs: keyFeature, moreImgUrl: moreImgUrl }).then(() => {
                                    Swal.fire("Item Registerd Successfully!", '', 'success').then(()=>{
                                        window.location.replace("/")
                                    })
                                })
                            })
                        }
                    })
                })
            }
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
                                    <form action="" onSubmit={addItem}>
                                        <div className="form-group my-4">
                                            <label className="form-label">Name</label>
                                            <input onChange={handleFormChanges}
                                                required
                                                className="form-control" name="name" type="text" placeholder="Enter Item Name" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Category</label>
                                            <select onChange={handleFormChanges} className="form-control" name="category" id="">
                                                <option value="">Select Category</option>
                                                {
                                                    data.cateList.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.categorieName}>{item.categorieName}</option>
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
                                                    brands.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.categorieName}>{item.categorieName}</option>
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
                                                    className="form-control" name="price" type="number" placeholder="Enter Item Price" />
                                            </div>

                                        </div>
                                        <div className="form-group col-lg-12 my-4">
                                            <label className="form-label">Description</label>
                                            <textarea onChange={handleFormChanges}
                                                required
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
                                                                <li> {item} </li> &nbsp;
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
                                                    <select required onChange={handleFormChanges} name="countryOfOrigin" id="" className="form-control">
                                                        <option value="">Select Country of Origin</option>
                                                        <option value="China">China</option>
                                                        <option value="India">India</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <input required onChange={handleFormChanges} name="weight" type="number" step="0.01" placeholder="Weight" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <select required onChange={handleFormChanges} name="weightUnit" id="" className="form-control">
                                                        <option value="">Select unit of weight</option>
                                                        <option value="kg">Kilograms</option>
                                                        <option value="g">Grams</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">Cover Image</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, item_image: e.target.files[0] }) }}
                                                required
                                                className="form-control" name="item_image" type="file" />
                                        </div>
                                        <div className="form-group my-4">
                                            <label className="form-label">More Images</label>
                                            <input onChange={(e) => { setItemDetail({ ...itemDetail, moreImgs: e.target.files, }) }}
                                                required
                                                multiple
                                                className="form-control" name="item_image" type="file" />
                                        </div>
                                        <div className="form-group col-lg-12 my-4">
                                            <label className="form-label">Key Words</label>
                                            <input onChange={handleFormChanges}
                                                required
                                                className="form-control" name="tags" type="text" placeholder="Processor, AMD, Ryzen 5, 5500" />
                                        </div>
                                        <button disabled={isStarted===true}  className="btn  btn-success" type="submit"  >Add Item <i className="fa fa-upload"></i></button>

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

export default AddItem
