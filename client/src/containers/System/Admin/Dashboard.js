import React from 'react'

const Dashboard = () => {
  return (
    <div id="content-page" className="content-page">
    <div className="container-fluid">
       <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div className="d-flex align-items-center justify-content-between">
                      <h6>Music Artist</h6>
                      <span className="iq-icon"><i className="ri-information-fill"></i></span>
                   </div>
                   <div className="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                      <div className="iq-map text-primary font-size-32"><i className="ri-bar-chart-grouped-line"></i></div>
                      <div className="d-flex align-items-center">
                         <h2>352</h2>
                         <div className="rounded-circle iq-card-icon iq-bg-primary ml-3"> <i className="ri-inbox-fill"></i></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div className="d-flex align-items-center justify-content-between">
                      <h6>Music Album</h6>
                      <span className="iq-icon"><i className="ri-information-fill"></i></span>
                   </div>
                   <div className="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                      <div className="iq-map text-success font-size-32"><i className="ri-bar-chart-grouped-line"></i></div>
                      <div className="d-flex align-items-center">
                         <h2>987</h2>
                         <div className="rounded-circle iq-card-icon iq-bg-success ml-3"><i className="ri-price-tag-3-line"></i></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div className="d-flex align-items-center justify-content-between">
                      <h6>Music Followers</h6>
                      <span className="iq-icon"><i className="ri-information-fill"></i></span>
                   </div>
                   <div className="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                      <div className="iq-map text-danger font-size-32"><i className="ri-bar-chart-grouped-line"></i></div>
                      <div className="d-flex align-items-center">
                         <h2>2.5K</h2>
                         <div className="rounded-circle iq-card-icon iq-bg-danger ml-3"><i className="ri-radar-line"></i></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div className="d-flex align-items-center justify-content-between">
                      <h6>Music Comments</h6>
                      <span className="iq-icon"><i className="ri-information-fill"></i></span>
                   </div>
                   <div className="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                      <div className="iq-map text-info font-size-32"><i className="ri-bar-chart-grouped-line"></i></div>
                      <div className="d-flex align-items-center">
                         <h2>5.2M</h2>
                         <div className="rounded-circle iq-card-icon iq-bg-info ml-3"><i className="ri-refund-line"></i></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="col-lg-8">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div id="progress-chart-2"></div>
                </div>
             </div>
          </div>
          <div className="col-lg-4">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-header d-flex justify-content-between">
                   <div className="iq-header-title">
                      <h4 className="card-title">Best artist </h4>
                   </div>
                   <div className="iq-card-header-toolbar d-flex align-items-center">
                      <div className="dropdown">
                         <span className="dropdown-toggle" id="dropdownMenuButton1" data-toggle="dropdown">
                         <i className="ri-more-fill"></i>
                         </span>
                         <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1" style={{}}>
                            <a className="dropdown-item"><i className="ri-eye-fill mr-2"></i>View</a>
                            <a className="dropdown-item"><i className="ri-delete-bin-6-fill mr-2"></i>Delete</a>
                            <a className="dropdown-item"><i className="ri-pencil-fill mr-2"></i>Edit</a>
                            <a className="dropdown-item"><i className="ri-printer-fill mr-2"></i>Print</a>
                            <a className="dropdown-item"><i className="ri-file-download-fill mr-2"></i>Download</a>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="iq-card-body">
                   <ul className="list-inline p-0 m-0">
                      <li className="d-flex mb-3 align-items-center p-3 sell-list border border-primary rounded">
                         <div className="user-img img-fluid">
                            <img src="/assets/images/user/01.jpg" alt='' className="img-fluid rounded-circle avatar-40"/>
                         </div>
                         <div className="media-support-info ml-3">
                            <h6>Pete Sariya</h6>
                            <p className="mb-0 font-size-12">24 jan, 2020</p>
                         </div>
                         <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="badge badge-pill badge-primary">157</div>
                         </div>
                      </li>
                      <li className="d-flex mb-3 align-items-center p-3 sell-list border border-success rounded">
                         <div className="user-img img-fluid">
                            <img src="/assets/images/user/02.jpg" alt='name'  className="img-fluid rounded-circle avatar-40"/>
                         </div>
                         <div className="media-support-info ml-3">
                            <h6>Anna Mull</h6>
                            <p className="mb-0 font-size-12">15 feb, 2020</p>
                         </div>
                         <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="badge badge-pill badge-success">280</div>
                         </div>
                      </li>
                      <li className="d-flex align-items-center p-3 sell-list border border-danger rounded">
                         <div className="user-img img-fluid">
                            <img src="/assets/images/user/03.jpg" alt='name' className="img-fluid rounded-circle avatar-40"/>
                         </div>
                         <div className="media-support-info ml-3">
                            <h6>Alex john</h6>
                            <p className="mb-0 font-size-12">05 March, 2020</p>
                         </div>
                         <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="badge badge-pill badge-danger">200</div>
                         </div>
                      </li>
                   </ul>
                </div>
             </div>
          </div>
          <div className="col-lg-4">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <div id="progress-chart-1"></div>
                   <div className="table-responsive">
                         <table className="table mb-0 table-borderless">
                            <thead>
                               <tr>
                                  <th scope="col">Album</th>
                                  <th scope="col">Song No</th>
                                  <th scope="col">Review</th>
                               </tr>
                            </thead>
                            <tbody>
                               <tr>
                                  <td>Like That</td>
                                  <td>#1525</td>
                                  <td>3.5<i className="ri-star-fill text-warning pl-2"></i></td>
                               </tr>
                               <tr>
                                  <td>Said Sum</td>
                                  <td>#1200</td>
                                  <td>4.5<i className="ri-star-fill text-warning pl-2"></i></td>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                </div>
             </div>
          </div>
          <div className="col-lg-4">
             <div className="iq-card">
               <div className="iq-card-body">
                   <div className="d-flex align-items-top justify-content-between">
                      <div className="media align-items-center">
                          <div className="music-icon-2 text-center text-danger">
                              <i className="fa fa-smile-o"></i>
                          </div>
                          <div className="iq-card-text pl-3">
                              <h5>Positive Comment</h5>
                              <div className="d-block line-height">
                                  <span className="font-size-11 text-warning">
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                  </span>                                             
                               </div>
                          </div>
                      </div>
                      <p className="mb-1">50/100</p>
                   </div>
               </div>
           </div>
           <div className="iq-card">
               <div className="iq-card-body">
                   <div className="d-flex align-items-top justify-content-between">
                      <div className="media align-items-center">
                          <div className="music-icon-2 text-center text-danger">
                              <i className="fa fa-smile-o"></i>
                          </div>
                          <div className="iq-card-text pl-3">
                              <h5>Average Comment</h5>
                              <div className="d-block line-height">
                                  <span className="font-size-11 text-warning">
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                  </span>                                             
                               </div>
                          </div>
                      </div>
                      <p className="mb-1">25/100</p>
                   </div>
               </div>
           </div>
           <div className="iq-card">
               <div className="iq-card-body">
                   <div className="d-flex align-items-top justify-content-between">
                      <div className="media align-items-center">
                          <div className="music-icon-2 text-center text-danger">
                              <i className="fa fa-meh-o"></i>
                          </div>
                         <div className="iq-card-text pl-3">
                           <h5>Negative Comment</h5>
                           <div className="d-block line-height">
                               <span className="font-size-11 text-warning">
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                                  <i className="fa fa-star"></i>
                               </span>                                             
                            </div>
                         </div>
                      </div>
                      <p className="mb-1">05/100</p>
                   </div>
               </div>
          </div>
          <div className="iq-card mb-0">
             <div className="iq-card-body p-2">
                <div id="menu-chart-demo3"></div>
             </div>
          </div>
       </div>
          <div className="col-lg-4">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                   <h2 className="mb-0"><span className="counter" style={{visibility: "visible"}}>3450</span></h2>
                   <p className="mb-0">Music Followers</p>
                   <h6 className="mb-4"><span className="text-success mr-2">20%</span>Positive reviews</h6>
                   <a 
                    className="btn btn-danger d-block mt-5 mb-4"> Add Song</a>
                   <div className="mt-2">
                      <div className="d-flex align-items-center justify-content-between">
                         <p className="mt-1 mb-2">Songs</p>
                         <h4 className="counter" style={{visibility: "visible"}}>81</h4> 
                      </div>
                      <div className="iq-progress-bar-linear d-inline-block w-100">
                         <div className="iq-progress-bar bg-primary-light iq-progress-bar-icon">
                            <span className="bg-primary" data-percent="50"></span>
                         </div>
                      </div>
                   </div>
                   <div className="mt-2">
                      <div className="d-flex align-items-center justify-content-between">
                         <p className="mt-1 mb-2">Albems</p>
                         <h4 className="counter" style={{visibility: "visible"}}>124</h4> 
                      </div>
                      <div className="iq-progress-bar-linear d-inline-block w-100">
                         <div className="iq-progress-bar bg-success-light iq-progress-bar-icon">
                            <span className="bg-success" data-percent="50"></span>
                         </div>
                      </div>
                   </div>
                   <div className="mt-2">
                      <div className="d-flex align-items-center justify-content-between">
                         <p className="mt-1 mb-2">Videos</p>
                         <h4 className="counter" style={{visibility: "visible"}}>74</h4> 
                      </div>
                      <div className="iq-progress-bar-linear d-inline-block w-100">
                         <div className="iq-progress-bar bg-danger-light iq-progress-bar-icon">
                            <span className="bg-danger" data-percent="50"></span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="col-lg-12">
             <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-header d-flex justify-content-between">
                   <div className="iq-header-title">
                      <h4 className="card-title">Song Table</h4>
                   </div>
                   <div className="iq-card-header-toolbar d-flex align-items-center">
                      <button className="btn btn-outline-primary">View All</button>
                   </div>
                </div>
                <div className="iq-card-body rec-pat">
                   <div className="table-responsive">
                      <table className="table table-striped mb-0 table-borderless">
                         <thead>
                            <tr>
                               <th>No</th>
                               <th>Song</th>
                               <th>Name</th>
                               <th>File Size</th>
                               <th>Date</th>
                               <th>Review</th>
                               <th>Status</th>
                            </tr>
                         </thead>
                         <tbody>
                            <tr>
                               <td>1</td>
                               <td>Life Is Good</td>
                               <td>
                                  <div className="media align-items-center">
                                     <img src="/assets/images/user/01.jpg" className="img-fluid avatar-35 rounded" alt="username"/>
                                     <div className="media-body ml-3">
                                        <p className="mb-0">Pete Sariya</p>
                                     </div>
                                  </div>
                               </td>
                               <td>20.04 Mb</td>
                               <td>20/08/2020</td>
                               <td>
                                  <div className="d-block line-height">
                                     <span className="font-size-11 text-warning">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                     </span>                                             
                                  </div>
                               </td>
                               <td>
                                  <span className="badge badge-success">Success</span>
                               </td>
                            </tr>
                            <tr>
                               <td>2</td>
                               <td>Harry Styles</td>
                               <td>
                                  <div className="media align-items-center">
                                     <img src="/assets/images/user/02.jpg" className="img-fluid avatar-35 rounded" alt="username"/>
                                     <div className="media-body ml-3">
                                        <p className="mb-0">Cliff Hanger</p>
                                     </div>
                                  </div>
                               </td>
                               <td>45.00 Mb</td>
                               <td>20/08/2020</td>
                               <td>
                                  <div className="d-block line-height">
                                     <span className="font-size-11 text-warning">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-half-o"></i>
                                     </span>                                             
                                  </div>
                               </td>
                               <td>
                                  <span className="badge badge-danger">Pending</span>
                               </td>
                            </tr>
                            <tr>
                               <td>3</td>
                               <td>Die From A..</td>
                               <td>
                                  <div className="media align-items-center">
                                     <img src="/assets/images/user/03.jpg" className="img-fluid avatar-35 rounded" alt="username"/>
                                     <div className="media-body ml-3">
                                        <p className="mb-0">Terry Aki</p>
                                     </div>
                                  </div>
                               </td>
                               <td>26.08 Mb</td>
                               <td>20/08/2020</td>
                               <td>
                                  <div className="d-block line-height">
                                     <span className="font-size-11 text-warning">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-half-o"></i>                                             
                                        <i className="fa fa-star-half-o"></i>
                                     </span>                                             
                                  </div>
                               </td>
                               <td>
                                  <span className="badge badge-success">Success</span>
                               </td>
                            </tr>
                            <tr>
                               <td>4</td>
                               <td>Life's A Mess</td>
                               <td>
                                  <div className="media align-items-center">
                                     <img src="/assets/images/user/04.jpg" className="img-fluid avatar-35 rounded" alt="username"/>
                                     <div className="media-body ml-3">
                                        <p className="mb-0">Rock lai</p>
                                     </div>
                                  </div>
                               </td>
                               <td>15.04 Mb</td>
                               <td>20/08/2020</td>
                               <td>
                                  <div className="d-block line-height">
                                     <span className="font-size-11 text-warning">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                     </span>                                             
                                  </div>
                               </td>
                               <td>
                                  <span className="badge badge-danger">Pending</span>
                               </td>
                            </tr>
                            <tr>
                               <td>5</td>
                               <td>Rags2Riches</td>
                               <td>
                                  <div className="media align-items-center">
                                     <img src="/assets/images/user/05.jpg" className="img-fluid avatar-35 rounded" alt="username"/>
                                     <div className="media-body ml-3">
                                        <p className="mb-0">Anna Mull</p>
                                     </div>
                                  </div>
                               </td>
                               <td>10.03 Mb</td>
                               <td>20/08/2020</td>
                               <td>
                                  <div className="d-block line-height">
                                     <span className="font-size-11 text-warning">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                     </span>                                             
                                  </div>
                               </td>
                               <td>
                                  <span className="badge badge-success">Success</span>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
  )
}

export default Dashboard