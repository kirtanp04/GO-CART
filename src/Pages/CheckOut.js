/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userLink } from '../ApiLink'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {
  const navigation = useNavigate()
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false);
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [house, setHouse] = useState("")
  const [pinCode, setPin] = useState("")
  const [mess, setMess] = useState("")
  const [total, setTotal] = useState("")
  const getUserData = async () => {
    const token = await localStorage.getItem('_id')
    if (token) {
      try {
        setOpen(true)
        await axios.get(`${userLink}/getuserdata/${token}`)
          .then((res) => {

            setFname(res.data.Name)
            setEmail(res.data.Email)
            setPhone(res.data.Phone)
            setAddress(res.data.Address)
            setOpen(false)

          })
      } catch {
        navigation("/Go-Cart/Login")
      }
    } else {
      navigation("/Go-Cart/Login")
    }
  }

  const getCart = async () => {
    const token = await localStorage.getItem('_id')
    if (token) {
      try {
        setOpen(true)
        await axios.get(`${userLink}/getcart/${token}`)
          .then((res) => {
            setCart(res.data)
            const total = res.data.map((val) => val.totalPrice * 1).reduce((partialSum, a) => partialSum + a, 0) - 60 + 24 + 14
            setTotal(total)
            setOpen(false)
          })
      } catch {
        navigation("/Go-Cart/Login")
      }
    } else {
      navigation("/Go-Cart/Login")
    }
  }

  const Send = async () => {
    const token = await localStorage.getItem('_id')

    if (token) {
      if (email === "") {
        return toast.warn('🦄 Enter Email', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (fname === "") {
        return toast.warn('🦄 Enter First Name', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (lname === "") {
        return toast.warn('🦄 Enter Last Name', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (address === "") {
        return toast.warn('🦄 Enter Your Address', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (city === "") {
        return toast.warn('🦄 Enter City Name', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (house === "") {
        return toast.warn('🦄 Enter Your House Name', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (phone === "") {
        return toast.warn('🦄 Enter Correct Phone Number', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (zip === "") {
        return toast.warn('🦄 Zip Must Be Number', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (pinCode === "") {
        return toast.warn('🦄 Post Code Must Be Number', {
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
        try {
          setOpen(true)
          await axios.post(`${userLink}/placeorder/${token}`, {
            fname,
            lname,
            email,
            phone,
            address,
            city,
            zip,
            house,
            pinCode,
            mess,
            cart,
            total

          }).then((res) => {
            if (res.data.message === "Order Placed Successfully") {
              setOpen(false)
              
              setTimeout(()=>{
                toast.success('🦄 Order has been Placed', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              },1500)
              navigation("/")
            }
          })
        } catch {
          navigation("/Go-Cart/Login")
        }
      }
    } else {
      navigation("/Go-Cart/Login")
    }
  }

  useEffect(() => {
    document.title = "Go Cart | Checkout"
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getUserData()
    getCart()
  }, [])
  return (
    <>
      <Header />
      <div className="bg-primary">
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
            </h6>
          </nav>
        </div>
      </div>

      {/* Addresss */}

      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 mb-4">

              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3">Guest checkout</h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <p className="mb-0">First name</p>
                      <div className="form-outline">
                        <input type="text" onChange={(e) => setFname(e.target.value)} placeholder="Type here" value={fname} className="form-control" />
                      </div>
                    </div>

                    <div className="col-6">
                      <p className="mb-0">Last name</p>
                      <div className="form-outline">
                        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Type here" className="form-control" />
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <p className="mb-0">Phone</p>
                      <div className="form-outline">
                        <input type="tel" id="typePhone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <p className="mb-0">Email</p>
                      <div className="form-outline">
                        <input type="email" id="typeEmail" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                      </div>
                    </div>
                  </div>


                  <hr className="my-4" />

                  <h5 className="card-title mb-3">Shipping info</h5>

                  <div className="row mb-3">
                    <div className="col-lg-4 mb-3">

                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                          <label className="form-check-label" for="flexRadioDefault1">
                            Express delivery <br />
                            <small className="text-muted">3-4 days via Fedex </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">

                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                          <label className="form-check-label" for="flexRadioDefault2">
                            Post office <br />
                            <small className="text-muted">20-30 days via post </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">

                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                          <label className="form-check-label" for="flexRadioDefault3">
                            Self pick-up <br />
                            <small className="text-muted">Come to our shop </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-8 mb-3">
                      <p className="mb-0">Address</p>
                      <div className="form-outline">
                        <input type="text" id="typeText" placeholder="Type here" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                      </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <p className="mb-0">City</p>
                      <div className="form-outline">
                        <input type="text" id="typeText" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Type here" className="form-control" />
                      </div>
                    </div>

                    <div className="col-sm-4 mb-3">
                      <p className="mb-0">House</p>
                      <div className="form-outline">
                        <input type="text" id="typeText" value={house} onChange={(e) => setHouse(e.target.value)} placeholder="Type here" className="form-control" />
                      </div>
                    </div>

                    <div className="col-sm-4 col-6 mb-3">
                      <p className="mb-0">Postal code</p>
                      <div className="form-outline">
                        <input type="text" id="typeText" value={pinCode} onChange={(e) => setPin(e.target.value)} className="form-control" />
                      </div>
                    </div>

                    <div className="col-sm-4 col-6 mb-3">
                      <p className="mb-0">Zip</p>
                      <div className="form-outline">
                        <input type="text" id="typeText" value={zip} onChange={(e) => setZip(e.target.value)} className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="mb-0">Message to seller</p>
                    <div className="form-outline">
                      <textarea className="form-control" value={mess} onChange={(e) => setMess(e.target.value)} id="textAreaExample1" rows="2"></textarea>
                    </div>
                  </div>

                  <div className="float-end">

                    <button className="btn btn-success shadow-0 border" onClick={Send}>Continue</button>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
              <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: "320px" }}>
                <h6 className="mb-3">Summary</h6>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2">₹{cart.map((val) => val.totalPrice * 1).reduce((partialSum, a) => partialSum + a, 0)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount:</p>
                  <p className="mb-2 text-danger">- ₹60.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Shipping cost:</p>
                  <p className="mb-2">+ ₹14.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Tax:</p>
                  <p className="mb-2">+ ₹24.00</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2 fw-bold">₹{cart.map((val) => val.totalPrice * 1).reduce((partialSum, a) => partialSum + a, 0) - 60 + 24 + 14} </p>
                </div>



                <hr />
                <h6 className="text-dark my-4">Items in cart</h6>

                {
                  cart.length > 0 ?
                    <>
                      {
                        cart.map((item, index) => {
                          return (
                            <>
                              <div className="d-flex align-items-center mb-4">
                                <div className="me-3 position-relative">

                                  <img src={item.Image} style={{ height: "96px", width: "96px" }} className="img-sm rounded border" />
                                </div>
                                <div className="">
                                  <a className="nav-link">
                                    {item.productName}--<span style={{ color: "red" }}>{item.Quantity}</span> <br />

                                  </a>
                                  <div className="price text-muted">PerItem: ₹{item.Price}</div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </> : <>

                    </>
                }



              </div>
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

export default CheckOut