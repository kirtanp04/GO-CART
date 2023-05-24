/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { Context } from '../context/Context'

const CartTotalPrice = ({ cart }) => {
    const navigation = useNavigate()
    return (
        <>
            {
                cart.length > 0 ?
                    <>
                        <div className="col-lg-3" style={{ marginTop: "3rem" }}>

                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2">₹{cart.map((val) => val.totalPrice * 1).reduce((partialSum, a) => partialSum + a, 0)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Discount:</p>
                                        <p className="mb-2 text-success">₹60.00</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">TAX:</p>
                                        <p className="mb-2">₹24.00</p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2 fw-bold">₹{cart.map((val) => val.totalPrice * 1).reduce((partialSum, a) => partialSum + a, 0) - 60 + 24} </p>
                                    </div>

                                    <div className="mt-3">
                                        <a className="btn btn-success w-100 shadow-0 mb-2" onClick={() => navigation("/cart/checkout")}> Make Purchase </a>
                                        {/* <a className="btn btn-light w-100 border mt-2"> Back  </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <></>
            }
        </>
    )
}

export default CartTotalPrice