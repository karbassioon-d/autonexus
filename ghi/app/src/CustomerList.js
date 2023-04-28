import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const fetchData = async ()=> {
      const url = 'http://localhost:8090/api/customers/';

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers)
      }
    };

    const deleteCustomer = async (event, id) => {
      event.preventDefault();
      const url = `http://localhost:8090/api/customers/${id}/`;
      const response = await fetch(url, {method: "DELETE" });
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== id));
      }
    };

    useEffect(() => {
      fetchData();
    }, [])

    return (
      <div className="container">
          <div className="container d-flex justify-content-around align-items-center">
              <h1>Customers <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
          </div>
        <table className="table table-striped">
            <thead>
              <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Phone number</th>
              </tr>
            </thead>
            <tbody>
            {customers.map(customer => {
                return (
                <tr key={customer.id} value={customer.id} >
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone_number}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger" onClick={(event) => deleteCustomer(event, customer.id)}>Delete</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    )
  }

export default CustomerList
