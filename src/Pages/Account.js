import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './account.css'
// import { Navigation } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import{userLink} from "../ApiLink"
import Footer from "../Components/Footer"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Account = () => {
    const navigation = useNavigate()
    const[totalOrder,setTotalOrder] = useState("")
    const [open, setOpen] = React.useState(false);
    const[inCart,setInCart]=useState("")
    const[order,setOrder] = useState([])
    const[user,setUser]=useState("")
    const getData = async()=>{
        const token = localStorage.getItem('_id')
        if(token){
            try{
                setOpen(true)
                await axios.get(`${userLink}/getalldata/${token}`)
            .then((res)=>{
                setTotalOrder(res.data.userOrder)
                setInCart(res.data.cartCount)
                setUser(res.data.user)
                setOrder(res.data.orderData)
                setOpen(false)
            })
            }catch{
                navigation("/")
                setOpen(false)
            }
        }else{
            navigation("/")
        }
    }

    useEffect(()=>{
        getData()
        document.title = "Go Cart | Account"
    },[])
  return (
    <>
        <Header/>
        <div className="container mt-4">
        <div className="row">
        <div className="col-lg-12 my-lg-0 ">
                <div id="main-content" className="bg-white border">
                    <div className="d-flex flex-column">
                        <div className="h5">{user.Name},</div>
                        <div>Logged in as: {user.Email}</div>
                    </div>
                    <div className="d-flex my-4 flex-wrap">
                        <div className="box me-4 my-1 bg-light">
                            <img src="https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png"
                                alt=""/>
                            <div className="d-flex align-items-center mt-2">
                                <div className="tag">Orders placed</div>
                                <div className="ms-auto number">{totalOrder}</div>
                            </div>
                        </div>
                        <div className="box me-4 my-1 bg-light">
                            <img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png"
                                alt=""/>
                            <div className="d-flex align-items-center mt-2">
                                <div className="tag">Items in Cart</div>
                                <div className="ms-auto number">{inCart}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="text-uppercase">My recent orders</div>
                    {
                        order.map((order)=>{
                            return(
                                <>
                                <div className="order my-3 bg-light">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="d-flex flex-column justify-content-between order-summary">
                                    <div className="d-flex align-items-center">
                                        <div className="text-uppercase">Order <span style={{color:"red",fontSize:"15px"}}> {order._id}</span></div>
                                        <div className="green-label ms-auto text-uppercase">COD</div>
                                    </div>
                                    <div className="fs-8">Products <span style={{color:"red"}}>#{order.product.length}</span></div>
                                    <div className="fs-8">{order.placedDate}</div>
                                    <div className="rating d-flex align-items-center pt-1">
                                        <img src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
                                            alt=""/><span className="px-2" style={{fontSize:"15px",fontFamily:"cursive"}}>{order.address}</span>
                                        
                                    </div>
                                    <div className="text-uppercase">Total Price <span style={{color:"blue",fontSize:"15px"}}> {order.totalPrice}</span></div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                                    <div className="status">Status : Not Delivered</div>
                                    {/* <div className="btn btn-primary text-uppercase">order info</div> */}
                                </div>
                                <div className="progressbar-track">
                                    <ul className="progressbar">
                                        <li id="step-1" className="text-muted green">
                                            <span className="fas fa-gift"></span>
                                        </li>
                                        <li id="step-2" className="text-muted green">
                                            <span className="fas fa-check"></span>
                                        </li>
                                        <li id="step-3" className="text-muted green">
                                            <span className="fas fa-box"></span>
                                        </li>
                                        <li id="step-4" className="text-muted green">
                                            <span className="fas fa-truck"></span>
                                        </li>
                                        <li id="step-5" className="text-muted green">
                                            <span className="fas fa-box-open"></span>
                                        </li>
                                    </ul>
                                    <div id="tracker"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                                </>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>

    </div>
          
        <Footer/>
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        
    </>
  )
}

export default Account