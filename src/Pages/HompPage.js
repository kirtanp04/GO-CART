/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import { productLink } from '../ApiLink';
import axios from 'axios';




const HompPage = () => {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false);
    const navigation = useNavigate()
    const [productData, setProductData] = useState([])


    const getProducts = async () => {
        try {
            setOpen(true)
            await axios.get(`${productLink}/getallproducts`)
                .then((res) => {
                    setProductData(res.data.product)
                    setOpen(false)
                })
        } catch {
            console.log("error")
            setOpen(false)
        }
    }

    useEffect(() => {
        getProducts()
        document.title = "Go Cart"
        if (window.location.pathname === "/") {
            setShow(true)
        }
    }, [])




    return (
        <>
            <Header  />


            <section className="mt-3">
                <div className="container">
                    <main className="card p-3 shadow-2-strong">
                        <div className="row">
                            <div className="col-lg-3">
                                <nav className="nav flex-column nav-pills mb-md-2">
                                    <a className="nav-link active py-2 ps-3 my-0" aria-current="page" onClick={() => navigation("/allProduct/Electronic")} >Electronics</a>
                                    <a className="nav-link my-0 py-2 ps-3 bg-white" onClick={() => navigation("/allProduct/Clothes")} >Clothes and wear</a>
                                    <a className="nav-link my-0 py-2 ps-3 bg-white" onClick={() => navigation("/allProduct/Home")} >Home interiors</a>
                                    <a className="nav-link my-0 py-2 ps-3 bg-white" onClick={() => navigation("/allProduct/Sports")}>Sports and outdoor</a>
                                    <a className="nav-link my-0 py-2 ps-3 bg-white" onClick={() => navigation("/allProduct/Animal")}>Animal and pets</a>
                                </nav>
                            </div>
                            <div className="col-lg-9">
                                <div className="card-banner h-auto p-5 bg-primary rounded-5" style={{ height: "350px" }}>
                                    <div>
                                        <h2 className="text-white">
                                            Great products with <br />
                                            best deals
                                        </h2>
                                        <p className="text-white">No matter how far along you are in your sophistication as an amateur astronomer, there is always one.</p>
                                        <a className="btn btn-light shadow-0 text-primary" style={{ cursor: "auto" }}> Get products by Categories </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </section>

            <section>
                <div className="container my-5">
                    <header className="mb-4">
                        <h3>New products</h3>
                    </header>
                    <div className="row" >

                        {
                            productData.map((product, index) => {
                                return (
                                    <>

                                        <div class="col-lg-3 col-md-6 col-sm-6" onClick={()=>navigation(`/allProduct/${product.categorie}/${product.name}/${product._id}`)}>
                                            <div class="card my-2 shadow-0">
                                                <a class="img-wrap">
                                                    <div class="mask" style={{ height: "50px" }}>
                                                        <div class="d-flex justify-content-start align-items-start h-100 m-2">
                                                            <h6><span class="badge bg-success pt-2">Offer</span></h6>
                                                        </div>
                                                    </div>
                                                    <img src={product.image[0]} class="card-img-top" style={{ aspectRatio: "1 / 1" }} />
                                                </a>
                                                <div class="card-body p-0 pt-3" style={{marginLeft:"1rem"}}>
                                                    {/* <a href="#!" class="btn btn-light border px-2 pt-2 float-end icon-hover"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a> */}
                                                    <h5 class="card-title">₹{product.Newprice}</h5>
                                                    <p class="card-text mb-0">{product.name}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>

                </div>
            </section >

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
    )
}

export default HompPage