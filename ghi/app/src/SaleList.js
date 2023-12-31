import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import papersSVG from './icons/papers.svg'

const SaleList = () => {
  const [sales, setSales] = useState([]);

  const fetchData = async ()=> {
    const url = 'http://localhost:8090/api/sale/';

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sale)
    }
  };

  const deleteSale = async (event, id) => {
    event.preventDefault();
    const url = `http://localhost:8090/api/sale/${id}/`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setSales(sales.filter((sale) => sale.id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container mt-3">
        <div className="container d-flex justify-content-center align-items-center">
          <img style={{width:"6%", maxWidth:"50px"}} src={papersSVG} />
          <h1 style={{marginLeft:"12px"}}>Sales <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
        </div>
      <table className="table table-striped">
          <thead>
            <tr>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {sales.map(sale => {
              return (
              <tr key={sale.id} value={sale.id} >
                  <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                  <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                  <td>{sale.automobile.vin}</td>
                  <td>${sale.price}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={(event) => deleteSale(event, sale.id)}>Delete</button>
                  </td>
              </tr>
              );
          })}
          </tbody>
      </table>
    </div>
  )
}

export default SaleList
