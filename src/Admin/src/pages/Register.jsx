import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth register-bg">
            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">
                <h3 className="card-title text-start mb-3">Register</h3>
                <form>
                  <div className="form-group">
                    <label>Username *</label>
                    <input type="text" className="form-control p_input" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" className="form-control p_input" />
                  </div>
                  <div className="form-group">
                    <label>Password *</label>
                    <input type="password" className="form-control p_input" />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password *</label>
                    <input type="password" className="form-control p_input" />
                  </div>
                  <div className="text-center d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Register</button>
                  </div>
                  <div className="d-flex">
                    <button type="button" className="btn btn-facebook me-2 col">
                      <i className="mdi mdi-facebook"></i> Facebook
                    </button>
                    <button type="button" className="btn btn-google col">
                      <i className="mdi mdi-google-plus"></i> Google plus
                    </button>
                  </div>
                  <p className="sign-up">
                    Already have an Account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
