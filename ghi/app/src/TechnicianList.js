import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([])

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians)
    }
  }

  const removeTechnician = async (event, id) => {
    event.preventDefault();
    const url = `http://localhost:8080/api/technicians/${id}`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setTechnicians(technicians.filter((technician) => technician.employee_id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Technicians <Link to="new" className="btn btn-sm btn-success ">
                +
            </Link></h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => {
          return (
          <tr key={technician.employee_id} value={technician.employee_id}>
            <td>{technician.first_name}</td>
            <td>{technician.last_name}</td>
            <td>{technician.employee_id}</td>
            <td><button className="btn btn-sm btn-outline-danger" onClick={(event) => removeTechnician(event, technician.employee_id)}>Delete</button></td>

          </tr>
          );
        })}
        </tbody>

      </table>

    </div>
  )
}

export default TechnicianList
