import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Header = () => {
  const[show,setShow] = useState(false)
  const navigation = useNavigate()
    const getId =async()=>{
      const data = await localStorage.getItem("_id")
      if(data){
        setShow(true)
      }else{
        setShow(false)
      }
    }
  useEffect(()=>{
    getId()
  },[])

  const Logout = async()=>{
    await localStorage.removeItem("_id")
    navigation("/")
  }

  return (
    <>
        
        <div className="p-3 text-center bg-white border-bottom">
          <div className="container">
            <div className="row gy-3">

              

              <div className="order-lg-last col-lg-5 col-sm-8 col-8" style={{display:"flex",justifyContent:"end",alignSelf:"center",alignItems:"center",marginRight:"auto"}}>
                <div className="d-flex float-end" >
                  {
                    show ?
                    <>
                    <Link href="https://github.com/mdbootstrap/bootstrap-material-design" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" onClick={Logout} >
                    
                    <p className="d-none d-md-block mb-0">Logout</p>
                    </Link>
                    </>:<>
                    <Link to={"/Go-Cart/Register"} href="https://github.com/mdbootstrap/bootstrap-material-design" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" >
                    
                    <p className="d-none d-md-block mb-0">Register</p>
                    </Link>
                  
                    <Link to={"/Go-Cart/login"}  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" >
                    
                    <p className="d-none d-md-block mb-0">Login</p>
                  </Link>
                    </>
                  }
                    
                    <Link to={"/"} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" >
                    
                    <p className="d-none d-md-block mb-0">Home</p>
                  </Link>
                  
                  <Link to={"/cart"} className="border rounded py-1 px-3 nav-link d-flex align-items-center" >
                    
                    <p className="d-none d-md-block mb-0">My cart</p>
                  </Link>
                  {
                    show?
                    <>
                    <Link to={"/Go-Cart/account"} className="border rounded py-1 px-3 nav-link d-flex align-items-center" >
                    
                    <p className="d-none d-md-block mb-0">Account</p>
                    </Link>
                    </>:<></>
                  }
                    
                </div>
              </div>

              <div className="col-lg-5 col-md-12 col-12">
                <div className="input-group float-center">
                  {
                    show ?
                    <>
                      <h4>Go Cart</h4>
                    </> : <>
                    <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder='Search by Name' />
                    
                  </div>
                  <button type="button" className="btn btn-primary shadow-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                    </>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>


        



    </>
  )
}

export default Header