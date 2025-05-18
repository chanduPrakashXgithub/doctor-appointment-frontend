function DashboardAdmin() {
    return (
      <div className="container mt-5">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin! You can manage doctors, view reports, etc.</p>
        {/* Add links or overview cards */}
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Doctors</h5>
                <a href="/doctors" className="btn btn-primary">View Doctors</a>
              </div>
            </div>
          </div>
          {/* More cards */}
        </div>
      </div>
    );
  }
  export default DashboardAdmin;
  