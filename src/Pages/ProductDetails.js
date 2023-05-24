/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react'
import Header from '../Components/Header'
import Warranty from '../Components/Warranty'
import SimilarProducts from '../Components/SimilarProducts'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { productLink, userLink } from '../ApiLink'
import { Context } from '../context/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = () => {
    const navigation = useNavigate()
    const [image, setImage] = useState("")
    const { categorie } = useParams()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [open, setOpen] = useState(false);
    const [productImage, setProductImage] = useState([])
    const { selectedQuantity, setSelectedQuantity, selectedSize, setSelectedSize,name,setName } = useContext(Context)
    const [sameItems, setSameItems] = useState([])
    const [size, setSize] = useState([])
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(false)

    const getById = async () => {
        try {
            setOpen(true)
            await axios.get(`${productLink}/getproduct/${id}`)
                .then((res) => {
                    setProduct(res.data.data)
                    setOpen(false)
                    setImage(res.data.data.image[0])
                    setProductImage(res.data.data.image)
                    setSize(res.data.data.size)
                    setSameItems(res.data.same)
                    setFeatures(res.data.data.productFeatures)
                })
        } catch {
            console.log("error")
            setOpen(false)
        }
    }

    useEffect(() => {
        getById()
        window.scrollTo({ top: 0, behavior: "smooth" })
        document.title = `Go Cart | ${product.name}`
        setName(product.name)
    }, [])

    const Buy = ()=>{
        if(selectedQuantity === 0){
            return toast.warn('🦄 Select Your Quantity', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }else{
            navigation(`/allProduct/${product.name}/${selectedQuantity}/checkout`)
        }
    }


    // adding to cart

    const AddToCart = async (id) => {
        const token = localStorage.getItem("_id")
        if (token) {
            try {
                if (selectedQuantity === 0) {
                    return toast.warn('🦄 Select Your Quantity', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    if (size.length === 0) {
                        setLoading(true)
                        await axios.post(`${userLink}/addtocart/${token}/${id}`, {
                            selectedQuantity, selectedSize
                        })
                            .then((res) => {
                                if(res.data.message === "Product added to cart"){
                                     toast.success('🦄 Product is Added to cart', {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                    setLoading(false)
                                    setSelectedQuantity(0)
                                }else if(res.data.message === "Product updated"){
                                    toast.success('🦄 Cart is Updated', {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                    setLoading(false)
                                    setSelectedQuantity(0)
                                }
                                
                            })
                    } else {
                        if (setSelectedSize === "") {
                            return toast.warn('🦄 Select Your Quantity', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        } else {
                            setLoading(true)
                            await axios.post(`${userLink}/addtocart/${token}/${id}`, {
                                selectedQuantity, selectedSize
                            })
                                .then((res) => {

                                    if(res.data.message === "Product added to cart"){
                                        toast.success('🦄 Product is Added to cart', {
                                           position: "top-center",
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                           progress: undefined,
                                           theme: "colored",
                                       });
                                       setLoading(false)
                                       setSelectedQuantity(0)
                                   }else if(res.data.message === "Product updated"){
                                       toast.success('🦄 Cart is Updated', {
                                           position: "top-center",
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                           progress: undefined,
                                           theme: "colored",
                                       });
                                       setLoading(false)
                                       setSelectedQuantity(0)
                                   }
                                })
                        }
                    }
                }
            } catch {
                navigation("/Go-Cart/Login")
                setLoading(false)
            }
            return
        }
        if (!token) {
            navigation("/Go-Cart/Login")
            return
        }
    }



    return (
        <>
            <Header />

            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image">
                                    <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit" src={image} />
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                {
                                    productImage.map((img) => {
                                        return (
                                            <>
                                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" >
                                                    <img width="60" height="60" className="rounded-2" src={img} onClick={() => {
                                                        window.scrollTo({ top: 20, behavior: "smooth" })
                                                        setImage(img)
                                                    }} />
                                                </a>

                                            </>
                                        )
                                    })
                                }

                            </div>

                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {product.name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">

                                        <span className="ms-1">
                                            {product.rating}
                                        </span>
                                    </div>
                                    {/* <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span> */}
                                    <span className=" ms-2" style={{
                                        color: product.Stock === true ? "green" : "red"
                                    }}>{product.Stock === true ? "In stock" : "Out of Stock"}</span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">₹{product.Newprice}</span>
                                    <span className="text-muted">/per product</span>
                                </div>

                                <p>
                                    {product.description}
                                </p>

                                <div className="row">
                                    <dt className="col-3">Type:</dt>
                                    <dd className="col-9">{product.productType}</dd>

                                    {
                                        product.gender !== "" ?
                                            <>
                                                <dt className="col-3">Gender:</dt>
                                                <dd className="col-9" style={{
                                                    color: product.gender === "Male" ? "blue" : "pink"
                                                }}>{product.gender}</dd>
                                            </> : <></>
                                    }


                                    {
                                        product.color !== "" ?
                                            <>
                                                <dt className="col-3">Color</dt>
                                                <dd className="col-9">{product.color}</dd>

                                            </> : <></>
                                    }
                                    {
                                        product.material !== "" ?
                                            <>
                                                <dt className="col-3">Material</dt>
                                                <dd className="col-9">{product.material}</dd>
                                            </> : <>

                                            </>
                                    }

                                    {
                                        product.brand !== "" ?
                                            <>
                                                <dt className="col-3">Brand</dt>
                                                <dd className="col-9">{product.brand}</dd>
                                            </> : <>

                                            </>
                                    }
                                </div>

                                <hr />

                                <div className="row mb-4">
                                    {
                                        size.length === 0 ?
                                            <>

                                            </> : <>
                                                <div className="col-md-4 col-6">
                                                    <label className="mb-2">Size</label>
                                                    <select className="form-select border border-secondary" onChange={(e) => setSelectedSize(e.target.value)} style={{ height: "35px" }}>
                                                        {
                                                            size.map((size) => {
                                                                return (
                                                                    <>
                                                                        <option>{size}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </>
                                    }

                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group mb-3" style={{ width: "170px" }}>
                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={() => setSelectedQuantity(selectedQuantity - 1)} disabled={selectedQuantity === 0 ? true : false}>
                                                -
                                            </button>
                                            <input type="text" className="form-control text-center border border-secondary" value={selectedQuantity} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                            <button onClick={() => setSelectedQuantity(selectedQuantity + 1)} className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" disabled={selectedQuantity === 10 ? true : false}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <a className="btn btn-warning shadow-0" onClick={Buy}> Buy now </a>
                                {
                                    loading ?
                                        <>
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </> : <>
                                            <a className="btn btn-primary shadow-0" style={{ marginLeft: "20px" }} onClick={() => AddToCart(product._id)}>  Add to cart </a>
                                        </>
                                }
                                {/* <a className="btn btn-light border border-secondary py-2 icon-hover px-3" style={{ marginLeft: "20px" }}>Save </a> */}
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">

                        <Warranty features={features} product={product} />

                        <SimilarProducts sameItems={sameItems} product={product} getById={getById}/>
                    </div>
                </div>
            </section>

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

export default ProductDetails