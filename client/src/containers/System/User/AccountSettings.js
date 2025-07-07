import React from 'react'

const AccountSettings = () => {
  return (
    <div id="content-page" className="content-page">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-lg-6">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Account Setting</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <div className="acc-edit">
                              <form>
                                 <div className="form-group">
                                    <label htmlFor="uname">User Name: </label>
                                    <input type="text" className="form-control" id="uname" defaultValue="Barry@01"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="email">Email Id:</label>
                                    <input type="email" className="form-control" id="email" defaultValue="Barryjohn@gmail.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="altemail">Alternate Email:</label>
                                    <input type="email" className="form-control" id="altemail" defaultValue="designtheme@gmail.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label className="d-block">Language Known:</label>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="english" defaultChecked={true}/>
                                       <label className="custom-control-label" htmlFor="english">English</label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="french" defaultChecked=""/>
                                       <label className="custom-control-label" htmlFor="french">French</label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="hindi"/>
                                       <label className="custom-control-label" htmlFor="hindi">Hindi</label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="spanish" defaultChecked=""/>
                                       <label className="custom-control-label" htmlFor="spanish">Spanish</label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="arabic"/>
                                       <label className="custom-control-label" htmlFor="arabic">Arabic</label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                       <input type="checkbox" className="custom-control-input" id="italian"/>
                                       <label className="custom-control-label" htmlFor="italian">Italian</label>
                                    </div>
                                 </div>
                                 <button style={{marginRight:"4px"}} type="button" className="btn btn-primary">Submit</button>
                                 <button style={{marginRight:"4px"}} type="reset" className="btn iq-bg-danger">Cancel</button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Social Media</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <div className="acc-edit">
                              <form>
                                 <div className="form-group">
                                    <label htmlFor="facebook">Facebook:</label>
                                    <input type="text" className="form-control" id="facebook" defaultValue="www.facebook.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="twitter">Twitter:</label>
                                    <input type="text" className="form-control" id="twitter" defaultValue="www.twitter.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="google">Google +:</label>
                                    <input type="text" className="form-control" id="google" defaultValue="www.google.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="instagram">Instagram:</label>
                                    <input type="text" className="form-control" id="instagram" defaultValue="www.instagram.com"/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="youtube">You Tube:</label>
                                    <input type="text" className="form-control" id="youtube" defaultValue="www.youtube.com"/>
                                 </div>
                                 <button style={{marginRight:"4px"}} type="button" className="btn btn-primary">Submit</button>
                                 <button style={{marginRight:"4px"}} type="reset" className="btn iq-bg-danger">Cancel</button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
  )
}

export default AccountSettings