import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const SalespeopleList = () => {
  const [salespeople, setSalespeople] = useState([]);

  const fetchData = async ()=> {
    const url = 'http://localhost:8090/api/salespeople/';

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople)
    }
  };

  const deleteSalesperson = async (event, id) => {
    event.preventDefault();
    const url = `http://localhost:8090/api/salespeople/${id}/`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setSalespeople(salespeople.filter((salesperson) => salesperson.employee_id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container">
        <div className="container d-flex justify-content-around align-items-center">
            <h1>Salespeople</h1>
            <Link to="new" className="btn btn-primary">
                Add a new salesperson
            </Link>
        </div>
      <table className="table table-striped">
          <thead>
          <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Employee Id #</th>
          </tr>
          </thead>
          <tbody>
          {salespeople.map(salesperson => {
              return (
              <tr key={salesperson.employee_id} value={salesperson.employee_id} >
                  <td>{salesperson.first_name}</td>
                  <td>{salesperson.last_name}</td>
                  <td>{salesperson.employee_id}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={(event) => deleteSalesperson(event, salesperson.employee_id)}>Delete</button>
                  </td>
              </tr>
              );
          })}
          </tbody>
      </table>
    </div>
  )
}

export default SalespeopleList
