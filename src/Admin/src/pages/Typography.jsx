export default function Typography() {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Typography</h3>
      </div>

      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Headings</h4>
              <div className="template-demo">
                {[1,2,3,4,5,6].map(n => {
                  const Tag = `h${n}`
                  return <Tag key={n}>{`h${n}. Heading ${n}`}</Tag>
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Text Colours</h4>
              <div className="template-demo">
                {['primary','secondary','success','danger','warning','info','light','dark','muted'].map(c => (
                  <p key={c} className={`text-${c}`}>
                    .text-{c} — The quick brown fox jumps over the lazy dog.
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
