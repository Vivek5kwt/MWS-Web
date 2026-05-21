export default function Buttons() {
  const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Buttons</h3>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Buttons</h4>
              <p className="card-description">Add <code>.btn</code> class</p>
              <div className="template-demo">
                {variants.map(v => (
                  <button key={v} type="button" className={`btn btn-${v} btn-fw`}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Outline Buttons</h4>
              <p className="card-description">Add <code>.btn-outline-*</code> class</p>
              <div className="template-demo">
                {variants.map(v => (
                  <button key={v} type="button" className={`btn btn-outline-${v} btn-fw`}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Button Sizes</h4>
              <div className="template-demo">
                <button type="button" className="btn btn-primary btn-lg">Large</button>
                <button type="button" className="btn btn-primary">Default</button>
                <button type="button" className="btn btn-primary btn-sm">Small</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
