const rows = [
  { name: 'Herman Beck', position: 'Executive Director', office: 'London', age: 65, date: '2001/12/12', salary: '$368,600' },
  { name: 'Lael Greer', position: 'Systems Administrator', office: 'London', age: 21, date: '2009/02/27', salary: '$103,500' },
  { name: 'Jonas Alexander', position: 'Developer', office: 'San Francisco', age: 30, date: '2010/07/14', salary: '$86,500' },
  { name: 'Shad Decker', position: 'Regional Director', office: 'Edinburgh', age: 51, date: '2008/11/13', salary: '$183,000' },
  { name: 'Michael Bruce', position: 'Javascript Developer', office: 'Singapore', age: 29, date: '2011/06/27', salary: '$183,000' },
  { name: 'Donna Snider', position: 'Customer Support', office: 'New York', age: 27, date: '2011/01/25', salary: '$112,000' },
]

export default function Tables() {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">Basic Tables</h3>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Striped Table</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.position}</td>
                        <td>{r.office}</td>
                        <td>{r.age}</td>
                        <td>{r.date}</td>
                        <td>{r.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bordered Table</h4>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.position}</td>
                        <td>{r.office}</td>
                        <td>{r.age}</td>
                        <td>{r.date}</td>
                        <td>{r.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
