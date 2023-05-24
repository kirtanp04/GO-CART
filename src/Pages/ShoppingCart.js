/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../Components/Header'
import CartTotalPrice from '../Components/CartTotalPrice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userLink } from '../ApiLink'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShoppingCart = () => {
    const navigation = useNavigate()
    const [cart, setCart] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [updateData, setUpdateData] = React.useState("")
    const [selectedQuantity, setSelectedQuantity] = React.useState(0)
    const [selectedSize, setSelectedSize] = React.useState("")
    const[size,setSize]= React.useState([])

    const Update = async () => {
        const token = await localStorage.getItem('_id')
        if (token) {
            if (selectedQuantity === 0) {
                return toast.error('🦄 Select Quantity', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }  else {
                try {
                    setOpen(true)
                    await axios.post(`${userLink}/updatecart/${token}/${updateData._id}`, {
                        selectedQuantity, selectedSize
                    }).then((res) => {
                        if (res.data.message === "Success") {
                            setOpen(false)
                            getCartData()
                        }
                    })
                } catch {
                    toast.error('🦄  Server Error', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setOpen(false)
                }
            }

        } else {
            navigation("/Go-Cart/login")
        }
    }


    const getCartData = async () => {
        const token = await localStorage.getItem('_id')
        if (token) {
            setOpen(true)
            await axios.get(`${userLink}/getcart/${token}`)
                .then((res) => {
                    setCart(res.data)


                    setOpen(false)
                }).catch(() => {
                    navigation("/Go-Cart/Login")
                })
        } else {
            navigation("/Go-Cart/Login")
        }
    }

    useEffect(() => {
        getCartData()
        document.title = "Go Cart | Cart"
    }, [])


    const Remove = async (id) => {
        try {
            setOpen(true)
            await axios.delete(`${userLink}/deletcartitemtem/${id}`)
                .then((res) => {
                    if (res.data.message === "Item deleted") {
                        getCartData()
                        setOpen(false)
                    }
                })
        } catch {
            alert("server error")
            setOpen(false)
        }
    }

    return (
        <>
            <Header />

            <section className="bg-light ">
                <div className="container">
                    <div className="row" >

                        <div className="col-lg-9" style={{ marginTop: "3rem" }}>
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Your shopping cart</h4>
                                    {
                                        cart.length > 0 ?
                                            <>
                                                {

                                                    cart.map((item, index) => {
                                                        return (
                                                            <>
                                                                <div className="row gy-3 mb-4" >
                                                                    <div className="col-lg-5">
                                                                        <div className="me-lg-5">
                                                                            <div className="d-flex">
                                                                                <img src={item.Image} className="border rounded me-3" style={{ width: "96px", height: "96px" }} />
                                                                                <div className="" >
                                                                                    <a className="nav-link" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{item.productName}</a>
                                                                                    {
                                                                                        item.Size !== "" ?
                                                                                            <>
                                                                                                <p className="text-muted" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{item.Size}</p>
                                                                                            </> : <></>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-1 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                                        <div className="">
                                                                            <select style={{ width: "100px" }} value={item.Quantity} className="form-select me-4">
                                                                                <option>{item.Quantity}</option>

                                                                            </select>
                                                                        </div>
                                                                        <div className="">
                                                                            <text className="h6">₹{item.totalPrice}</text> <br />
                                                                            <small className="text-muted text-nowrap"> ₹{item.Price} / per item </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                                        <div className="float-md-end">
                                                                            <a className="btn btn-light border text-danger icon-hover-danger" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {setUpdateData(item)
                                                                            }}>Update</a>
                                                                            <a className="btn btn-light border text-danger icon-hover-danger" onClick={() => Remove(item._id)}> Remove</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </> : <>
                                                <div className="title">
                                                    <h2>Your Cart is Empty!!!</h2>
                                                </div>
                                            </>
                                    }


                                </div>

                                <div className="border-top pt-4 mx-4 mb-4">
                                    <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>

                                </div>
                            </div>
                        </div>

                        <CartTotalPrice cart={cart} open=
                            {open} />

                    </div>
                </div>
            </section>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Update your Cart Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setUpdateData("")}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row-md-4 col-6" style={{ display: "flex", flexDirection: "row" }}>
                                <div>
                                    <label className="mb-2">Quantity</label>
                                    <select style={{ width: "100px" }} onChange={(e) => setSelectedQuantity(e.target.value)} className="form-select me-4">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                                {/* {
                                    updateData.Size !== "" ?
                                        <>
                                            <div>
                                                <label className="mb-2">Size</label>
                                                <select className="form-select border border-secondary" onChange={(e) => setSelectedSize(e.target.value)} style={{ height: "35px" }}>

                                                    {
                                                        size.map((val)=>{
                                                            return(
                                                                <>
                                                                <option value={val}>{val}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </> : <></>
                                } */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setUpdateData("")}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>





            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default ShoppingCart