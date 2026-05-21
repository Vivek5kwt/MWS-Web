export default function Dropdowns() {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Dropdowns</h3>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Dropdowns</h4>
              <p className="card-description">Use <code>data-bs-toggle="dropdown"</code></p>
              <div className="template-demo">
                {['primary', 'success', 'danger', 'warning', 'info'].map(v => (
                  <div key={v} className="dropdown d-inline-block">
                    <button
                      className={`btn btn-${v} dropdown-toggle`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else</a></li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
