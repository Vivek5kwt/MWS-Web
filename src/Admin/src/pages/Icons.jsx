const icons = [
  'mdi-account', 'mdi-alarm', 'mdi-bell', 'mdi-cart', 'mdi-chart-bar',
  'mdi-check', 'mdi-close', 'mdi-cog', 'mdi-delete', 'mdi-download',
  'mdi-email', 'mdi-eye', 'mdi-file', 'mdi-heart', 'mdi-home',
  'mdi-information', 'mdi-lock', 'mdi-logout', 'mdi-magnify', 'mdi-menu',
  'mdi-pencil', 'mdi-phone', 'mdi-plus', 'mdi-refresh', 'mdi-share',
  'mdi-star', 'mdi-thumb-up', 'mdi-upload', 'mdi-web', 'mdi-wifi',
]

export default function Icons() {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Icons</h3>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Material Design Icons</h4>
              <div className="row">
                {icons.map(icon => (
                  <div key={icon} className="col-sm-3 col-md-2 text-center mb-4">
                    <i className={`mdi ${icon} icon-lg`}></i>
                    <p className="text-muted small mt-1">{icon.replace('mdi-', '')}</p>
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
