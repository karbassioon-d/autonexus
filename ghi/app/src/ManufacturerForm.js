import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const ManufacturerForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');

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
        }
        navigate('/manufacturers')

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
            <h1>Add a new manufacturer</h1>
            <form onSubmit={handleSubmit} id="add-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManufacturerForm
