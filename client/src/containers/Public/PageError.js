import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
const PageError = () => {
    const navigate = useNavigate();
    const HandleHome = useCallback(() => {
        navigate(path.PUBLIC);
        //eslint-disable-next-line
      }, []);
  return (
    <div className="container p-0">
    <div className="row no-gutters height-self-center">
       <div className="col-sm-12 text-center align-self-center">
          <div className="iq-error position-relative">
             <img src="/assets/images/error/404.png" className="img-fluid iq-error-img" alt=""/>
             <h2 className="mb-0 mt-4">Oops! This Page is Not Found.</h2>
             <p>The requested page dose not exist.</p>
             <a
             className="btn btn-primary mt-3" onClick={HandleHome}><i className="ri-home-4-line"></i>Back to Home</a>                            
          </div>
       </div>
    </div>
 </div>
  )
}

export default PageError