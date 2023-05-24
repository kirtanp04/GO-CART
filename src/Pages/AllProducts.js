/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import { Rating } from 'react-simple-star-rating'
// import { Context } from '../context/Context'
import { useNavigate, useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { productLink} from '../ApiLink'


const AllProducts = () => {
    // const { setRating,rating } = useContext(Context)
    const navigation = useNavigate()
    const [open, setOpen] = React.useState(false);
    const { categorie } = useParams()
    const [productData, setProductData] = React.useState([])
    // const [productDatas, setProductDatas] = React.useState([])
    const [type, setType] = React.useState("All")
    const[data, setData] = React.useState([])
    const[price,setPrice] = React.useState(0)
    const[productType,setProductType] = React.useState([])
    const[productBrand,setProductBrand] = React.useState([])
    // const[currentPage,setCurrentPage]= React.useState(0)
    // const[numbers,setNumbers] = React.useState([])
    

    const handleRating = async(rate) => {
        try{
            setOpen(true)
            await axios.get(`${productLink}/getproductbyrate/${categorie}/${rate}`)
            .then((res)=>{
                setData(res.data)
                window.scrollTo({top:70,behavior:"smooth"})
                setOpen(false)
            })
        }catch{
            alert("error")
        }
            
        
    }
    

    const productTypeData = (data) => {
        const type = data.map((val)=>val.productType)
        data = [...new Set(type)]
        setProductType(data)
    }
    const productBrandData = (data) => {
        const type = data.map((val)=>val.brand)
        data = [...new Set(type)]
        setProductBrand(data)
    }

    // const Paggination = (datas)=>{
    //     const recordPerPage = 6
    // const LastIndex = currentPage * recordPerPage
    // const firstIndex = LastIndex - recordPerPage
    // const record = datas.slice(firstIndex,LastIndex)
    // const Pages = Math.ceil(datas.length / recordPerPage)
    // const numbers = [...Array(Pages + 1).keys()].slice(1)
    // console.log(record)
    // setNumbers(numbers)
    // }

    const getProducts = async () => {
        try {
            setOpen(true)
            await axios.get(`${productLink}/getproducttype/${categorie}`)
                .then((res) => {
                    setProductData(res.data.data)
                    // setProductDatas(res.data.data)
                    setData(res.data.data)
                    setOpen(false)
                    productBrandData(res.data.data)
                    productTypeData(res.data.data)
                    // Paggination(res.data.data)


                })
        } catch {
            alert("error")
            setOpen(false)
        }
    }


    useEffect(() => {
        document.title = `Go Cart | ${categorie}`
        getProducts()

    }, [])

    const searchByType = async(type) => {
        try{
            setOpen(true)
            setType(type)
            await axios.get(`${productLink}/getproductbytype/${type}`)
            .then((res)=>{
                // setProductDatas(res.data)
                setData(res.data)
                setOpen(false)
            })
        }catch{
            alert("error")
            setOpen(false)
        }
    }

    const CheckByGender= async(e)=>{
        try{
            setOpen(true)
            await axios.get(`${productLink}/getproductbygender/${categorie}/${e}`)
            .then((res)=>{
                setData(res.data)
                // setProductDatas(res.data)
                window.scrollTo({top:30,behavior:"smooth"})
                setOpen(false)
            })
        }catch{
            alert("error")
            setOpen(false)
        }
        
    }

    const CheckByPrice = async()=>{
        try{
            setOpen(true)
            await axios.get(`${productLink}/getproductbyprice?min=${price}&cat=${categorie}`)
            .then((res)=>{
                setData(res.data)
                window.scrollTo({top:70,behavior:"smooth"})
                setOpen(false)
            })
        }catch{
            alert("error")
        }
    }

    const FindByBrand=async(product)=>{
        try{
            setOpen(true)
            await axios.get(`${productLink}/productbrand/${categorie}/${product}`)
            .then((res)=>{
                setData(res.data)
                setOpen(false)
            })

        }catch{
            alert("error")
            setOpen(false)
        }
    }

    

    
    
 
    return (
        <>
            <header>
                <Header />

                <div className="bg-primary mb-4">
                    <div className="container py-4" style={{ display: "flex", flexDirection: "row" }}>
                        <h2 className="text-white mt-2" style={{ fontWeight: "bold" }}>{categorie} / </h2>
                        <h4 className="text-white mt-2" style={{ display: "flex", fontWeight: "400", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>{type === "" ? "All Products" : type}</h4>

                    </div>
                </div>

            </header>


            <section className="">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3">

                            <button
                                className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span>Show filter</span>
                            </button>

                            <div className="collapse card d-lg-block mb-5" id="navbarSupportedContent">
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button text-dark bg-light"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#panelsStayOpen-collapseOne"
                                                aria-expanded="true"
                                                aria-controls="panelsStayOpen-collapseOne"
                                            >
                                                Product types
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                            <div className="accordion-body">
                                                <ul className="">
                                                    <li><a className="text-dark" onClick={() =>{ setType("All")
                                                    setData(productData)
                                                    }}>All</a></li>
                                                    {
                                                        productType.map((product) => {
                                                            return (
                                                                <>

                                                                    <li style={{cursor:"pointer"}}><a className="text-dark" onClick={() => searchByType(product)}>{product}</a></li>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button text-dark bg-light"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#panelsStayOpen-collapseTwo"
                                                aria-expanded="true"
                                                aria-controls="panelsStayOpen-collapseTwo"
                                            >
                                                Brands
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo">
                                            <div className="accordion-body">
                                                <div>

                                                    {
                                                        productBrand.map((product) => {
                                                            return (
                                                                <>
                                                                <li style={{cursor:"pointer"}}><a className="text-dark" onClick={()=>FindByBrand(product)} >{product}</a></li>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button text-dark bg-light"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#panelsStayOpen-collapseThree"
                                                aria-expanded="false"
                                                aria-controls="panelsStayOpen-collapseThree"
                                            >
                                                Price
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                                            <div className="accordion-body">
                                                <div className="range">
                                                    <input type="range" className="form-range" id="customRange1" value={price} onChange={(e)=>setPrice(e.target.value)}   max={100000} />
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-6">
                                                        <p className="mb-0">
                                                            I want under <span style={{color:"red"}}>{price}</span> 
                                                        </p>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                <button type="button" className="btn btn-white w-100 border border-secondary" onClick={CheckByPrice}>apply</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            {
                                                categorie === "Clothes" || categorie === "Sports"?
                                                <>
                                                <button
                                                className="accordion-button text-dark bg-light"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#panelsStayOpen-collapseFour"
                                                aria-expanded="false"
                                                aria-controls="panelsStayOpen-collapseFour"
                                            >
                                                Gender
                                            </button>
                                                </>:<></>
                                            }
                                        </h2>
                                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                                            <div className="accordion-body">
                                                {
                                                    categorie === "Clothes" || categorie === "Sports"?
                                                    <>
                                                    <li style={{cursor:"pointer"}}  onClick={(e)=>CheckByGender("Male")}><a className="text-dark" >Male</a></li>
                                                    <li style={{cursor:"pointer"}}  onClick={(e)=>CheckByGender("Female")}><a className="text-dark" >Female</a></li>
                                                    </>:<>

                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button text-dark bg-light"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#panelsStayOpen-collapseFive"
                                                aria-expanded="false"
                                                aria-controls="panelsStayOpen-collapseFive"
                                            >
                                                Ratings
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                                            <div className="accordion-body">

                                                <Rating
                                                    onClick={handleRating}
                                                    

                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                                <strong className="d-block py-2">{data.length} Items found </strong>

                            </header>

                            <div className="row">

                                {
                                    data.map((product, index) => {
                                        return (
                                            <>
                                                <div className="col-lg-4 col-md-6 col-sm-6 d-flex" >
                                                    <div className="card w-100 my-2 shadow-2-strong">
                                                        <img src={product.image[0]} alt='' className="card-img-top" />
                                                        <div className="card-body d-flex flex-column">
                                                            <div >
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-1 me-1">₹{product.Newprice}</h5>
                                                                <span className="text-danger"><s>₹{product.Oldprice}</s></span>
                                                            </div>
                                                            <p className="card-text">{product.name}</p>
                                                            </div>
                                                            
                                                            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                                                <a href="#" className="btn btn-primary shadow-0 me-1" onClick={() => navigation(`/allProduct/${product.categorie}/${product.name}/${product._id}`)}>View Product</a>
                                                        
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>

                            <hr />


                            
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default AllProducts