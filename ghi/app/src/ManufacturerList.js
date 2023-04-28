import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const SalespeopleList = () => {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async ()=> {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  };

  const deleteManufacturer = async (event, id) => {
    event.preventDefault();
    const url = `http://localhost:8100/api/manufacturers/${id}/`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setManufacturers(manufacturers.filter((manufacturer) => manufacturer.id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container">
        <div className="container d-flex justify-content-center align-items-center">
            <h1>Manufacturers <Link to="new" className="btn btn-sm btn-success ">+</Link> </h1>

        </div>
      <table className="table table-striped">
          <thead>
            <tr>
                <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {manufacturers.map(manufacturer => {
              return (
              <tr key={manufacturer.id} value={manufacturer.id} >
                  <td>{manufacturer.name}</td>
                  <td className="d-flex justify-content-around">
                    <button className="btn btn-sm btn-outline-danger" onClick={(event) => deleteManufacturer(event, manufacturer.id)}>Delete</button>
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
