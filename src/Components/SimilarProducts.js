/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SimilarProducts = ({ sameItems,product,getById }) => {

    const navigation = useNavigate()

    const Navigate = (item)=>{
        window.scrollTo({top:0,behavior:"smooth"})
        navigation(`/allProduct/${item.categorie}/${item.name}/${item._id}`)
        window.location.reload()
    }

    return (
        <>
            <div className="col-lg-4">
                <div className="px-0 border rounded-2 shadow-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Similar items</h5>

                            {
                                sameItems.filter((data)=>data._id !== product._id).map((item, index) => {
                                    return (
                                        <>
                                            <div className="d-flex mb-3" key={index} onClick={()=>Navigate(item)}>
                                                <a className="me-3">
                                                    <img src={item.image[0]} style={{ minWidth: "96px", height: "96px" }} className="img-md img-thumbnail" />
                                                </a>
                                                <div className="info">
                                                    <a className="nav-link mb-1">
                                                       {item.name}
                                                    </a>
                                                    <strong className="text-dark"> ₹{item.Newprice}</strong>
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
        </>
    )
}

export default SimilarProducts