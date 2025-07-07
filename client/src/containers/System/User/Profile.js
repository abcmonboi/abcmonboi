import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row profile-content">
          <div className="col-12 col-md-12 col-lg-4">
            <div className="iq-card">
              <div className="iq-card-body profile-page">
                <div className="profile-header">
                  <div className="cover-container text-center d-flex justify-content-center flex-column ">
                 { currentUser?.avatar ? (
                   <div
                   className=" rounded-circle  d-flex align-items-center justify-content-center "
                   style={{
                     margin: "0 auto",
                   }}
                 >
                     <img
                       style={{width: "100px", height: "100px", objectFit: "cover"}}
                       src={currentUser?.avatar }
                      alt="profile-bg"
                      className="rounded-circle img-fluid"
                    />
                 </div>
              ) : (
                    
                    <div
                        className=" rounded-circle  d-flex align-items-center justify-content-center "
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          backgroundColor: "var(--iq-dark-primary)",
                        }}
                      >
                        <i
                          style={{
                            fontSize: "40px",
                          }}
                          className="fa fa-user text-primary "
                        ></i>
                      </div>
                    )}
                    <div className="profile-detail mt-3">
                      <h3>{!currentUser?.firstname || !currentUser?.lastname ?
                      "User Name Here" : currentUser?.firstname + " " + currentUser?.lastname}</h3>
                      <p className="text-primary">{+currentUser?.role ===6699 ? "Admin" : "Member"}</p>
                      <p>
                      {+currentUser?.role === 6699 ? "Admin Code:" : "Member Code: "}
                         
                        <span style={{fontSize: "1.0em",fontFamily:"'Poppins', sans-serif",fontWeight:"500",color:"var(--iq-dark-title-text)",
                    display: "block"}} className="">{currentUser?._id?.match(/.{1,4}/g).join("-").toUpperCase()}</span>
                      </p>
                    
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
         
         
          </div>
          <div className="col-12 col-md-12 col-lg-8">
            
            <div className="row">
              <div className="col-md-12">
              <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between align-items-center mb-0">
                <div className="iq-header-title">
                  <h4 className="card-title mb-0">Personal Details</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <ul className="list-inline p-0 mb-0">
                  <li>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Birthday</h6>
                      <p className="mb-0">{currentUser?.dateOfBirth ? currentUser?.dateOfBirth : "Chưa thêm ngày sinh"}</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Address</h6>
                      <p className="mb-0">{currentUser?.addressString ? currentUser?.addressString.replace(/ /g, " "): "Chưa thêm địa chỉ"}</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Phone</h6>
                      <p className="mb-0">{currentUser?.mobile ? currentUser?.mobile : "Chưa thêm số điện thoại"}</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Email</h6>
                      <p className="mb-0">{currentUser?.email ? currentUser?.email : "Chưa thêm email"}</p>
                    </div>
                  </li>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    </div>
                 
                </ul>
              </div>
            </div>
              
              </div>
            
            </div>
          
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
