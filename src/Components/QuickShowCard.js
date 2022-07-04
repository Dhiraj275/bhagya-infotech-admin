import React, { useState } from 'react'

const QuickShowCard = (props) => {
    const item = props.item
    const setIsShow = props.setIsShow
    const [currentDisplay, setCurrentDisplay] = useState(item.coverImgUrl)
    const changeImg = (imgUrl) => {
        setCurrentDisplay(imgUrl)
    }
    return (
        <Parent setIsShow={setIsShow}>
            <Slider item={item} currentDisplay={currentDisplay} changeImg={changeImg} />
            <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                        {item.name}
                        <br />
                        <span style={{ color: "dodgerblue", fontSize: 18, }}>
                            {item.brand}
                        </span>
                    </h4>

                    <span className="mtext-106 cl2">&#8377; {item.price}</span>
                    <ul className="stext-102 cl3 p-t-23 key-list" >
                        {
                            item.keyfeaturs.map((item, index) => {
                                return <li key={index}>{item}</li>
                            })
                        }
                    </ul>
                    {/*  */}
                    <div className="p-t-33">
                        <p  className="stext-102 cl3 p-t-23 key-list">
                           <b>Description</b> : {item.description}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                        <div className="flex-m bor9 p-r-10 m-r-11">
                            <a
                                href="#"
                                className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                data-tooltip="Add to Wishlist"
                            >
                                <i className="zmdi zmdi-favorite" />
                            </a>
                        </div>
                        <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Facebook"
                        >
                            <i className="fa fa-facebook" />
                        </a>
                        <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Twitter"
                        >
                            <i className="fa fa-twitter" />
                        </a>
                        <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Google Plus"
                        >
                            <i className="fa fa-google-plus" />
                        </a>
                    </div>
                </div>
            </div>
        </Parent>
    )

}
const Parent = (props) => {
    const setIsShow = props.setIsShow
    return (
        <>
            <div style={{ position: "fixed", top: "0%", zIndex: 1111, width: "100vw", height: "100vh", left: 0, background: "rgba(0,0,0,.7)", }}>
                <div style={{ transform: 'translateY(-50%)', top: "50%", position: "relative" }} className="container">
                    <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                        <button onClick={() => { setIsShow(false) }} className="how-pos3 hov3 trans-04 js-hide-modal1">
                            <i className="fa fa-times"></i>
                        </button>
                        <div className="row">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
const Slider = (props) => {
    const item = props.item
    const currentDisplay = props.currentDisplay
    const changeImg = props.changeImg
    return (
        <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots">
                        <ul className="slick3-dots" role="tablist" style={{}}>
                            <li onClick={() => { changeImg(item.coverImgUrl) }} className="slick-active" role="presentation">
                                <img src={item.coverImgUrl} />
                                <div className="slick3-dot-overlay" />
                            </li>
                            {
                                item.moreImgUrl.map((item, index) => {
                                    return (
                                        <li onClick={() => { changeImg(item) }} role="presentation">
                                            <img src={item} />
                                            <div className="slick3-dot-overlay" />
                                        </li>)

                                })
                            }
                        </ul>
                    </div>
                    <div className="wrap-slick3-arrows flex-sb-m flex-w">
                    </div>
                    <div className="slick3 gallery-lb slick-initialized slick-slider slick-dotted">
                        <div className="slick-list draggable">
                            <div
                                className="slick-track"
                                style={{ opacity: 1, width: 1539 }}
                            >
                                <div
                                    className="item-slick3 slick-slide slick-current slick-active"
                                    data-thumb="images/product-detail-01.jpg"
                                    data-slick-index={0}
                                    aria-hidden="false"
                                    tabIndex={0}
                                    role="tabpanel"
                                    id="slick-slide10"
                                    aria-describedby="slick-slide-control10"
                                    style={{
                                        width: 513,
                                        position: "relative",
                                        left: 0,
                                        top: 0,
                                        zIndex: 999,
                                        opacity: 1
                                    }}
                                >
                                    <div className="wrap-pic-w pos-relative">
                                        <img
                                            src={currentDisplay}
                                            alt="IMG-PRODUCT"
                                        />
                                        <a
                                            className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                            href={currentDisplay}
                                            tabIndex={0}
                                            target="_blank"
                                        >
                                            <i className="fa fa-expand" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuickShowCard

export {Parent, Slider}
//npa
{/* <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Size</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <select
                            className="js-select2 select2-hidden-accessible"
                            name="time"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option>Choose an option</option>
                            <option>Size S</option>
                            <option>Size M</option>
                            <option>Size L</option>
                            <option>Size XL</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            style={{ width: 142 }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-labelledby="select2-time-6r-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-time-6r-container"
                                  title="Choose an option"
                                >
                                  Choose an option
                                </span>
                                <span
                                  className="select2-selection__arrow"
                                  role="presentation"
                                >
                                  <b role="presentation" />
                                </span>
                              </span>
                            </span>
                            <span className="dropdown-wrapper" aria-hidden="true" />
                          </span>
                          <div className="dropDownSelect2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Color</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <select
                            className="js-select2 select2-hidden-accessible"
                            name="time"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option>Choose an option</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>White</option>
                            <option>Grey</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            style={{ width: 142 }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--single"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={0}
                                aria-labelledby="select2-time-vt-container"
                              >
                                <span
                                  className="select2-selection__rendered"
                                  id="select2-time-vt-container"
                                  title="Choose an option"
                                >
                                  Choose an option
                                </span>
                                <span
                                  className="select2-selection__arrow"
                                  role="presentation"
                                >
                                  <b role="presentation" />
                                </span>
                              </span>
                            </span>
                            <span className="dropdown-wrapper" aria-hidden="true" />
                          </span>
                          <div className="dropDownSelect2" />
                        </div>
                      </div>
                    </div> */}