import React from 'react'

const Footer = ({ show }) => {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className="text-center text-lg-start text-muted bg-primary mt-3">

                <section className="">
                    <div className="container text-center text-md-start pt-4 pb-4">

                        <div className="row mt-3">

                            {
                                show ?
                                    <></> : <>
                                        <div className="col-12 col-lg-3 col-sm-12 mb-2">

                                            <h2 className="text-white h2">
                                                Go Cart
                                            </h2>
                                            <p className="mt-1 text-white">
                                                © {year} Copyright: Go Cart
                                            </p>
                                        </div>
                                    </>
                            }

                            <div className="col-12 col-sm-12 col-lg-3" style={{ flex: 1 }}>

                                <h6 className="text-uppercase text-white fw-bold mb-2">Newsletter</h6>
                                <p className="text-white">Stay in touch with latest updates about our products and offers</p>
                                <div className="input-group mb-3" style={{ width: "100%" }}>
                                    <input type="email" className="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
                                    <button className="btn btn-light border shadow-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                                        Join
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer