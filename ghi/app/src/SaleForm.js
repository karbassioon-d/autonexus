import React, { useEffect, useState } from 'react'
import SuccessAlert from './SuccessAlert';

const SaleForm = () => {
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [vins, setVins] = useState([]);

    const [show, setShow] = useState(false)

    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [vin, setVin] = useState('');
    const [price, setPrice] = useState('');

    const heading = `Sale recorded successfully`
    const route = `sale`
    const buttonMessage = `View sales`

    const fetchSalespersonData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    const fetchCustomerData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }

    const fetchVinData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setVins(data.autos)
        }
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const updateSold = async (vin) => {
        const data = {};
        data.sold = true;

        const url = `http://localhost:8100/api/automobiles/${vin}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newStatus = await response.json();
        };
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        data.price = price;
        data.salesperson_id = salesperson;
        data.customer_id = customer;
        data.automobile = vin;

        const saleUrl = 'http://localhost:8090/api/sale/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(saleUrl, fetchConfig);
            if (response.ok) {
                setSalesperson('');
                setCustomer('');
                setVin('');
                setPrice('');
                setShow(true);
                updateSold(vin)
            }

        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        fetchSalespersonData();
        fetchCustomerData();
        fetchVinData();
    }, []);

    return (
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1 className='text-center'>Record a sale</h1>
                <form onSubmit={handleSubmit} id="record-sale-form">
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
                    <div className="mb-3">
                        <select onChange={handleCustomerChange} required name="customer" id="customer" className="form-select" value={customer} >
                            <option value="">Choose a Customer</option>
                            {customers.map((customer) => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.first_name} {customer.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleVinChange} required name="vin" id="vin" className="form-select" value={vin} >
                            <option value="">Choose an automobile VIN</option>
                            {vins.map((vin) => {
                                return (
                                    <option key={vin.id} value={vin.vin}>
                                        {vin.vin}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" value={price} />
                        <label htmlFor="color">Price</label>
                    </div>
                  <button className="btn btn-success w-100">Add</button>
                </form>
              </div>
               <SuccessAlert show={show} setShow={setShow} heading={heading} route={route} buttonMessage={buttonMessage} />
            </div>
          </div>
        </div>
    )
}

export default SaleForm
