import React, { useEffect, useState } from 'react'
import SuccessAlert from './SuccessAlert';

const ManufacturerForm = () => {
  const [name, setName] = useState('');

  const [show, setShow] = useState(false)

  const heading = `Manufacturer added successfully`
  const route = `manufacturers`
  const buttonMessage = `View manufacturers`

  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}

    data.name = name

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
      },
    };
    try {
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            setName('');
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
            <h1 className='text-center'>Add a new manufacturer</h1>
            <form onSubmit={handleSubmit} id="add-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                <label htmlFor="name">Name</label>
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

export default ManufacturerForm
