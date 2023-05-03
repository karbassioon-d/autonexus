import React, { useEffect, useState } from 'react'
import SuccessAlert from './SuccessAlert';

const CustomerForm = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [show, setShow] = useState(false)

    const heading = `Customer added successfully`
    const route = `customers`
    const buttonMessage = `View customers`

    const handleFirst_nameChange = (event) => {
        const value = event.target.value;
        setFirst_name(value);
      }

    const handleLast_nameChange = (event) => {
        const value = event.target.value;
        setLast_name(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhone_numberChange = (event) => {
        const value = event.target.value;
        setPhone_number(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        data.first_name = first_name;
        data.last_name = last_name;
        data.address = address;
        data.phone_number = phone_number

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(customerUrl, fetchConfig);
            if (response.ok) {
                setFirst_name('');
                setLast_name('');
                setAddress('');
                setPhone_number('');
                setShow(true);
            }

        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
    }, []);

    return (
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1 className='text-center'>Add a new customer</h1>
                <form onSubmit={handleSubmit} id="add-customer-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleFirst_nameChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" value={first_name} />
                    <label htmlFor="name">First name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleLast_nameChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={last_name} />
                    <label htmlFor="fabric">Last name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={address} />
                    <label htmlFor="fabric">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handlePhone_numberChange} placeholder="Phone number" required type="tel" name="phone_number" id="phone_number" className="form-control" value={phone_number} />
                    <label htmlFor="fabric">Phone number</label>
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

export default CustomerForm
