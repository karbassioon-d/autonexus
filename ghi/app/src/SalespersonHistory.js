import React, { useEffect, useState } from 'react'


const SalespersonHistory = () => {
    const [salespeople, setSalespeople] = useState([]);

    const [salesperson, setSalesperson] = useState('');
    const [sales, setSales] = useState([]);
    const [filteredsales, setFilteredsales] = useState([]);

    const fetchSalespersonData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    const fetchSalesData = async () => {
        const url = 'http://localhost:8090/api/sale/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sale)
        }
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
        const filteredSales = sales.filter(sale => sale.salesperson.employee_id === parseInt(value));
        setFilteredsales(filteredSales);
      }

    useEffect(() => {
      fetchSalespersonData();
      fetchSalesData();
    }, [])
    return (
      <div className="container">
          <div className="container d-flex justify-content-around align-items-center">
              <h1>Salesperson History</h1>
          </div>
          <div className="mb-3">
            <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select" value={salesperson} >
                <option value="">Choose a Salesperson</option>
                {salespeople.map((salesperson) => {
                    return (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    );
                })}
            </select>
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
            {filteredsales.map(sale => {
                return (
                <tr key={sale.id} value={sale.id} >
                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
                    <td>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    )
  }

export default SalespersonHistory
