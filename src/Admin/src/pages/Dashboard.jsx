import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [userCount, setUserCount] = useState('...')

  useEffect(() => {
    fetch('https://admin.mywealthscore.ai/api/users')
      .then(res => res.json())
      .then(json => { if (json.success) setUserCount(json.data.length) })
      .catch(() => setUserCount('—'))
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0 udersno">{userCount}</h3>
                    <p className="text-success ms-2 mb-0 font-weight-medium "></p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Users</h6>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$17.34</h3>
                    <p className="text-success ms-2 mb-0 font-weight-medium">+11%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Revenue current</h6>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$12.34</h3>
                    <p className="text-danger ms-2 mb-0 font-weight-medium">-2.4%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Daily Income</h6>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$31.53</h3>
                    <p className="text-success ms-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Expense current</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Transaction History</h4>
              <div className="position-relative">
                <div className="daoughnutchart-wrapper">
                  <canvas id="transaction-history" className="transaction-chart"></canvas>
                </div>
                <div className="custom-value">$1200 <span>Total</span></div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Transfer to Paypal</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-end text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$236</h6>
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Transfer to Stripe</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-end text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$593</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">Open Projects</h4>
                <p className="text-muted mb-1">Your data status</p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="preview-list">
                    {[
                      { icon: 'bg-primary', mdi: 'mdi-file-document', title: 'Admin dashboard design', sub: 'Broadcast web app mockup', time: '15 minutes ago', tasks: '30 tasks, 5 issues' },
                      { icon: 'bg-success', mdi: 'mdi-cloud-download', title: 'Wordpress Development', sub: 'Upload new design', time: '1 hour ago', tasks: '23 tasks, 5 issues' },
                      { icon: 'bg-info', mdi: 'mdi-clock', title: 'Project meeting', sub: 'New project discussion', time: '35 minutes ago', tasks: '15 tasks, 2 issues' },
                      { icon: 'bg-danger', mdi: 'mdi-television', title: 'HTML Template', sub: 'New admin template', time: '7 hours ago', tasks: '20 tasks, 3 issues' },
                    ].map((item, i) => (
                      <div key={i} className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className={`preview-icon ${item.icon}`}>
                            <i className={`mdi ${item.mdi}`}></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">{item.title}</h6>
                            <p className="text-muted mb-0">{item.sub}</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">{item.time}</p>
                            <p className="text-muted mb-0">{item.tasks}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {[
          { title: 'Revenue', value: '$45,080', percent: '25%', color: 'success', icon: 'mdi-currency-usd' },
          { title: 'Sales', value: '7,924', percent: '15%', color: 'info', icon: 'mdi-sale' },
          { title: 'Purchase', value: '$2,367', percent: '10%', color: 'danger', icon: 'mdi-cart' },
        ].map((card, i) => (
          <div key={i} className="col-xl-4 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-1">{card.title}</p>
                    <h2>{card.value}</h2>
                    <p className="mb-0">
                      <span className={`text-${card.color}`}>{card.percent} </span>increase
                    </p>
                  </div>
                  <div className={`icon icon-lg icon-box-${card.color}`}>
                    <span className={`mdi ${card.icon} icon-item`}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
