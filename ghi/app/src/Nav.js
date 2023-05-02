import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-success d-flex flex-row">
      <div className="container-fluid">
        <NavLink className="navbar-brand" style={{width:"3%", minWidth:"70px"}} to="/"><img style={{width:"5%", minWidth:"70px"}} src={process.env.PUBLIC_URL + '/autonexus-favicon.png'} /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse container-fluid" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto ml-auto d-flex flex-wrap mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink className="nav-link active" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/salespeople">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/customers">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/sale">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/salespeople/history">Salesperson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/appointments">Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/appointments/history">Appointment History</NavLink>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add
              </a>
              <ul className='dropdown-menu dropdown-menu-dark'aria-labelledby="navbarDarkDropdownMenuLink" >
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new">Add a Manufacturer</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/models/new">Add a Model</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/automobiles/new">Add an Automobile</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/salespeople/new">Add a Salesperson</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/customers/new">Add a Customer</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/sale/new">Record a new Sale</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/technicians/new">Add a Technician</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" aria-current="page" to="/appointments/new">Create an Appointment</NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <img className="justify-content-around" style={{width:"5%", minWidth:"70px"}} src={process.env.PUBLIC_URL + '/rotating-car.gif'} />
        </div>
      </div>
    </nav>
  )
}

export default Nav;
