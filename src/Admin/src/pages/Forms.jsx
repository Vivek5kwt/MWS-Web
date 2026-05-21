export default function Forms() {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Form Elements</h3>
      </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Form</h4>
              <form className="forms-sample">
                <div className="form-group">
                  <label htmlFor="exampleInputName1">Name</label>
                  <input type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail3">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword4">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleSelectGender">Gender</label>
                  <select className="form-select" id="exampleSelectGender">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleTextarea1">Textarea</label>
                  <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" /> Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Horizontal Form</h4>
              <form className="forms-sample">
                <div className="form-group row">
                  <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Mobile</label>
                  <div className="col-sm-9">
                    <input type="number" className="form-control" id="exampleInputMobile" placeholder="Mobile number" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="exampleInputEmail4" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id="exampleInputEmail4" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="exampleInputPassword5" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" id="exampleInputPassword5" placeholder="Password" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">Submit</button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
