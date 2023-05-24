/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Warranty = ({ features,product }) => {
    

    
    return (
        <>
            <div className="col-lg-8 mb-4"  >
                <div className="border rounded-2 px-3 py-2 bg-white">

                    {
                        product.warrenty !== "" ?
                            <>
                                <ul className="nav nav-pills nav-justified mb-3" >
                                    <li className="nav-item d-flex" >
                                        <a className="nav-link d-flex align-items-center justify-content-center w-100" >Warranty info</a>
                                    </li>
                                </ul>
                            </> : <></>
                    }

                    <div className="tab-content" >
                        <div className="tab-pane fade show active" >
                            {
                                product.warrenty !== "" ?
                                    <>
                                        <p>
                                            {product.warrenty}
                                        </p>
                                    </> : <></>
                            }

                            
                                        <table className="table border mt-3 mb-2"> 

                                            {
                                                features.map((data)=>(
                                                            <tr >
                                                                <th className="py-2">{data.featureName}:</th>
                                                                <td className="py-2">{data.featureDetails}</td>
                                                            </tr>
                                                ))
                                            }

                                           

                                        </table>
                                     
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Warranty